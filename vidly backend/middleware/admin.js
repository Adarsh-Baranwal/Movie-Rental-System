const Users=require('../models/user');

module.exports=async function admin(req,res,next){
    const user=await Users.findById(req.user.id).select('isAdmin');
    //console.log(user.isAdmin);
    if(!user.isAdmin) return res.status(403).send('You are not allowed!!');
    else next();
}