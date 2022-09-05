import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api'

//create action here
export const getAllPosts = createAsyncThunk('posts/allPosts', async () => {
    const response = await api.fetchPosts();
    return response.data;
}
)

export const createPost = createAsyncThunk('posts/create', async (newPost) => {
    //newpost tidak spesifik bisa diganti apa saja
    const response = await api.createPost(newPost);
    return response.data;
});

// export const updatePost = createAsyncThunk('posts/:id/update', async (obj) => {
//     const response =  await api.updatePost(obj.currentId, obj.postData);

//     return response.data;
// });
//ini working karena obj diangggap argumen yg dimasukan, jadi tinggal specisfy seperti obj.currentId

export const updatePost = createAsyncThunk('posts/:id/update', async ({ currentId, postData }) => {
    const response = await api.updatePost(currentId, postData);

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



export const postsSlice = createSlice({
    name: 'MemoryPosts',
    initialState: {
        posts: [],
        // selectedPost: null,
        // isLoading: false,   
    },
    reducers: {

        // setSelectedPost: (state, action) => {
        //   if (action.payload === null) state.selectedPost = null;
        //   else
        //     state.selectedPost = state.posts
        //       .filter(post => action.payload === post._id)
        //       .pop();
        // },
    },

    // All of the async reducers that interact with the DB go below here
    // the action.payload is coming from the (res)ponse from the back-end
    extraReducers: builder => {
        builder.addCase(getAllPosts.fulfilled, (state, action) => {
            state.posts = action.payload;
        });
        builder.addCase(createPost.fulfilled, (state, action) => {
            state.posts = [...state.posts, action.payload];
        });
        builder.addCase(updatePost.fulfilled, (state, action) => {
            state.posts = state.posts.map(post =>
                post._id === action.payload._id ? action.payload : post
            )
        })
        builder.addCase(deletePost.fulfilled, (state, action) => {
            state.posts = state.posts.filter(post => post._id !== action.payload._id);
            //so 
            // workouts: state.workouts.filter((w) => w._id !== action.payload._id)


            //   state.isLoading = false;
        });
        builder.addCase(likePost.fulfilled, (state, action) => {
            console.log('likePost Builder fired - action.payload = ', action.payload);
            state.posts = state.posts.map(post =>
                post._id === action.payload._id ? action.payload : post
            );
        });
    },
});
export const { setIsLoading, setSelectedPost } = postsSlice.actions; //not used?

export default postsSlice.reducer;