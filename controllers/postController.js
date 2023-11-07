import Post from "../models/postModel.js"
import {v2 as cloudinary} from "cloudinary"
import fs from "fs"


const addPost = async (req,res) =>{


    const  result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath,
        {
            use_filename: true,
            folder: 'timerblog'
        }
    )
 
    console.log("RESULT:",result)

    try {

    const post = await Post.create({
            title:req.body.title,
            content:req.body.content,
            user:res.locals.user._id,
            url:result.secure_url,
            image_id: result.public_id

        })
        
        // res.status(201).json({
        //     succeeded:true,
        //     post

        // })

        res.redirect('/users/dashboard')

        fs.unlinkSync(req.files.image.tempFilePath) 


    } catch (error) {
        res.status(500).json({
            succeeded:false,
            error
        })
    }
   

}

const  getPost = async (req,res) =>{


    try {
        
        const post = await Post.findById({_id:req.params.id})

        let isOwner =false
        

        if(res.locals.user)
        {
            isOwner = post.user.equals(res.locals.user._id)
        }

        res.status(201).render('post',{
            post,
            isOwner
        })        
         
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}

const deletePost = async (req,res) =>{

try {
    

  const  post = await Post.findById({_id:req.params.id})


  const imagetId = post.image_id
 // console.log(req.params.id)
  await cloudinary.uploader.destroy(imageId)
  await Post.findByIdAndDelete({_id: req.params.id})

  res.status(200).redirect("/users/dashboard")

} 
catch (error)
{
    res.status(500).json({
        succeded: false,
        error
    })
}
    
}

const updatePost = async (req,res) =>{

    try {
        const post = await Post.findById({_id:req.params.id})

        if(req.files)
        {
            const imageId = post.image_id
    
            await cloudinary.uploader.destroy(imageId)
    
    
            const result = await cloudinary.uploader.upload(
                req.files.image.tempFilePath,
                {
                    use_filename: true,
                    folder: 'timerblog'
                }
            )

            post.url = result.secure_url
            post.image_id = result.public_id

            fs.unlinkSync(req.files.image.tempFilePath) 
        }


        post.title = req.body.title
        post.content = req.body.content

        post.save()

        res.status(200).redirect(`/posts/${req.params.id}`)

    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
  
}
const updatePage = async (req,res) =>{

    const post = await Post.findById({_id:req.params.id})
    res.render('updatepost',{
    post
 })

}

const getAllPosts =  async (req,res) =>{

    try {
        const posts = await Post.find({}).populate("user").sort({uploadedAt: -1})
        

        res.status(201).render('posts',{
            posts
        })
        
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error:error
        })
    }
}

export {addPost,getPost,deletePost,updatePage,updatePost,getAllPosts}