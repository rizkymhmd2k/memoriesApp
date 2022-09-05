// import axios from 'axios';

// const url = 'http://localhost:4025/posts';

// export const fetchPosts = () => axios.get(url);
// export const createPost = (newPost) => axios.post(url, newPost);
// export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
// export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
// export const deletePost = (id) => axios.delete(`${url}/${id}`);

import axios from 'axios';
 
// const url = 'http://localhost:4069/posts';

export const fetchPosts = () => axios.get('/posts')

export const createPost = (newPost) => axios.post('/posts', newPost);

export const updatePost = (id, updatedPost) => axios.patch(`/posts/${id}`, updatedPost);

export const deletePost = (id) => axios.delete(`/posts/${id}`);

export const likePost = (id) => axios.patch(`/posts/${id}/likePost`);




