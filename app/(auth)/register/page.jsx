import { redirect } from "next/navigation";
import RegisterForm from "../../../componenets/registerForm/registerForm";
import styles from "./register.module.css"
import { getSession } from "../../../lib/actioniron";

export default async function page() {
  const session = await getSession();

  if (session.isLoggedIn) {
    redirect("/");
  }
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <RegisterForm />
      </div>
    </div>
  );
}
