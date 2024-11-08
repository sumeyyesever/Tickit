"use client"

import styles from "./todoItem.module.css";
import { useState, useEffect } from 'react';
import DeleteToDoForm from "../deleteTodoForm/deleteTodoForm";
import EditTodoForm from "../editTodoForm/editTodoForm";

export default function TodoItem({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(todo.title);
  const todo_id = todo._id;
  const id = "" + todo_id;

  useEffect(() => {
    const savedIsClicked = localStorage.getItem(`isClicked-${id}`);
    if (savedIsClicked === "true") {
      setIsClicked(true);
    }
  }, [id]);

  const handleEdit = () => setIsEditing(true);
  const handleChange = (e) => setUpdatedTitle(e.target.value);

  const handleClick = () => {
    const newIsClicked = !isClicked;
    setIsClicked(newIsClicked);

    localStorage.setItem(`isClicked-${id}`, newIsClicked);
  };

  return (
    <div className={styles.container}>
      {isEditing ? (
        <input
          className={styles.editInput}
          type="text"
          value={updatedTitle}
          onChange={handleChange}
        />
      ) : (
        <>
          {isClicked ?
            <span className={styles.todo} onClick={handleClick}> ✔
              <span className={styles.tick}> {todo.title} </span>
            </span>
            :
            <span className={styles.todo}>
              <span className={styles.square} onClick={handleClick}>🔲</span>
              {todo.title}
            </span>
          }
        </>
      )}
      <div className={styles.todoButtons}>
        {isEditing ? (
          <EditTodoForm id={id} title={updatedTitle} />
        ) : (
          <>
            <DeleteToDoForm id={id} />
            <button className={styles.editButton} onClick={() => setIsEditing(true)}>Edit</button>
          </>
        )}
      </div>
    </div>
  );
}
