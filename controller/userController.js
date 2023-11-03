import User from "../models/userModel.js"

const createUser = async (req, res) => {
   
try{
    const user = await User.create(req.body)//taglrdeki name ile db deki sütunlar aynı olmalı
    //  let error1={"name":"tugce"}
    // res.status(201).json({
    //     succeded: true,
    //     user
    // })

    // res.redirect('/login')
    //res.status(201).json(error1) //farkı anlamak için yazdım
    res.status(201).json({ user: user._id })
}
catch(error){
    console.log("ERROR", error)
}


}

export {createUser}