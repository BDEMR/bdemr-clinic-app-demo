import Head from "next/head";
import Layout from "../components/Layout";
import SellInvoice from "../components/SellInvoice";
// import styles from "../styles/selectorganization.module.css";

export default function home() {
  return (
    <Layout>
      <Head>
        <title>Sell Invoice</title>
      </Head>
      <main className={{}}>
        <SellInvoice styles={{}} />
      </main>
    </Layout>
  );
}
