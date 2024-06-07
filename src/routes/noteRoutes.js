const express = require('express')
const noteRoute=express.Router()

    noteRoute.get("/",(req,res)=>{
        res.send("note get request")
})

noteRoute.post("/",(req,res)=>{
res.send("note post request")
})

module.exports= noteRoute