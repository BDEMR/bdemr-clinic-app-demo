import Head from "next/head";
import ExpenseInvoice from "../components/ExpenseInvoice";
import Layout from "../components/Layout";
// import styles from "../styles/selectorganization.module.css";

export default function home() {
  return (
    <Layout>
      <Head>
        <title>Sell Invoice</title>
      </Head>
      <main className={{}}>
        <ExpenseInvoice styles={{}} />
      </main>
    </Layout>
  );
}
