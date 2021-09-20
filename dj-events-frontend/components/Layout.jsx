import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import ShowCase from "./ShowCase";
import styles from "../styles/Layout.module.css";

import { useRouter } from "next/router";

const Layout = ({ title, keywords, description, children }) => {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keyword" content={keywords} />
      </Head>
      <Header />
      {router.pathname === "/" && <ShowCase></ShowCase>}
      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
