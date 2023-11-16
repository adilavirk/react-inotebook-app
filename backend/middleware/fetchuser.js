const jwt = require('jsonwebtoken');
const JWT_SECRET = "Iamadilavirk";
const fetchuser = (req,res,next)=>{
// fetch the user from the JWT token and add ID to request object
// auth-token header ka name ha.
const token = req.header('auth-token');
// agr token majood nhi ha then:
if(!token){
    res.status(401).send({error:"Please authenticate using a valid token"})
}
// ho skta ha token valid na ho to is liye isa Try&Catch ma dal denga
try {
    const data = jwt.verify(token , JWT_SECRET)
    req.user = data.user;
    next();
    
} catch (error) {
    res.status(401).send({error:"Please authenticate using a valid token"})
}

}
module.exports = fetchuser;