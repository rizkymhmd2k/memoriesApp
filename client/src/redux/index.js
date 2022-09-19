import { configureStore } from '@reduxjs/toolkit';
import postReducer from './postSlice'
import userReducer from './userSlice';



const store = configureStore({
    reducer: {
        memoryPosts: postReducer,
        user: userReducer,
    }
})

export default store