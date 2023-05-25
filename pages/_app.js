import axios from "axios";
import "@/styles/globals.css";
import { store } from "redux/store";
import Head from "next/head";

axios.defaults.baseURL = "http://localhost:1337/api";

function MyApp({ Component, pageProps, router }) {
  <div className="relative">
    <Head>
      <title></title>
      <meta name="theme-color" content="#673AB6" />
      <link rel="shortcut icon" href="images/logo.png" />
    </Head>

    <Component {...pageProps} key={router.asPath} />
  </div>;
}

export default store.withRedux(MyApp);
