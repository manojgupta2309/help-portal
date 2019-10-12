const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const User = require('../models/userModel')

router.post('/register', function(req, res) {
  
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  
  let newUser={
    "username" : req.body.username,
    "password" : hashedPassword
  }
  newUser= new User(newUser);
  newUser.save((err, user) => {
  if (err) {
    res.status(500).send(err);
  }
  res.status(201).json({"message": "User created successfully"});
  
});

});

router.post('/login', function(req, res) {
  let userValid,loggedUser;
  let username = req.body.username;
  User.findOne({username:username},(err,user)=>{
    if (err){
        res.status(500).send(err);
        return;
    } 
   if(!user){
        res.status(404).json({"message":"user not found"});
        return;
    }
    

    console.log("obj",user)
    if(user.username==username &&
        bcrypt.compareSync(req.body.password, user.password))
            {
            userValid=true;
            loggedUser=user;
            console.log("loggedUserTrue",loggedUser);
        }
      if(userValid){
    
        res.status(200).json({ auth: true, username:loggedUser.username});
    
      }else{
          res.status(401).json({ auth: false,status:"Authentication failed."});
      }
  })
 

});

module.exports = router;