import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import * as api from '../api'

//create action here
export const getAllPosts = createAsyncThunk('posts/allPosts', async (page) => {
    // dispatch(setIsLoading(true))
    const { data } = await api.fetchPosts(page);
    return data;
})

export const getPost = createAsyncThunk('posts/getPost', async (id) => {
    // dispatch(setIsLoading(true))
    const { data } = await api.fetchPost(id);
    // console.log('getpostxx', data);
    return data;
})

export const getPostsBySearch = createAsyncThunk('posts/getpostsbysearch', async (searchQuery, { dispatch }) => {
    // console.log('query', searchQuery);
    //double destructuing, first for getting data from api, the second is getting the data object from controllers
    // const {data : {data}} = await api.fetchPostsBySearch(searchQuery); //to destrucure use : searchQuery.search/tags
    dispatch(setIsLoading(true))
    const { data } = await api.fetchPostsBySearch(searchQuery); //to destrucure use : searchQuery.search/tags

    // console.log('getPostsBySearch', data);
    return data;
})


export const createPost = createAsyncThunk('posts/create', async ({ postData, navigate }) => {
    //jika newpost satu aja maka tidak spesifik bisa diganti apa saja
    const response = await api.createPost(postData);
    navigate(`/posts/${response.data._id}`)
    console.log('create', response.data);
    return response.data;
});

// export const updatePost = createAsyncThunk('posts/:id/update', async (obj) => {
//     const response =  await api.updatePost(obj.currentId, obj.postData);

//     return response.data;
// });
//ini working karena obj diangggap argumen yg dimasukan, jadi tinggal specisfy seperti obj.currentId

export const updatePost = createAsyncThunk('posts/:id/update', async ({ currentId, postData }) => {
    const response = await api.updatePost(currentId, postData);
    console.log('from test', currentId);
    console.log('updatedata', response);
    return response.data;
});

export const deletePost = createAsyncThunk('posts/id/delete', async postId => {
    const response = await api.deletePost(postId);
    return response.data;
});

export const likePost = createAsyncThunk('posts/:id/likepost', async (currentId) => {
    const response = await api.likePost(currentId);

    return response.data;
});

export const commentPost = createAsyncThunk('posts/:id/commentPost', async ({ value, id }) => {
    console.log('value', value);
    console.log('id', id);

    const { data } = await api.comment(value, id);
    console.log('data from asyncThunk', data);
    //return only comments
    return data;
});




export const postsSlice = createSlice({
    name: 'MemoryPosts',
    initialState: {
        posts: [],
        // selectedPost: null,
        isLoading: false,
    },
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        }

        // setSelectedPost: (state, action) => {
        //   if (action.payload === null) state.selectedPost = null;
        //   else
        //     state.selectedPost = state.posts
        //       .filter(post => action.payload === post._id)
        //       .pop();
        // },
    },

    // All of the async reducers that interact with the DB go below here
    // the action.payload is coming from the (res)ponse from the back-end. No, its coming from data from api
    extraReducers: builder => {
        // builder.addCase(getAllPosts.fulfilled, (state, action) => {
        //     state.posts = action.payload;
        // });
        builder.addCase(getAllPosts.fulfilled, (state, action) => {
            state.posts = {
                ...state.posts,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            };
            console.log('getAllPostsbuilder', state.posts);
            state.isLoading = false;
        });

        builder.addCase(getAllPosts.pending, (state, action) => {
            state.isLoading = true;
        });


        builder.addCase(getPost.fulfilled, (state, action) => {
            state.posts = {
                ...state.posts,
                post: action.payload
            }
            state.isLoading = false;
            // console.log('getPostBuilder', state.posts);
        });
        builder.addCase(getPost.pending, (state, action) => {
            state.isLoading = true;
        });

        builder.addCase(getPostsBySearch.fulfilled, (state, action) => {
            state.posts = {
                ...state.posts,
                posts: action.payload.data
            }
            // console.log('getPostsBySearchBuilder', state.posts);
            state.isLoading = false;
        });
        builder.addCase(createPost.fulfilled, (state, action) => {
            state.posts = { ...state.posts, posts: [...state.posts.posts, action.payload] }
            console.log('createPostBuilder', state.posts);
        });
        builder.addCase(updatePost.fulfilled, (state, action) => {
            state.posts = {
                ...state.posts, posts: state.posts.posts.map(post =>
                    post._id === action.payload._id ? action.payload : post
                )
            }
        })
        builder.addCase(deletePost.fulfilled, (state, action) => {
            state.posts = { ...state.posts, posts: state.posts.posts.filter(post => post._id !== action.payload._id) };
            //so 
            // workouts: state.workouts.filter((w) => w._id !== action.payload._id)


            //   state.isLoading = false;
        });
        builder.addCase(likePost.fulfilled, (state, action) => {
            // console.log('likePost Builder fired - action.payload = ', action.payload);
            state.posts = {
                ...state.posts, posts: state.posts.posts.map(post =>
                    post._id === action.payload._id ? action.payload : post
                )
            };
        });
        builder.addCase(commentPost.fulfilled, (state, action) => {
            // console.log('likePost Builder fired - action.payload = ', action.payload);
            console.log('payload from builder', action.payload);
            state.posts = {
                //return all the other posts normally...
                //change the post that just received a comment...
                ...state.posts, posts: state.posts.posts.map(post => {
                    console.log('id1', action.payload._id)
                    console.log('id2', post._id)
                    if (post._id === action.payload._id) {
                        //yes comment?
                        console.log('payloadt1', action.payload);
                        return action.payload;
                    }
                    //no comments empty
                    //current to show state
                    console.log('postt2', (current(post)));
                    return post;
                }
                )
            };
        });
    },
});

export const { setIsLoading } = postsSlice.actions; //not used?

export default postsSlice.reducer;