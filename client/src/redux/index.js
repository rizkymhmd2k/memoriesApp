import { configureStore } from '@reduxjs/toolkit';
import postReducer from './postSlice'


const store = configureStore({
    reducer: {
        memoryPosts: postReducer,
    }
})

export default store