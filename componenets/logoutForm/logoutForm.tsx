import { logout } from "../../lib/actioniron"
import styles from "./logoutForm.module.css"

const LogoutForm = () => {
  return (
    <form action={logout}>
      <button className={styles.logoutButton}>Logout</button>
    </form>
  )
}

export default LogoutForm
