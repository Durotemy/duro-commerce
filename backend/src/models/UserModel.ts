import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

interface user{
    name:string,
    email:string,
    password:string,
    isAdmin:boolean
    matchPassword: (pw: string) => Promise<boolean>
}

const userSchema = new mongoose.Schema<user>({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    isAdmin:{type:Boolean, required:true, default:false}
})
userSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword,this.password)
}
userSchema.pre('save', async function (next: any) {
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model("userSchema", userSchema);
export default User;