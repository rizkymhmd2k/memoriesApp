// import axios from 'axios';

// const url = 'http://localhost:4025/posts';

// export const fetchPosts = () => axios.get(url);
// export const createPost = (newPost) => axios.post(url, newPost);
// export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
// export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
// export const deletePost = (id) => axios.delete(`${url}/${id}`);

import axios from 'axios';
 
// const url = 'http://localhost:4069/posts';

//auth middleware cant work without interceptors. to send auth ind middleware
//adding spesific to each one of our request. function that happen to each of requests
//happened before all these requests. just like middware
//bcs we need to send our tokens to our backend, so we that be middleware can verfiy that we are logged in
//when we wanna fetch axios. the interceptors make sure to put all the tokens to every request (like,delete,post dll)
axios.interceptors.request.use(req => {
    if (localStorage.getItem('profile')) { //if token exists then
      req.headers.Authorization = `Bearer ${ //add token to each of our request
        JSON.parse(localStorage.getItem('profile')).token
      }`;
    }
  
    return req;
  });

export const fetchPosts = (page) => axios.get(`/posts?page=${page}`)
export const fetchPost = (id) => axios.get(`/posts/${id}`)


//if there is no search query send the none..
export const fetchPostsBySearch = (searchQuery) => axios.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);


export const createPost = (newPost) => axios.post('/posts', newPost);

export const updatePost = (id, updatedPost) => axios.patch(`/posts/${id}`, updatedPost);

export const deletePost = (id) => axios.delete(`/posts/${id}`);

export const likePost = (id) => axios.patch(`/posts/${id}/likePost`);

///USERS

export const signInGoogle = (accessToken) => axios.post('/users/signin', {
    googleAccessToken: accessToken
})
export const signUpGoogle = (accessToken) => axios.post('/users/signup', {
  googleAccessToken: accessToken
})

export const signIn = formData => axios.post('/users/signin', formData);
export const signUp = formData => axios.post('/users/signup', formData);







