import axios from "axios";
import Navbar from "components/Navbar";
import HomeSwiper from "components/HomeSwiper"
import { ResponseToArray } from "lib/ResponseToArray";
import Head from "next/head";

const Home = ({ mainCategory, category, homePageDetail }) => {
  return (
    <>
      <Head>
        <title>فروشگاه اینترنتی دیجی استور</title>
        <meta
          name="description"
          content="هر آنچه که نیاز دارید با بهترین قیمت از دیجی استور بخرید! جدیدترین انواع گوشی موبایل، لپ تاپ، لباس، لوازم آرایشی و بهداشتی، کتاب، لوازم خانگی، خودرو و... با امکان تعویض و مرجوعی آسان | ✓ارسال رايگان ✓پرداخت در محل ✓ضمانت بازگشت کالا - برای خرید کلیک کنید!
"
        />
      </Head>
      <Navbar mainCategory={mainCategory} category={category} />

      {/* carousel */}

      {homePageDetail.map((homePage) => {
        return (
          <HomeSwiper
            carousel={homePage.carousels.data.map((c) => c.attributes)}
          />
        );
      })}
    </>
  );
};

export default Home;

export async function getServerSideProps({ params }) {
  let mainCategoryResponse = await axios.get(
    "/main-categories?populate[0]=sliders&populate[1]=banners"
  );
  const mainCategory = ResponseToArray(mainCategoryResponse);

  let categoryResponse = await axios.get(
    "/categories?populate[0]=sub_categories"
  );
  const category = ResponseToArray(categoryResponse);

  let homePageDetailResponse = await axios.get(
    "/home-page-details?populate[0]=carousels&populate[1]=banners&populate[2]=baners"
  );
  const homePageDetail = ResponseToArray(homePageDetailResponse);

  return {
    props: {
      mainCategory,
      category,
      homePageDetail,
    },
  };
}
