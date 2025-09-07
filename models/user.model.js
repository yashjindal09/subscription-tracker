import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
 username: {
  type: String,
  required: [true,'User name is required'],
  trim: true,
  unique: true,
  minlength: 3,
  maxlength: 40,
 } ,
 email: {
  type: String,
  required: [true,'User email is required'],
  trim: true,
  unique: true,
  minlength: 3,
  maxlength: 40,
  lowercase: true,
  match: [/\S+@\S+\.\S+/, 'Please fill a valid email address'],
 },
 password:{
  type: String,
  required: [true, 'user password is required'],
  minlength: 6,
  match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/,
      "Password must contain at least 1 uppercase, 1 lowercase, and 1 special character"],
 }

}, {timestamps: true});

const User = mongoose.model('User',userSchema);

export default User;