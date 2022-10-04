import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: "String",
    message: "String",
    name: "String",
    creator: "String",
    tags: [String],
    selectedFile: "String",
    //old method
    // likeCount:{
    //     type: Number,
    //     default: 0
    // }

    //new
    likes:{
        type: [String],
        default: [],
    },
    comments:{
        type: [String],
        default: [],
    },

}, { timestamps: true });


const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;