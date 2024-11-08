import { redirect } from "next/navigation";
import LoginForm from "../../../componenets/loginForm/loginForm";
import { getSession } from "../../../lib/actioniron";
import styles from "./login.module.css";

export default async function LoginPage() {
  const session = await getSession();

  if(session.isLoggedIn){
    redirect("/");
  }
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <LoginForm />
      </div>
    </div>
  );
}