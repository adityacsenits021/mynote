const express=require('express');
const router=express.Router();
const fetchUser=require("../middleware/fetchUser");
const User=require('../model/User');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');

const JWT_SECRET ="adityaisagoodb$oy"
//Route_1: Create a User using:Post "/api/auth/createuser" to login required
router.post('/createuser',[
    body('email','enter a valid email').isEmail(),
    body('name','enter a valid name').isLength({ min: 3 }),
    body('password','password must be of atleast 6 characters').isLength({ min: 6 })
],async(req, res)=>{
    let success=false;
    
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    
        
    
        
    try {
    
    let user= await User.findOne({email: req.body.email})
    if(user){
        return res.status(400).json({success,error:"Sorry a user with this email already exists."})
    }
    const salt=await bcrypt.genSalt(10);
    const secPass=await bcrypt.hash(req.body.password, salt);
    user=await User.create({
        name: req.body.name,
        email:req.body.email,
        password: secPass,
      });
      const data={
          user:{
              id:user.id
          }
      }
      const authtoken= jwt.sign(data,JWT_SECRET);
      success=true;
    //   res.json({user})
      res.json({success,authtoken});
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured");
    }
})

// Route_2: Authenticate a user using :post "/api/auth/login". no login required
router.post('/login',[
    body('email','enter a valid email').isEmail(),
    body('password','password cannot be blank').exists()
    
],async(req, res)=>{
    let success=false;
    // if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email, password}=req.body;
    try {
        let user=await User.findOne({email});
        if(!user){
            success=false;
          return   res.status(400).json({error:"Please try to login with correct credentials"});

        }
        const passwordCompare=await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            success=false;
            return   res.status(400).json({error:"Please try to login with correct credentials"});
        }
        const data={
            user:{
                id:user.id
            }
        }
        const authtoken= jwt.sign(data,JWT_SECRET);
     success=true;
    //   res.json({user})
      res.json({success,authtoken});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error");
    }

})

// ROute_3: Get logged in user detail: POST "/api/auth/getuser". login required
router.post('/getuser',
  fetchUser,
    
async(req, res)=>{
try {
    userId=req.user.id;
    const user=await User.findById(userId).select("-password")
    res.send(user)
} catch (error) {
    console.error(error.message);
        res.status(500).send("Internal server Error");
}
}
)
module.exports=router