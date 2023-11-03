import express from "express"
import dotenv from "dotenv"
import conn from "./db.js"
import pageRoute from "./routes/pageRoute.js"
import userRoute from "./routes/userRoute.js"

dotenv.config()

conn()

const app = express()
const port = process.env.PORT


//ejs template engine 
app.set("view engine","ejs")

//static files middleware
app.use(express.static('public'))



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

app.use('/',pageRoute)
app.use('/users',userRoute)


app.listen(port,() =>{
    console.log(`server calisiyor , http://localhost:${port})`)
})