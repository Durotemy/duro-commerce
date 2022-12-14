import mongoose from 'mongoose';

interface user{
    name:string,
    email:string,
    password:string,
    isAdmin:boolean
}

const userSchema = new mongoose.Schema<user>({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    isAdmin:{type:Boolean, required:true, default:false}
})

const User = mongoose.model("userSchema", userSchema);
export default User;