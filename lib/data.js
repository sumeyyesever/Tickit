import { Todo, User } from "./models";
import { connectToDb } from "./utils"
import bcrypt from "bcrypt";

export const getTodos = async (user_email) => {
    try {
        connectToDb();
        let user_todos = [];
        const todos = await Todo.find();
        todos.forEach(todo => {
            if (todo.user_email === user_email) {
                user_todos.push(todo);
            }
        });
        return user_todos;
    } catch (error) {
        console.log(error);
        throw new Error("something went wrong during fecthing todos from db");
    }
};

export const getUser = async (user_email, password) => {
    try {
        connectToDb();
        const user = await User.findOne({ email: user_email });
        if (!user) {
            return false;
        }

        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if (!isPasswordCorrect) {
            return false;
        }
        return user;
    } catch (error) {
        console.log(error);
        throw new Error("something went wrong during during getUser function in data");
    }
}

export const getDate = () => {
    const date = new Date();
    const day = date.getDate();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = months[date.getMonth()]
    const year = date.getFullYear();
    const today = month + " " + day + ", " + year;
    return today;
}