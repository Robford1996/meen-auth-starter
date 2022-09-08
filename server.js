const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose")
const userController = require("./controllers/users")
const session = require("express-session")
const sessionsController = require("./controllers/sessions")

const PORT = process.env.PORT

//Database Configuration
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//Database Connection Error/Success

const db = mongoose.connection;
db.on("error", (err)=> console.log(err.message + "is mongoose not running?"))
db.on("connected", ()=> console.log("mongo connected"))
db.on("disconnected", ()=> console.log("mongo disconnected"))

//Middleware
//Body Parser middleware: give us access to req.body
app.use(express.urlencoded({extended: true}))
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    })
)
app.use("/sessions", sessionsController)

//Routes / Controllers
app.use("/users", userController)

app.get("/", (req, res)=>{
    res.render("index.ejs")
})

//Server Test
// app.get("/", (req, res)=>{
//     res.send("Server is working")
// })

//Listener
app.listen(PORT, ()=>{
    console.log(`server is listening on port ${PORT}`)
})