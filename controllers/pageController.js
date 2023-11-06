

const getIndexPage = (req,res) =>{

    res.render('index')
    
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