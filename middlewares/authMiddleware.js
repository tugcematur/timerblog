import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

const authenticateToken = (req,res,next) =>{

    try {
        
        const token = req.cookies.jwt

        if (token) {
            
            jwt.verify(token,process.env.JWT_SECRET,(err) =>{
                if(err){
                    console.log(err)
                    res.redirect('/login')  
                }else{
                    next()
                }
            })
        } else {
            res.redirect('/login')
        }
    } catch (error) {
        
        res.status(401).json({
            succeeded:false,
            error: "Not authorized"
        })
    }    

}


const checkUser = async (req,res,next) =>{

    const token = req.cookies.jwt 


    if (token) {
        jwt.verify(token,process.env.JWT_SECRET,async (err,decodedT) =>{
        
         if (err) {
            res.locals.user = null
            next()
         } else {
            const user = await User.findById(decodedT.userId)
            res.locals.user = user

            next()
         }   
        })
    } else {
        res.locals.user = null
        next()
    }
}

export {authenticateToken, checkUser}