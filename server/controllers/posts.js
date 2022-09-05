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

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const createPost = async (req, res) => {
    const body = req.body;

    const newPost = new PostMessage(body)

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

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No post with that id found.');
    }

    try {
        const post = await PostMessage.findById(id);
        const updatedLike = await PostMessage.findByIdAndUpdate(id , { likeCount: post.likeCount + 1 }, { new: true });

        console.log('Successfully liked Post');
        res.json(updatedLike);

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


