const jwt = require("jsonwebtoken")
const SECRET_KEY = "NOTEAPI"

const auth = (req,res,next)=>{
    try {
        let token = req.headers.authorization;
        if (token) {
            token=token.split(" ")[1];
            let user= jwt.verify(token,SECRET_KEY)
            req.userId=user.Id
        } else {
            res.status(401).json({massage : "unathorized user"})
        }
        next()       
    } catch (error) {
        console.log(error)
        res.status(401).json({massage : "unathorized user"})
    }
}

module.exports=auth;