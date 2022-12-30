import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';



export const getPosts = async (req, res) => {
    const {page} = req.query


    try {
        //number of posts per page
        const LIMIT = 8
        //start index on a spesific page, the 1st post on the third page would be 8 + 8 + 8-1 =23
        //backend makes everything into string thats why we need to make it into number
        const startIndex = (Number(page)-1) * LIMIT //get the starting index of every page

        //count how many documents of posts do we have, the last page we can scroll to?
        const total = await PostMessage.countDocuments({});
        console.log('total', total);


        //skip the prev pages? if we are on page 2 we dont want to fetch 16 posts again. we want to skip the first 8.
        const posts = await PostMessage.find().sort({_id: -1}).limit(LIMIT).skip(startIndex)

        const postMessages = await PostMessage.find();
        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});

    } catch (error) {
        res.status(400).json({ message: error.message })

    }
};

//perbedaan
//QUERY -> /posts?page=1 -> page = 1
//PARAMS -> /posts/:id(123) -> id = 123
// axios.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);

export const getPostsbySearch = async (req, res) => {
    //from what we send in api
    const {searchQuery, tags} = req.query
    // console.log('ewe', req.query);
    try {
        const title = new RegExp(searchQuery, "i");//Test TEST tesT => test
        
        // console.log('title', title);
        //find me all the posts that match one of those two criteria.
        //the first one is title (what we type on front end)
        //second is one of the tags IN the array of tags equals to our tags
        //tags.split : it was strings of 'usa,europe' with split it become array of [usa, europe]
                
        const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});

                
        // console.log({data:posts});
        res.json({ data: posts });

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

export const commentPost = async (req,res) => {
    try {
        const { id } = req.params
        const { value } = req.body

        console.log(id, value)

        const post = await PostMessage.findById(id)
        post.comments.push(value)
        const updatePost = await PostMessage.findByIdAndUpdate(id, post, { new: true })

        res.json(updatePost)

    } catch (error) {
        res.status(409).json({ message: error.message })
    }

}