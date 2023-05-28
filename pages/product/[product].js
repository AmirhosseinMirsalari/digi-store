import axios from "axios";
import { ResponseToArray } from "lib/ResponseToArray";
import React from "react";
import { store } from "../../redux/store";
import Head from "next/head";
import Navbar from "components/Navbar";

const HomePage = ({
  product,
  relatedProducts,
  comments,
  mainCategory,
  category,
  questions,
}) => {
  return (
    <>
      <Head>
        <title>{product.name} | دیجی استور</title>
      </Head>
      <Navbar mainCategory={mainCategory} category={category} />
    </>
  );
};

export const getServerSideProps = store.getServerSideProps(
  (store) =>
    async ({ params }) => {
      const query = params.product;

      const customerComment = await axios.get(
        `/customers-comments?populate[0]=positive_comments&populate[1]=negative_comments`
      );
      let comments = ResponseToArray(customerComment);
      comments = comments.filter((comment) => comment.slug == query);

      const customerQuestionResponse = await axios.get(`/customers-questions`);
      let questions = ResponseToArray(customerQuestionResponse);
      questions = questions.filter((questions) => questions.slug == query);

      let mainCategoryResponse = await axios.get(
        "/main-categories?populate[0]=sliders&populate[1]=banners"
      );
      const mainCategory = ResponseToArray(mainCategoryResponse);

      let categoryResponse = await axios.get(
        "/categories?populate[0]=sub_categories"
      );
      const category = ResponseToArray(categoryResponse);

      let productResponse = await axios.get(
        `/products?populate[0]=seller_views&populate[1]=product_videos&populate[2]=product_images&populate[3]=products_values`
      );
      const data = ResponseToArray(productResponse);

      let product = data.filter((product) => product.slug == query)[0];

      const relatedProducts = data.filter((products) =>
        product && products.subCategory == product.subCategory
          ? products.slug != product.slug
          : null
      );

      if (!product) {
        return {
          notFound: true,
        };
      }
      return {
        props: {
          product,
          relatedProducts,
          comments,
          mainCategory,
          category,
          questions,
        },
      };
    }
);

export default HomePage;
