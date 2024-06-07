const express = require('express') 
const userRouter = require('./routes/userRoutes')
const noteRoute = require('./routes/noteRoutes')
const mongoose = require('mongoose')

const app = express()

app.use(express.json());

app.use("/users",userRouter)
app.use("/note",noteRoute)


main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/authentication')
    .then(()=>{
        app.listen(8080,()=>{
            console.log("server is running")
        })
    })
    .catch((err)=>{
        console.log(err)
    })
    

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}



