

const getIndexPage = (req,res) =>{

    res.render('index')
    
}


const getContactPage = (req,res) =>{

    res.render('contact')
}


const getAboutPage = (req,res) =>{

    res.render('about')
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

export {getIndexPage, getContactPage,getAboutPage,getLoginPage,getRegisterPage,getLogout}