import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';



export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages)
    } catch (error) {
        res.status(400).json({ message: error.message })

    }
};

export const getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        console.log(post);

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage({...post, creator : req.userId})

    try {
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({ message: error.message })

    }
}

// export const updatePost = async (req, res) => {
//     const { id: _id } = req.params;
//     const post = req.body;

//     if (!mongoose.Types.ObjectId.isValid(_id)) {
//         return res.status(404).send('No post with that Id found.');
//     }

//     await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });
//     res.json(post);
// };

export const updatePost = async (req, res) => {
    const { id } = req.params; // {id: _id} means we change it to the latter

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = await PostMessage.findByIdAndUpdate({ _id: id }, { ...req.body }, { new: true });
    //{_id:id} means _id equals to id
    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such workout' })
    }

    const deletedPost = await PostMessage.findOneAndDelete({ _id: id })

    if (!deletedPost) {
        return res.status(400).json({ error: 'No such post' })
    }

    res.status(200).json(deletedPost)
}

// export const deletePost = async (req, res) => {
//     const { id } = req.params;

//     console.log('Logging ID from controller = ', id);

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(404).send('No post with that id found.');
//     }

//     try {
//       await PostMessage.findByIdAndRemove(id);
//       console.log('Successfully Deleted Post');
//     } catch (error) {
//       console.log(error.message);
//     }

//     res.json(id); //send only id
//   };

export const likePost = async (req, res) => {
    const { id } = req.params;
    console.log('Logging ID from controller = ', id);

    //check if the user is already authenticated or not?
    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No post with that id found.');
    }

    try {
          // Get the original post state
        const post = await PostMessage.findById(id);
        //match it
        console.log('requser', req.userId);
        console.log('post.title experiment', post);

          // check if this person liked the post already, cb function that loop thru every id
          //each like is id from spesific person (post._id)
          //if each id is equal to string of req.userId then the person already liked it
        const index = post.likes.findIndex(id => id === String(req.userId)); 
        // console.log('index', index);
        // console.log('post.likes', post.likes);

        // only if their id is not in the above line (spy kd dobel)
        if (index === -1) {
        // like the post - by pushing id
         post.likes.push(req.userId);
        //  console.log('after push', post.likes);
        } else {
        // dislike a post - by removing id (returning all but the one that equals passed in id)
        post.likes = post.likes.filter(id => id !== String(req.userId));
        // console.log('no push but filter', post.likes);
        }

        
        // old method
        // const updatedLike = await PostMessage.findByIdAndUpdate(id , { likeCount: post.likeCount + 1 }, { new: true });
        //new
        const updatedLike = await PostMessage.findByIdAndUpdate(id , post, { new: true });

        console.log('Successfully liked Post');
        res.json(updatedLike);
        //SUMMARY
        //if the index is 0, which means there is matching id. we filter it.
        //if the index is -1, which means there is no matching id. we push it
        //index pertama kali pasti -1, karena blm di push

    } catch (error) {
        res.status(400).json({ message: error.message })
        //dont add message, easier like this to debug
    }

};

// export const likePost = async (req, res) => {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
//     const post = await PostMessage.findById(id);

//     const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
    
//     res.json(updatedPost);
// }


