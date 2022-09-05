import React from "react";
import './styles.css';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../redux/postSlice";


const Post = ({ post, setCurrentId }) => {
    const dispatch = useDispatch();


    return (
        <Card className='card' sx={{ borderRadius: '15px', maxWidth: '100%' }}>
            <CardMedia className='media' image={post.selectedFile} title={post.title} component='div'/>
            <div className='overlay'>
                <Typography variant='h5'>{post.creator}</Typography>
                <Typography variant="body2">{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</Typography>
            </div>
            <div className='overlay2'>
                <Button style={{ color: 'white' }} size="small" onClick={() => { setCurrentId(post._id) }}>
                    <MoreHorizIcon fontSize='medium' align="left" />
                </Button>
            </div>

            <CardContent>
                <div className='details' >
                    <Typography variant='body2' color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
                </div>
                <Typography className="title" variant='h5' gutterBottom>{post.title}</Typography>
                <Typography variant='body2' color="textSecondary" component="p" gutterBottom>{post.message}</Typography>
            </CardContent>

            <CardActions className='cardActions'>
                <Button size='small' color='primary' onClick={() => dispatch(likePost(post._id))}>
                    <ThumbUpIcon fontSize='small' />
                    &nbsp;like &nbsp;
                    {post.likeCount}
                </Button>
                <Button size='small' color='primary' onClick={() => dispatch(deletePost(post._id))}>
                    <DeleteIcon fontSize='small' />
                    Delete
                </Button>
            </CardActions>
            
        </Card>
    );
}

export default Post;