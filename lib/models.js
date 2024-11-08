import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        min:3, 
        max:20,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max:50
    },
    password: {
        type: String,
        required: true,
    },
}, {timestamps: true});

const todoSchema = new mongoose.Schema({
    id:{
        type: String,
    },
    title:{
        type: String,
        required: true,
    },
    user_email:{
        type: String,
        required: true,
    },
}, {timestamps: true});

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
export const Todo = mongoose.models?.Todo || mongoose.model("Todo", todoSchema);