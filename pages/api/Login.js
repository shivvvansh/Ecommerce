// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import User from "../../models/User";
import connectDB from "../../middleware/mongoose";
import bcrypt from "bcrypt";
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method == "POST") {
    // console.log("email:"+req.body.email);
    // console.log("password:"+req.body.password);

    let user = await User.findOne({ email: req.body.email });
    if (user) {
      const data = await bcrypt
        .compare(req.body.password, user.password)
        .then(function (result) {
          if (result) {
            var token = jwt.sign(
              { email: req.body.email, name: req.body.name },
              process.env.JSONWEBTOKEN,
              { expiresIn: "2d" }
            );
            res.status(200).json({ success: "success", token: token });
          } else {
            res.status(400).json({ errorC: "Wrong Credentials" });
          }
        });
      //  console.log(pass);
    } else {
      res.status(400).json({ errorC: "Wrong Credentials" });
    }
  } else {
    res.status(400).json({ error: "These method is not allowed" });
  }
};
export default connectDB(handler);
