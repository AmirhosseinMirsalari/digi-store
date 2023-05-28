import axios from "axios";
import { ResponseToArray } from "lib/ResponseToArray";
import React, { useState } from "react";
import { store } from "../../redux/store";
import Head from "next/head";
import Navbar from "components/Navbar";
import Link from "next/link";

// icons
import FavoriteIcon from "@mui/icons-material/Favorite";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import TimelineIcon from "@mui/icons-material/Timeline";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";

// component
import SingleProductImageMagnify from "../../components/SingleProduct/ImageMagnify";
import SingleProductThumbnailModalImage from "../../components/SingleProduct/ThumbnailAndModalImage";
import SingleProductSlider from "../../components/SingleProduct/MobileThumbnailSlider";

const HomePage = ({
  product,
  relatedProducts,
  comments,
  mainCategory,
  category,
  questions,
}) => {

  const [tabHeart, setTabHeart] = useState(false);
  const [hoverHeart, setHoverHeart] = useState(false);
  const [hoverChart, setHoverChart] = useState(false);
  const [modalMobileSwiper, setModalMobileSwiper] = useState(false);
  const [productChart, setProductChart] = useState(false);

  return (
    <>
      <Head>
        <title>{product.name} | دیجی استور</title>
      </Head>
      <Navbar mainCategory={mainCategory} category={category} />
      {/* breadcamp */}
      <div className="py-8 px-4 h-auto w-full items-center hidden lg:flex text-xs text-[#81858b] gap-x-4">
        <Link href="/">
          <a>دیجی استور</a>
        </Link>
        <div>/</div>
        <Link href={`/main/${product.mainCategorySlug}`}>
          <a>{product.mainCategory.replace("-", " ")}</a>
        </Link>
        <div>/</div>
        <Link href={`/search/${product.categorySlug}`}>
          <a>{product.category.replace("-", " ")}</a>
        </Link>
        <div>/</div>
        <Link href={`/search/${product.subCategorySlug}`}>
          <a>{product.subCategory.replace("-", " ")}</a>
        </Link>
      </div>
      {/* product Header*/}
      <div className="lg:mx-4 lg:grid lg:grid-cols-3 ">
        {/* product image */}
        <div className="col-span-1 w-full h-auto bg-white">
          {/* mobile swiper */}
          <div className="w-full h-auto !flex flex-col">
            <div className=" w-full h-auto flex justify-end pt-8 lg:pt-0 ">
              {/* thumbnail icons */}

              <div className="flex-row-reverse gap-y-3 h-auto flex lg:flex-col items-center  w-auto ">
                <div
                  onClick={() => setTabHeart(!tabHeart)}
                  className="px-3 cursor-pointer "
                >
                  <FavoriteIcon
                    onMouseEnter={() => setHoverHeart(true)}
                    onMouseLeave={() => setHoverHeart(false)}
                    className={`${
                      tabHeart
                        ? "fill-red-500  "
                        : "fill-white stroke-black stroke-2"
                    }`}
                  />
                  <div
                    className={`translate-y-[178px] -translate-x-2 hidden max-w-80 w-fit absolute  bg-[#424750] border border-[#232933] px-2 py-3 top-0 right-12 text-xs rounded z-[999] text-white ${
                      hoverHeart ? "lg:block" : "lg:hidden"
                    }`}
                  >
                    اضافه به علاقه مندی
                  </div>
                </div>

                <div className="px-3 cursor-pointer">
                  <TimelineIcon
                    onClick={() => setProductChart(true)}
                    onMouseEnter={() => setHoverChart(true)}
                    onMouseLeave={() => setHoverChart(false)}
                  />
                  <div
                    className={`translate-y-[106px] -translate-x-2 hidden  max-w-80 w-fit break-word absolute bg-[#424750] border border-[#232933] px-2 py-3 top-28 z-[999] right-12 text-xs rounded text-white ${
                      hoverChart ? "lg:block" : "lg:hidden"
                    }`}
                  >
                    نمودار قیمت
                  </div>
                </div>
              </div>

              {/* magnify */}

              <SingleProductImageMagnify product={product} />
            </div>

            <SingleProductThumbnailModalImage product={product} />
            <SingleProductSlider
              modalMobileSwiper={modalMobileSwiper}
              setModalMobileSwiper={setModalMobileSwiper}
              product={product}
            />
          </div>
        </div>
      </div>
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
