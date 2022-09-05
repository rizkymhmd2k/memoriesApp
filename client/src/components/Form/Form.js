import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Paper, Box } from '@mui/material';
import { createPost, updatePost} from '../../redux/postSlice';




const Form = ({currentId, setCurrentId}) => {
    const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
    const dispatch = useDispatch()
    const post = useSelector(state => currentId ? state.memoryPosts.posts.find(p => p._id === currentId) : null)
    // console.log('selector post if current id exists', post);
    // console.log('current ID', currentId);
    // console.log('postData', postData);
   


    useEffect(()=>{
        if(post) setPostData(post)
    }, [post]) //everytime the post changes refresh

    const clear = () => {
        setCurrentId(0);
        setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
      };

    const handleSubmit = (e) => {
        e.preventDefault()

        if(currentId){
            dispatch(updatePost({currentId, postData})) //karena kita pass the argument scr
            //spesifik makanya pakai curly bracket
            clear();
        }else{
            dispatch(createPost(postData))
            clear();
        }

    }

    

    return (
        <Paper sx={{ padding: '12px' }}>
            <Box autoComplete="off" noValidate onSubmit={handleSubmit} component="form"
                sx={{
                    '& .MuiTextField-root': { margin: "5px" },
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                }}>
                <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
                <TextField  name="creator" variant="outlined" label="creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
                <TextField  name="title" variant="outlined" label="title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField  name="message" variant="outlined" label="message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                <TextField  name="tags" variant="outlined" label="tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                <Box sx={{
                    width: '97%',
                    margin: '10px 0',
                }}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></Box>
                <Button variant="contained" color="primary" size="large" type="submit" fullWidth sx={{ marginBottom: "10px" }}>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </Box>
        </Paper>
    );
}

export default Form;