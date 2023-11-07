import Post from "../models/postModel.js"

const getIndexPage = async (req,res) =>{
    console.log("REQUEST USER", res.locals.user)
  try {
    const posts = await Post.find({}).sort({uploadedAt: -1}).limit(3) 

    res.render('index',{
        posts
    })
  } catch (error) {
    res.status(500).json({
        succeded: false,
        error
    })
  }


    
}


const getContactPage = (req,res) =>{

    res.render('contact')
}



const getLoginPage = (req,res) =>{

    res.render('login')
}

const getRegisterPage = (req,res) =>{

    res.render('register')
}


const getLogout = (req,res)  =>{
    
    res.cookie("jwt"," ", {
        maxAge:1
    })

    res.redirect('/')
}

const addPostPage = (req,res) =>{

    res.render('addpost')
}
 


export {getIndexPage, getContactPage,getLoginPage,getRegisterPage,getLogout,addPostPage }