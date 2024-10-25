const express=require('express');
const mongoose =require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const cors=require('cors');
//const axios=require('axios');
// validate
let namepattern=/^[A-z][a-z]+$/
let passwordpattern=/^(?=.[0-9])(?=.[a-z])(?=.[A-Z])(?=.[@#$%^&-+=()])(?=\S+$).{8,20}$/;
// /^(?=.[0-9])(?=.[a-z])(?=.[A-Z])(?=.[@#$%^&-+=()])(?=\S+$).{8,20}$/;


// database connection
mongoose.connect("mongodb://localhost:27017/sports")
.then(()=>{
    console.log("database connected successfully")
})
.catch((err)=>{
    console.log(err)
})
// import models
const userModel=require('./Models/userModel');

const app=express();
app.use(express.json());
app.use(cors());
//  end points register user
app.post('/register', async (req, res) => {
    let user = req.body;
    console.log(user);
    try {
        // Validate the name format
        if (!namepattern.test(user.name)) {
            return res.status(400).send({ message: "Name should contain only letters" });
        }

        // Validate the sports array (it should have exactly 3 items)
        if (!Array.isArray(user.sport) || user.sport.length !== 3) {
            return res.status(400).send({ message: "You must select exactly 3 sports" });
        }

        // Check if the email already exists
        const existUser = await userModel.findOne({ email: user.email });
        if (existUser) {
            return res.status(400).send({ message: "Email already exists" });
        }

        // Generate salt and hash the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        // Create a new user in the database
        let doc = await userModel.create(user);
        res.status(201).send({ message: "User registered successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Some problem occurred while registering" });
    }
});
//endpoint for login
app.post('/login',async (req,res)=>{
    let userCred=req.body;
    try{
        const user=await userModel.findOne({email:userCred.email})
        if(user!=null){
            bcrypt.compare(userCred.password,user.password,(err,sucess)=>{
                if(sucess==true){
                    jwt.sign({email:userCred.email},"Nani",(err,token)=>{
                        if(!err){
                            res.status(200).send({message:"Login sucess",token:token,name:user.name,id:user._id})
                        }
                       
                    })
                }
                else{
                    res.status(403).send({message:"Incorrect password"});
                }
            })
        }
        else{
            res.status(404).send({message:"user not found enter valid email"});
        }
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send({message:"Some Problem"})
    }
})
app.listen(8080,()=>{
    console.log("server running up and down");
 })