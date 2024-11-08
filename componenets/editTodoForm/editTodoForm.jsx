"use client"

import { updateTodo } from "../../lib/action"
import styles from "./editTodoForm.module.css"
import { useFormState } from "react-dom";

const EditTodoForm = ({ id, title }) => {
  const [state, formAction] = useFormState(updateTodo);

  return (
    <form action={formAction}>
      <input type="hidden" name="title" value={title} />
      <input type="hidden" name="id" value={id} />
      <button className={styles.editButton} onClick={() => window.location.reload()}>Ok</button>
    </form>
  )
}

export default EditTodoForm