import Navbar from "components/Navbar";
import { ResponseToArray } from "lib/ResponseToArray";
import Head from "next/head";

const HomePage = ({ mainCategories, category }) => {
  return (
    <>
      <Head>
        <title>سبد خرید</title>
      </Head>
      <Navbar mainCategory={mainCategories} category={category} />

    </>
  );
};

export default HomePage;

export async function getServerSideProps({ params }) {
  let mainCategoryResponse = await axios.get(
    "/main-categories?populate[0]=sliders&populate[1]=banners"
  );
  const mainCategories = ResponseToArray(mainCategoryResponse);
  
  let categoryResponse = await axios.get(
    "/categories?populate[0]=sub_categories"
  );
  const category = ResponseToArray(categoryResponse);

  return {
    props: {
      mainCategories,
      category,
    },
  };
}
