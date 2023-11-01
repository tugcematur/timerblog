

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

    res.render('login')
}

export {getIndexPage, getContactPage,getAboutPage,getLoginPage,getRegisterPage}