import React from "react";
import Post from './Post/Post';
import { useSelector } from 'react-redux'
import { Grid, CircularProgress } from '@mui/material';

const Posts = ({ setCurrentId }) => {
    // const {posts} = useSelector((state) => state.posts);
    // const posts = useSelector((state) => state.memoryPosts.posts); bcs it was array of posts
    //why do we destrucure? because posts contain multiple objects

    // const {posts, isLoading} = useSelector((state) => state.memoryPosts.posts);
    //memory post has posts and isLoading, but posts has posts, page dll
    const { posts: { posts }, isLoading } = useSelector(state => state.memoryPosts)




    console.log('posts from post.js', posts);
    console.log('isLoading', isLoading);

    if (!posts?.length && !isLoading) return 'no posts'

    // !posts?.length ?
    //isLoading ?
    return (
        isLoading ?<CircularProgress sx={{ marginTop: '15%' }} /> : (
                <Grid container alignItems="stretch" spacing={3}>
                    {posts?.map((post) => (
                        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                            <Post post={post} setCurrentId={setCurrentId} />
                        </Grid>
                    ))}
                </Grid>
            )


    )


}

export default Posts;