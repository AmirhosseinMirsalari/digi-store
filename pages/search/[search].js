import React from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { ResponseToArray } from "lib/ResponseToArray";
import Head from "next/head";
import { useRouter } from "next/router";

export default function HomePage({
  productss,
  brand,
  query,
  filterProduct,
  category,
  mainCategories,
}) {
  const router = useRouter()

  return (
    <div className="flex flex-col w-full h-auto ">
      <Head>
        <title>
          {`محصولات دسته بندی ${router.query.search}`}
        </title>
      </Head>
      <Navbar mainCategory={mainCategories} category={category} />
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const query = params.search;

  let productResponse = await axios.get(
    `/products?populate[0]=seller_views&populate[1]=product_videos&populate[2]=product_images&populate[3]=products_values`
  );
  const data = ResponseToArray(productResponse);

  let productss = data
  .map((a) => a)
  .filter((product) =>
    product.subCategorySlug == query ? product.subCategorySlug == query : product.categorySlug == query? product.categorySlug == query: null
  );

  let categoryResponse = await axios.get(
    "/categories?populate[0]=sub_categories"
  );
  const category = ResponseToArray(categoryResponse);

  let brandsResponse = await axios.get("/brands");
  const brand = ResponseToArray(brandsResponse);

  let filterProductResponse = await axios.get(
    "/filter-products?populate[0]=product_values"
  );
  const filterProduct = ResponseToArray(filterProductResponse);

  let mainCategoryResponse = await axios.get(
    "/main-categories?populate[0]=sliders&populate[1]=banners"
  );
  const mainCategories = ResponseToArray(mainCategoryResponse);

  if (!productss) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      productss,
      category,
      brand,
      query,
      filterProduct,
      mainCategories,
    },
  };
}
