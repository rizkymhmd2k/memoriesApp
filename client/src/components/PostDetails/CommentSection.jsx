import React, { useState, useRef } from "react";
import { Typography, TextField, Button, Box } from '@mui/material'
import { useDispatch } from "react-redux";
import { commentPost } from "../../redux/postSlice";


const CommentSection = ({ post }) => {
    console.log('id2x', post);
    const commentsRef = useRef();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    // console.log(post);
    const [comments, setComments] = useState(post?.comments)
    const [comment, setComment] = useState('')
    // console.log('comments', comments);
    // console.log('comment', comment);


    const handleComment = async () => {
        const finalComment = `${user.result.name}  ${comment}`

        const { payload: { comments } } = await dispatch(commentPost({ value: finalComment, id: post._id }))
        // console.log('newComments', newComments.payload.comments); the art of destucturing
        console.log('newComments', comments);


        //so that we dont need to refresh to load the comments
        setComment('');
        setComments(comments);
        // commentsRef.current.scrollIntoView();
        setTimeout(() => commentsRef.current.scrollIntoView({ inline: 'center', behavior: 'smooth' }), 777)
        console.log('comments1', comments);
        console.log('comment1', comment);

    };

    return (
        <Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
            }}>
                <Box sx={{
                    height: '200px',
                    overflowY: 'auto',
                    marginRight: '30px'
                }}>
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    {/* c is for each comment while i is for index */}
                    {/* {comments.map((c, i) => (
                        <Typography key={i} gutterBottom variant="subtitle1">
                            Comments {c}
                        </Typography>
                    ))} */}
                    {
                        comments.map((c, i) => (
                            <Typography key={i} gutterBottom variant="subtitle1">
                                <strong>{c.split(': ')[0]}</strong>
                                {c.split(':')[1]}
                            </Typography>
                        ))
                    }
                    {/* anchor point, the end of scroll */}
                    <Box ref={commentsRef} />
                </Box>
                {user &&
                    <Box style={{ width: '70%' }}>
                        <Typography gutterBottom variant="h6">Write a comment</Typography>
                        <TextField fullWidth rows={4}
                            variant="outlined"
                            label="Comment"
                            multiline
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        {/* disable if no comment */}
                        <Button tyle={{ marginTop: '10px' }} fullWidth disabled={!comment} variant="contained" onClick={handleComment}>
                            Comment
                        </Button>
                    </Box>
                }
            </Box>
        </Box>
    )
}

export default CommentSection