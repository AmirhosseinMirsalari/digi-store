import axios from "axios";
import Navbar from "components/Navbar";
import { ResponseToArray } from "lib/ResponseToArray";
import Head from "next/head";

export default function Home({
  product,
  mainCategory,
  category,
  mainCategories,
  AmazingOfferSliderColor,
  brands,
  categories,
}) {
  return (
    <>
      <Head>
        <title>فروشگاه اینترنتی دیجی‌کالا</title>
        <meta
          name="description"
          content="هر آنچه که نیاز دارید با بهترین قیمت از دیجی‌کالا بخرید! جدیدترین انواع گوشی موبایل، لپ تاپ، لباس، لوازم آرایشی و بهداشتی، کتاب، لوازم خانگی، خودرو و... با امکان تعویض و مرجوعی آسان | ✓ارسال رايگان ✓پرداخت در محل ✓ضمانت بازگشت کالا - برای خرید کلیک کنید!
"
        />
      </Head>
      <Navbar mainCategory={mainCategories} category={categories} />
    </>
  );
}

export async function getServerSideProps({ params }) {
  const query = params.main;

  let mainCategoryResponse = await axios.get(
    "/main-categories?populate[0]=sliders&populate[1]=banners"
  );
  const mainCategories = ResponseToArray(mainCategoryResponse);

  const mainCategory = mainCategories.filter(
    (mainCategory) => mainCategory.slug == query
  )[0];

  let categoryResponse = await axios.get(
    "/categories?populate[0]=sub_categories"
  );
  const categories = ResponseToArray(categoryResponse);

  const category = categories
    .filter((category) => category.mainCategory == mainCategory.name)
    .filter((category) => category.thumbnail != "");

  const AmazingOfferSliderColor =
    mainCategory && mainCategory.AmazingOfferSliderColor;

  let productResponse = await axios.get(
    `http://localhost:1337/api/products?populate[0]=seller_views&populate[1]=product_videos&populate[2]=product_images&populate[3]=products_values`
  );
  const product = ResponseToArray(productResponse).filter(
    (product) => mainCategory && product.mainCategory == mainCategory.name
  );

  let brandsResponse = await axios.get("http://localhost:1337/api/brands");
  const brands = ResponseToArray(brandsResponse);

  if (!mainCategory) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  return {
    props: {
      product,
      mainCategory,
      category,
      mainCategories,
      AmazingOfferSliderColor,
      brands,
      categories,
    },
  };
}
