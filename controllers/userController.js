import User from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const createUser = async (req, res) => {

    try {
        const user = await User.create(req.body)
        res.status(201).json(user)
    }
    catch (err) {
        res.status(500).json(err)
    }


}


const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body

        const user = await User.findOne({ email: email })

        let same = false

        if (user) {

            same = await bcrypt.compare(password, user.password)
            console.log(same)
        }
        else {

            return res.status(401).json({
                succeeded: false,
                error: " there is no such user"
            })
        }

        if (same) 
       { 
            // res.status(201).json({
            //     user,
            //     token: createToken(user._id)
            // })


            const token = createToken(user._id)
            res.cookie("jwt",token,{
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24
            })

            res.redirect('/users/dashboard')
        }
        else {

            return res.status(401).json({
                succeeded: false,
                error: " Password are not match"
            })
        }

    }
    catch (error) {

        res.status(500).json({
            succeeded: false,
            error
        })
    }

}

const createToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}

const getDashboard = (req,res) =>{

    res.render('dashboard')
}


export { createUser, loginUser , getDashboard}