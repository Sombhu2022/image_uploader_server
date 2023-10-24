import jwt from 'jsonwebtoken'
export const isImageAuth = async(req, res , next)=>{
     
    const  token = req.cookies.token
    console.log("token=>",token);
    if(!token){
        return res.status(400).json({success:false , message:"not login" })
    }
    //const decode = jwt.verify(token , process.env.JWT_KEY)
    next();
}