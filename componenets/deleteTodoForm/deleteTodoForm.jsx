"use client"

import { deleteTodo } from "../../lib/action"
import styles from "./deleteTodoForm.module.css"
import { useFormState } from "react-dom";

const DeleteTodoForm = ({ id }) => {
  const [state, formAction] = useFormState(deleteTodo);

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <button className={styles.deleteButton}>Delete</button>
    </form>
  )
}

export default DeleteTodoForm