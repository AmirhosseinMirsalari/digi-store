import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { ResponseToArray } from "lib/ResponseToArray";

export default function HomePage({ productss, brand, query, filterProduct, category, mainCategories,}) {


  return (
    <div className="flex flex-col w-full h-auto ">
      <Navbar mainCategory={mainCategories} category={category} />
    </div>
  );
}

export async function getServerSideProps(contex) {
  let { query } = contex;

  let productResponse = await axios.get(
    `http://localhost:1337/api/products?populate[0]=seller_views&populate[1]=product_videos&populate[2]=product_images&populate[3]=products_values`
  );
  const data = ResponseToArray(productResponse)
  let productss = data.map((a) => a);

  let categoryResponse = await axios.get(
    "http://localhost:1337/api/categories?populate[0]=sub_categories"
  );
  const category = ResponseToArray(categoryResponse)

  let brandsResponse = await axios.get("http://localhost:1337/api/brands");
  const brand = ResponseToArray(brandsResponse)

  let filterProductResponse = await axios.get(
    "http://localhost:1337/api/filter-products?populate[0]=product_values"
  );
  const filterProduct = ResponseToArray(filterProductResponse)

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
      data,
    },
  };
}
