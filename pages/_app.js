import axios from "axios";
import "@/styles/globals.css";

function MyApp({ Component, pageProps }) {
  axios.defaults.baseURL = "http://localhost:1337/api";

  return <Component {...pageProps} />;
}

export default MyApp;
