import Image from "next/image";
import Link from 'next/link'
import styles from "./page.module.css";
import { getSession } from "../lib/actioniron";

export default async function Home() {
  const session = await getSession();

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Welcome to the Tickit</h1>
        <p className={styles.desc}>To do lists works!<br /> Just tick it, cross it, be done with it.</p>
        <Link href={session.isLoggedIn ? "/dashboard" : "/login"} className={styles.button}>Let's Go!</Link>
      </div>
      <div className={styles.imgContainer}>
        <Image src="/hero.jpg" alt="" fill className={styles.heroImg} />
      </div>
    </div>
  );
}
