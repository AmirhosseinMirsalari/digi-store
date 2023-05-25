import Head from "next/head";

const Home = () => {
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
      <div>دیحی استور</div>
    </>
  );
};

export default Home;

export async function getServerSideProps({ params }) {

  let mainCategoryResponse = await axios.get(
    "http://localhost:1337/api/main-categories?populate[0]=sliders&populate[1]=banners"
  );
  const mainCategory = mainCategoryResponse.data.data.map(
    (item) => item.attributes
  );

  let categoryResponse = await axios.get(
    "http://localhost:1337/api/categories?populate[0]=sub_categories"
  );
  const category = categoryResponse.data.data.map((item) => item.attributes);

  return {
    props: {
      mainCategory,
      category,
    },
  };
}
