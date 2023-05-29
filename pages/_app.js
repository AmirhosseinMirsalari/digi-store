import axios from "axios";
import "@/styles/globals.css";
import { store } from "redux/store";
import Head from "next/head";
import Footer from "components/Footer";
import Router from 'next/router';
import { useEffect } from "react";
import NProgress from 'nprogress'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



axios.defaults.baseURL = "http://localhost:1337/api";
axios.defaults.headers.post['Content-Type'] = 'application/json';


Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps, router }) {


  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [router]);

  return (
    <div className="relative">
      <Head>
        <title></title>
        <meta name="theme-color" content="#673AB6" />
        <link rel="shortcut icon" href="images/fav.png" />
      </Head>

      <Component {...pageProps} key={router.asPath} />
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default store.withRedux(MyApp);
