import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from 'react';
import styles from "../styles/Home.module.css";

export default function Home() {
  const [s,d]=useState('')
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Head>
        <title>BDEMR Clinic App Demo</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">BDEMR!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <Link href={"/page-accounts"}>
            <a href="https://nextjs.org/docs" className={styles.card}>
              <h2>Accounts &rarr;</h2>
            </a>
          </Link>
          <Link href={"/page-sell-invoice"}>
            <a href="https://nextjs.org/docs" className={styles.card}>
              <h2>Sell &rarr;</h2>
            </a>
          </Link>
          <Link href={"/check"}>
            <a href="https://nextjs.org/docs" className={styles.card}>
              <h2>Expense &rarr;</h2>
            </a>
          </Link>
          <Link href={"/check"}>
            <a href="https://nextjs.org/docs" className={styles.card}>
              <h2>Account Dashboard &rarr;</h2>
            </a>
          </Link>
          <Link href={"/catagory"}>
            <a href="https://nextjs.org/docs" className={styles.card}>
              <h2>Category &rarr;</h2>
            </a>
          </Link>
        </div>
        
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
