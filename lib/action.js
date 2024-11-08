"use server";

import { revalidatePath } from "next/cache";
import { Todo, User } from "./models";
import bcrypt from "bcrypt";
import { connectToDb } from "./utils";
import TodoInput from "../componenets/todoInput/todoInput";

export const addTodo = async (prevState, formData) => {
    const { todo, user_email } = Object.fromEntries(formData);
    try {
        connectToDb();
        const newTodo = new Todo({ title: todo, user_email });
        await newTodo.save();
        console.log("Todo saved to db");
        revalidatePath("/dashboard");
    } catch (error) {
        console.log(error);
        return { error: "Something went wrong during adding todo to db" };
    }
};

export const deleteTodo = async (prevState, formData) => {
    const { id } = Object.fromEntries(formData);
    try {
        connectToDb();
        await Todo.findByIdAndDelete(id);
        console.log("deleted todo");
        revalidatePath("/dashboard");
    } catch (error) {
        console.log(error);
        return { error: "Something went wrong during deleting the todo" };
    }
};

export const updateTodo = async (prevState, formData) => {
    const { id, title } = Object.fromEntries(formData);
    try {
        connectToDb();
        await Todo.findByIdAndUpdate(id, { title: title });
        console.log("updated todo");
        revalidatePath("/dashboard");
    } catch (error) {
        console.log(error);
        return { error: "Something went wrong during updating the todo" };
    }
};


export const register = async (previousState, formData) => {
    const { username, email, password, passwordRepeat } = Object.fromEntries(formData);
    if (password !== passwordRepeat) {
        return { error: "Passwords do not match" };
    }
    try {
        connectToDb();
        const user = await User.findOne({ email });
        if (user) {
            console.log("Mail already exists");
            return { error: "Mail already exists" };
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        console.log("user saved to db");
        return { success: true };
    } catch (error) {
        console.log(error);
        return { error: "Something went wrong during user saving to db" };
    }
};

