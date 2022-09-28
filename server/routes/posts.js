import express from 'express'

import {getPostsbySearch, getPosts, getPost, createPost, updatePost, deletePost, likePost} from '../controllers/posts.js'
import auth from '../middleware/auth.js';


const router = express.Router();


// require auth for all workout routes
//router.use(requireAuth)

//everyone can see the posts but only authenticatd users can do else

router.get('/', getPosts )

router.get('/search', getPostsbySearch )
router.get('/:id', getPost )



// router.get('/:id', getPost);
router.post('/', auth, createPost )
//deleting and updating posts only you created (FRONTEND)
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost)
//user can only like once for one spesific user id (BACKEND)
router.patch('/:id/likePost', auth, likePost)


export default router;