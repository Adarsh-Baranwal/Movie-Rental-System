const jwt=require('jsonwebtoken');
const config=require('config');

function auth (req,res,next)
{
    const token=req.header('x-jwt');
    if(!token) return res.status(401).send('Token is missing!!Access Dennied');
    try
    {
        const decoded=jwt.verify(token,config.get('jwtprivatekey'));
        req.user=decoded;
        next();
    }
    catch(ex)
    {
        res.status(400).send('Invalid Token!!!!!');
    }
}
module.exports=auth;