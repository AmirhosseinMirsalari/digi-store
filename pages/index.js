import axios from "axios";
import Navbar from "components/Navbar";
import HomeSwiper from "components/HomeSwiper";
import { ResponseToArray } from "lib/ResponseToArray";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import AmazingOfferSlider from "components/AmazingOfferSlider";
import QuadrupleBanner from "components/QuadrupleBanner";

const Home = ({
  mainCategory,
  category,
  homePageDetail,
  DigistoreSubCategories,
  product,
}) => {
  const [click, setClick] = useState(false);

  const AmazingOfferSliderColor = homePageDetail?.map(
    (color) => color.AmazingOfferSliderColor
  );

  const offerProduct = product
    ?.filter((product) => product.offer > 0)
    ?.map((product) => product)
    .sort((a, b) => b.sellCount - a.sellCount);

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

      {/* Digi store subCategories */}
      <div className="grid grid-cols-4 grid-rows-2 sm:grid-cols-4 sm:grid-rows-2 lg:grid-cols-8 lg:grid-rows-1 mt-2 mb-1 mx-2 lg:mx-36 ">
        {DigistoreSubCategories?.slice(0, 7).map((subCategories) => {
          return (
            <figure
              key={subCategories.id}
              className="flex flex-col items-center cursor-pointer py-2 mx-3"
            >
              <Image
                src={subCategories.image}
                height={40}
                width={40}
                objectFit="cover"
              />
              <figcaption className="text-[11px] lg:text-xs text-[#424750] pt-2 font-bold text-center">
                {subCategories.name}
              </figcaption>
            </figure>
          );
        })}

        <figure
          onClick={() => setClick(true)}
          className="flex flex-col items-center cursor-pointer py-2 mx-3 rounded-full"
        >
          <div className="rounded-full w-10 h-10 border border-black overflow-hidden">
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmbw1OSYrI0szI-VFM283Wa3sxNHFBA41Jig&usqp=CAU"
              alt=""
              height={40}
              width={40}
              objectFit="cover"
            />
          </div>
          <figcaption className="text-[10px] md:text-xs pt-2">بیشتر</figcaption>
        </figure>
      </div>

      <main className=" h-auto w-full max-w-screen-xl px-6 lg:px-0 mt-4 mx-auto">
        {/* Amazing offer */}

        <AmazingOfferSlider
          key={AmazingOfferSliderColor.id}
          product={offerProduct}
          color={AmazingOfferSliderColor}
        />

        {/* <Digi Quadruple Banner /> */}

        {homePageDetail.map((homePage) => {
          return (
            <QuadrupleBanner
              QuardrupleBanners={homePage.banners.data.map((c) => c.attributes)}
            />
          );
        })}


      </main>
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

  let DigistoreSubCategoriesResponse = await axios.get(
    "http://localhost:1337/api/digikala-sub-categoriess"
  );
  const DigistoreSubCategories = ResponseToArray(
    DigistoreSubCategoriesResponse
  );

  let productResponse = await axios.get(
    `http://localhost:1337/api/products?populate[0]=seller_views&populate[1]=product_videos&populate[2]=product_images&populate[3]=products_values`
  );
  const product = ResponseToArray(productResponse);

  return {
    props: {
      mainCategory,
      category,
      homePageDetail,
      DigistoreSubCategories,
      product,
    },
  };
}
