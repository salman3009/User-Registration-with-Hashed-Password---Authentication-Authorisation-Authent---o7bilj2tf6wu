const users   =require("../models/user.js");
const bcrypt = require('bcrypt');

/*
Post request json file structure


    obj =  {
        "name":name,
        "email":email,
        "password": password
    }

 */

//You need to complete the route of user register
//you need to register the user and return the id assign to the user.
//the password you save in database should be hashed using bcrypt libary.
//you will get error if user mail allready exist in that case you need to return 404 status with err message that you get.
//to look the user schema look ../models/user.js

const registerUser =async (req, res) => {

     try{
      let name = req.body.name;
      let email = req.body.email;
      let password = req.body.password;

      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password,salt);

      let data = new users({
        name,email,password:hashedPassword
      })

      let result = await data.save();
      res.send(result._id);

     }catch(err){
        res.status(404).send(err.message);
     }
    

}

module.exports = { registerUser };