import TodoInput from "../../componenets/todoInput/todoInput"
import styles from "./dashboard.module.css"
import TodoItem from "../../componenets/todoItem/todoItem"
import { getDate, getTodos } from "../../lib/data"
import { getSession } from "../../lib/actioniron";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getSession();
  const todos = await getTodos(session.user_email);
  const today = getDate();

  if (!session.isLoggedIn) {
    redirect("/");
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.date}>{today}</h1>
      <div className={styles.todoContainer}>
        <TodoInput email={session.user_email} />
        {todos.map((todo) => (
          <div className={styles.todo} key={todo.id}>
            <TodoItem todo={todo} key={todo.id} />
          </div>
        ))}
      </div>
    </div>
  )
}
