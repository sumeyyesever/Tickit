import Link from 'next/link';
import styles from "./navbar.module.css";
import { getSession } from '../../lib/actioniron';
import LogoutForm from '../logoutForm/logoutForm';

export default async function Navbar() {
  const session = await getSession();
  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>Tickit</Link>
      {session.isLoggedIn ?
        <div className={styles.user}>
          <Link href="/dashboard"><p>⭐{session.username}⭐</p></Link>
          <LogoutForm />
        </div>
        :
        <Link href="/login" className={styles.button}>Get Started</Link>}
    </div>
  );
}

