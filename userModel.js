const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
    name:{
        type:String,
        // pattern:(/^[A-Za-z]+$/),
        min:3,
        max:20,
        required:true
    },
    email:{
        type:String,
        // pattern:("^[A-Z0-9._%+-]+@[")
        required:true
    },
    password:{
        type:String,
        // pattern:"^(?=.[0-9])(?=.[a-z])(?=.[A-Z])(?=.[@#$%^&-+=()])(?=\\S+$).{8,20}$",
        required:true
    },
    location:{
        type:String,
        required:true
    },
    sport:{
        type:[String],
     validate:[arrayLimit,'you must select 3 sports'],
required:true
    }
},{timestamps:true})
function arrayLimit(val){
   return val.length==3;
}
const userModel=mongoose.model('users',userSchema);
module.exports=userModel;