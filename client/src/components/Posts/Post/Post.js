import React, { useState } from "react";
import './styles.css';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@mui/material';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../redux/postSlice";
import { useNavigate } from "react-router-dom";



const Post = ({ post, setCurrentId }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    // console.log('what user', user?.result);

    const [likes, setLikes] = useState(post?.likes)

    const hasLikedPost = post.likes.find((like) => like === (user?.result?._id))
    const userId = (user?.result?._id)

    const handleLike = async ()=>{
        dispatch(likePost(post._id))
        //booleanvalue
        if(hasLikedPost){
            //if they already liked it, we unlike it. remove the id
            //returning all but the one that equals passed in id
            setLikes(post.likes.filter((id)=>id !== userId ))
        }else{
            //if they havent liked it, add the id
            setLikes([...post.likes, userId])
        }
        //this is faster because updating data in database is using async, and it takes time
        //while this method works instantly from Front End
    }


    const Likes = () => {
        //replace post.likes to our frontend LIKE state
        if (likes.length > 0) {
            //check whether like array contains the id of the current person? remember we push id in backend of likes array
            return likes.find((like) => like === userId)
                ? (
                    <><ThumbUpIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}</>
                ) : ( //if you havent liked
                    <><ThumbUpIcon fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
                );
        }
        //if no one likes yet
        return <><ThumbUpOffAltIcon fontSize="small" />&nbsp;Like</>;
    };



    const openPost = () => {
        navigate(`/posts/${post._id}`)
    }

    return (
        <Card className='card' raised elevation={0} sx={{ borderRadius: '25px', maxWidth: '100%', boxShadow:2, }}>

            <CardMedia onClick={openPost} className='media' image={post.selectedFile} title={post.title} component='div' />
            <div className='overlay'>
                <Typography variant='h5'>{post.name}</Typography>
                <Typography variant="body2">{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</Typography>
            </div>

            {(user?.result?._id === post?.creator) && (
                <div className='overlay2'>
                    <Button style={{ color: 'white' }} size="small" onClick={() => { setCurrentId(post._id) }}>
                        <MoreHorizIcon fontSize='medium' align="left" />
                    </Button>
                </div>)}
            <Button size='small' variant="text" color="primary" disabled={!user?.result} onClick={openPost}>See Posts!</Button>


            <CardContent>
                <div className='details' >
                    <Typography variant='body2' color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
                </div>
                <Typography className="title" variant='h5' gutterBottom>{post.title}</Typography>
                <Typography variant='body2' color="textSecondary" component="p" gutterBottom>{post.message}</Typography>
            </CardContent>
            <CardActions className='cardActions'>
                {/* disable buttonn if no user logged */}
                {/* <Button size='small' disabled={!user?.result} color='primary' onClick={() => dispatch(likePost(post._id))}> old tricks*/}
                <Button size='small' disabled={!user?.result} color='primary' onClick={handleLike}>

                    <Likes />
                </Button>
                {/* Disable button for non creator */}
                {(user?.result?._id === post?.creator) && (

                    <Button size='small' color='primary' onClick={() => dispatch(deletePost(post._id))}>
                        <DeleteIcon fontSize='small' />
                        Delete
                    </Button>)}
            </CardActions>
        </Card>
    );
}

export default Post;