// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import User from "../../models/User"
import connectDB from "../../middleware/mongoose"
const bcrypt = require('bcrypt');

 const handler=async(req, res)=> {
    if(req.method == 'POST'){
    const saltRounds = 10; 
    // generating 10 round hash 
    await bcrypt.hash(req.body.password, saltRounds).then(function(hash) {
        try {
            let userLogin = new User({
             name: req.body.name,
             email: req.body.email,
             password: hash
             })
             userLogin.save()
             console.log(userLogin);
             res.status(200).json({ success: "success" }) 
             } catch (error) {
             res.status(400).json({ error:"bad request"})
             }
    });
    
        }
        else{
            res.status(400).json({ error: "These method is not allowed" })
        } 
  }
  export default connectDB(handler)