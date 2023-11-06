import mongoose from "mongoose"

const {Schema} = mongoose
const postSchema = new Schema({

    title:{
        type:String,
        required:true,
        trim:true
    },
    content:{
        type:String,
        required:true,
        trim:true
    },
    uploadedAt:{
        type:Date,
        default:Date.now
    },
    url:{
        type:String,
        required:true,

    },
    image_id:{
        type:String
    }
    
})


const  Post = mongoose.model("posts",postSchema)

export default Post