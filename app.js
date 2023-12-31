import express from "express"
import dotenv from "dotenv"
import conn from "./db.js"
import cookieParser from "cookie-parser"
import fileUpload from "express-fileupload"
import {v2 as cloudinary} from "cloudinary"
import methodOverride from "method-override"
import pageRoute from "./routes/pageRoute.js"
import userRoute from "./routes/userRoute.js"
import postRoute from "./routes/postRoute.js"
import { checkUser } from "./middlewares/authMiddleware.js"


dotenv.config()



cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
})


conn()

const app = express()
const port = process.env.PORT


//ejs template engine 
app.set("view engine","ejs")

//static files middleware
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(fileUpload({useTempFiles: true}))
app.use(methodOverride('_method',{
    methods:['POST','GET']
}))
// app.use((req,res,next) =>{
//     console.log("1.middleware")
//     next();
// })

// app.use((req,res,next) =>{
//     console.log("2.Middleware")
//     next();
// })

// app.get('/',(req,res )=>{
//     res.send("Merhaba Dünya")
// })

// app.get('/about',(req,res )=>{
//     res.send("About")
// })
app.use('*',checkUser)
app.use('/',pageRoute)
app.use('/users',userRoute)
app.use('/posts',postRoute)



app.listen(port,() =>{
    console.log(`server calisiyor , http://localhost:${port})`)
})