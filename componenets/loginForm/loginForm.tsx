"use client";

import { useFormState } from "react-dom";
import { login } from "../../lib/actioniron";
import styles from "./loginForm.module.css"
import Link from "next/link";

const LoginForm = () => {
  const [state, formAction] = useFormState<any, FormData>(login, undefined);

  return (
    <form action={formAction} className={styles.form}>
      <input type="text" name="user_email" required placeholder="email" />
      <input type="password" name="password" required placeholder="password" />
      <button>Login</button>
      <Link href="/register">
        Don't have an account? <b>Register</b>
      </Link>
      {state?.error && <p className={styles.error_par}>{state.error}</p>}
    </form>
  );
};

export default LoginForm;