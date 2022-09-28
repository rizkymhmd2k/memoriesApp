import React from "react";
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

    const Likes = () => {
        if (post.likes.length > 0) {
            return post.likes.find((like) => like === (user?.result?._id))
                ? (
                    <><ThumbUpIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
                ) : ( //if you havent liked
                    <><ThumbUpIcon fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
                );
        }
        //if no one likes yet
        return <><ThumbUpOffAltIcon fontSize="small" />&nbsp;Like</>;
    };



    const openPost = () => {
        navigate(`/posts/${post._id}`)
    }

    return (
        <Card className='card' raised elevation={4} sx={{ borderRadius: '15px', maxWidth: '100%' }}>

            <CardMedia className='media' image={post.selectedFile} title={post.title} component='div' />
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
            <Button size='small' variant="outlined" color="primary" disabled={!user?.result} onClick={openPost}>See Posts!</Button>


            <CardContent>
                <div className='details' >
                    <Typography variant='body2' color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
                </div>
                <Typography className="title" variant='h5' gutterBottom>{post.title}</Typography>
                <Typography variant='body2' color="textSecondary" component="p" gutterBottom>{post.message}</Typography>
            </CardContent>
            <CardActions className='cardActions'>
                {/* disable buttonn if no user logged */}
                <Button size='small' disabled={!user?.result} color='primary' onClick={() => dispatch(likePost(post._id))}>
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