import Head from "next/head";
import { useState } from "react";
import AccountDashBoard from "../components/AccountDashBoard";
import Layout from "../components/Layout";
// import styles from "../styles/selectorganization.module.css";

export default function home() {

  return (
    <Layout>
      <Head>

        <title>Accounts Dashboard</title>
      </Head>
      <main className={{}}>
        <AccountDashBoard styles={{}} />
      </main>
    </Layout>
  );
}
