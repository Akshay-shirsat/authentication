const userModel = require ('../models/user')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const SECRET_KEY = "NOTEAPI"


const signup = async(req,res)=>{
    console.log(req.body)
const username = req.body.username
const email = req.body.email
const password = req.body.password

try {
    //existing user
    const existingUser = await userModel.findOne({email:email})
    if(existingUser){
        return res.status(400).json({massage:"User already exists"})
    }
   //hashed password
    const hashpassword = await bcrypt.hash(password,10);

    //user creation
    const result = await userModel.create({
        email:email,
        password:hashpassword,
        username : username 
    })
    //token generation
    const token = jwt.sign({email:result.email,id:result._id},SECRET_KEY)
    res.status(201).json({user:result,token:token})


} catch (error) {
    console.log(error)
    res.status(500).json({
        massage:"Something Went Wrong"
    })
}

}

const signin =async (req,res)=>{
const {email,password}=req.body;

try {
    //existing user
    const existingUser = await userModel.findOne({email:email})
    if(!existingUser){
        return res.status(400).json({massage:"User not found"})
    }
    
    const matchPassword = await bcrypt.compare(password,existingUser.password)

    if(!matchPassword){
        return res.status(400).json({massage:"invalid credentials"})
    }

    const token = jwt.sign({email:existingUser.email,id:existingUser._id},SECRET_KEY)
    res.status(201).json({user:existingUser,token:token})

} catch (error) {
    console.log(error)
    res.status(500).json({
        massage:"Something Went Wrong"
    })
}
}

module.exports = {signin,signup}