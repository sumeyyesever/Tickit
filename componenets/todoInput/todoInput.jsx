"use client"

import { addTodo } from "../../lib/action";
import { getSession } from "../../lib/actioniron";
import styles from "./todoInput.module.css"
import { useFormState } from "react-dom";

export default function TodoInput({ email }) {
  const [state, formAction] = useFormState(addTodo)
  return (
    <div className={styles.container}>
      <form className={styles.form} action={formAction}>
        <input type='text' name='todo' />
        <input type="hidden" name="user_email" value={email} />
        <button>Add</button>
      </form>
    </div>
  )
}
