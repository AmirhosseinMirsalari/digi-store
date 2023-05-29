import axios from "axios";
import { ResponseToArray } from "lib/ResponseToArray";
import React, { useState, useRef, useEffect } from "react";
import { store } from "../../redux/store";
import Head from "next/head";
import Navbar from "components/Navbar";
import Link from "next/link";
import Image from "next/image";
import fav from "../../public/images/fav.png";

// icons

import FavoriteIcon from "@mui/icons-material/Favorite";
import TimelineIcon from "@mui/icons-material/Timeline";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import LibraryAddCheckOutlinedIcon from "@mui/icons-material/LibraryAddCheckOutlined";
import VerticalAlignBottomOutlinedIcon from "@mui/icons-material/VerticalAlignBottomOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import NoiseControlOffIcon from "@mui/icons-material/NoiseControlOff";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";

// component
import SingleProductImageMagnify from "../../components/SingleProduct/ImageMagnify";
import SingleProductThumbnailModalImage from "../../components/SingleProduct/ThumbnailAndModalImage";
import SingleProductSlider from "../../components/SingleProduct/MobileThumbnailSlider";
import YellowStar from "../../components/SingleProduct/YellowStar";
import WhiteStar from "../../components/SingleProduct/WhiteStar";

//redux
import { addProductToCart, removeProductFromCart } from "redux/AddToCart";
import { useDispatch,useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';


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
  const [propertyDisplayCount, setPropertyDisplayCount] = useState(5);
  const [quantityReduxProduct, setQuantityReduxProduct] = useState(0);

  const firstCommentsCount = useRef();
  const secondCommentsCount = useRef();
  const questionsCount = useRef();

  const comment = comments.map((comment) => comment);

  let rateReduce =
    comment.length > 0
      ? comment
          .map((comment) => Number(comment.rate))
          .reduce(function (previous, current) {
            return previous + current;
          })
      : "0";
  const rateCustomers = Math.ceil(rateReduce / comment.length);
  const rateCustomersTop = (rateReduce / comment.length).toFixed(1);

  const specificationsValue = product.products_values.data
    .map((c) => c.attributes)
    .filter((isSpecifications) => isSpecifications.isSpecifications == true);
  const propertyLength = specificationsValue.length;


    // redux
    const dispatch = useDispatch()
    const { cart } = useSelector(data => data.cart)

    const addRedux = () => {
      toast.success('محصول به سبد خرید اضافه شد', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      let countCart = cart?.map(a => a).filter(item => item.slug == product.slug).map(a => a).map(a => a.quantity)
      countCart = countCart[0]
      dispatch(addProductToCart(product))
      setQuantityReduxProduct((prev) => (Number(countCart) || 0) + 1)
    }
  
  
    const removeRedux = (product) => {
      toast.error('محصول از سبد خرید کم شد', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      let countCart = cart?.map(a => a).filter(item => item.slug == product.slug).map(a => a).map(a => a.quantity)
      countCart = countCart[0]
      dispatch(removeProductFromCart(product))
    }
  
    useEffect(() => {
      let countCart = cart?.map(a => a).filter(item => item.slug == product.slug).map(a => a).map(a => a.quantity)
      countCart = countCart[0]
      setQuantityReduxProduct(countCart)
    })

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
        {/* part tow */}
        <div className="col-span-2 lg:grid  grid-rows-[45px_minmax(auto,_1fr)]">
          <div className="row-span-1  mb-1 text-black font-bold text-[19px] break-word grid-rows-1 mr-8 ml-4">
            {product.name}
          </div>
          {/* part tow */}
          <div className="flex flex-col lg:grid lg:grid-rows-1  lg:grid-cols-11">
            {/* product short description */}
            <div className=" lg:col-span-6 xl:col-span-7 ml-4 mr-8 h-auto flex flex-col ">
              {/* product latin name */}
              <div className="flex w-full items-center">
                <span className="text-[#c0c2c5] text-xs ml-1">
                  {product.latinName}
                </span>
                <div className="h-[1px] bg-[#e0e0e2] grow"></div>
              </div>

              {/* product rate,count question */}

              <div className="flex items-center gap-x-1">
                <div
                  ref={firstCommentsCount}
                  className="flex gap-x-1 items-center cursor-pointer"
                >
                  <YellowStar />
                  <div className="text-xs">
                    {comment.length > 0 ? rateCustomersTop : 0}
                  </div>
                  <div className="text-[11px] font-normal text-[#c0c2c5]">
                    ({comment.length})
                  </div>
                </div>
                <NoiseControlOffIcon className="fill-[#e0e0e2] w-3 h-3" />
                <div
                  ref={secondCommentsCount}
                  className="text-[#19bfd3] text-xs cursor-pointer"
                >
                  {comment.length} دیدگاه
                </div>
                <NoiseControlOffIcon className="fill-[#e0e0e2] w-3 h-3" />
                <div
                  ref={questionsCount}
                  className="text-[#19bfd3] text-xs cursor-pointer"
                >
                  {questions.length} پرسش
                </div>
              </div>

              {/* product information */}

              <div className="hidden lg:flex flex-col order-last">
                <div className="flex flex-col mt-20 py-3 text-black break-word">
                  <h5 className="text-base font-bold">ویژگی ها</h5>
                </div>

                <div className="flex flex-col  border border-t-0 border-r-0 border-l-0 border-[#e0e0e2] items-start gap-y-3 pb-6">
                  {product.products_values.data
                    .map((c) => c.attributes)
                    .slice(0, propertyDisplayCount)
                    .map((item, index) => {
                      return (
                        <div key={index} className="flex items-center gap-x-1">
                          <NoiseControlOffIcon className="fill-[#e0e0e2] w-4 h-4" />
                          <p className="text-[#81858b] text-sm">
                            {item.filter} :
                          </p>
                          <p className="text-[#424750] text-sm font-bold">
                            {item.value}
                          </p>
                        </div>
                      );
                    })}
                  {propertyLength > 5 && (
                    <button
                      onClick={showMorePropertyHandler}
                      className={`text-[#19bfd3] text-xs cursor-pointer ${
                        showMoreProperty ? "hidden" : "block"
                      }`}
                    >
                      <span>نمایش بیشتر</span>
                      <KeyboardArrowLeftOutlinedIcon className="" />
                    </button>
                  )}
                </div>

                <div className="flex items-center py-3 mb-3">
                  <ErrorOutlineOutlinedIcon className="stroke-[#81858b] mr-1 w-4 h-4" />
                  <span className="break-word text-xs leading-6 mr-3 text-[#424750]">
                    درخواست مرجوع کردن کالا در گروه لپ تاپ و الترابوک با دلیل
                    "انصراف از خرید" تنها در صورتی قابل تایید است که کالا در
                    شرایط اولیه باشد (در صورت پلمپ بودن، کالا نباید باز شده
                    باشد).
                  </span>
                </div>

                <div className="flex justify-between items-center  border border-[#e0e0e2] rounded-lg mb-4">
                  <div className="flex-col mr-4">
                    <h5 className="text-[15px] text-[#232933] font-bold">
                      ارسال رایگان
                    </h5>
                    <span className="text-xs text-[#81858b]">
                      برای سفارش بالای 500 هزار تومان
                    </span>
                  </div>
                  <Image
                    src="https://www.digikala.com/_next/static/media/normalFreeShippingTouchPointImage.d4416515.svg"
                    width={140}
                    height="70%"
                    objectFit="cover"
                  />
                </div>
              </div>
            </div>

            {/* product price information */}

            <div className=" lg:px-0 select-none lg:mt-0 h-fit lg:col-span-5 xl:col-span-4  productPriceBg lg:border border-t-[#f0f0f1]  my-4 lg:my-0 border-t-8 lg:border-t-8 border-[#e0e0e2] rounded-lg lg:py-5 py-3">
              <div className="px-5 flex flex-col pt-5 border border-t-0 border-l-0 border-r-0 border-[#e0e0e2]  pb-2">
                <h3 className="font-semibold pb-6">فروشنده</h3>
                <div className="flex items-start">
                  <Image src={fav} width={24} height={24} objectFit="contain" />
                  <div className="flex flex-col mr-3">
                    <p className="font-[15px] text-[#424750] font-normal">
                      دیجی استور
                    </p>
                    <div className="flex gap-x-1 text-sm pt-2">
                      <p className="text-[#81858b] text-[12px] font-normal">
                        عملکرد
                      </p>
                      <p className="text-[#00a049] text-[12px] font-bold">
                        عالی
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-5 flex items-center py-3 border border-t-0 border-l-0 border-r-0 border-[#e0e0e2] ">
                <VerifiedUserOutlinedIcon />
                <p className="mr-3 text-xs">گارانتی 24 ماهه مادیران</p>
              </div>

              <div className="px-5 flex flex-col  border border-t-0 border-l-0 border-r-0 border-[#e0e0e2]  py-3">
                <div className="flex">
                  <div className="flex flex-col justify-evenly gap-y-1 stroke-[#19bfd3] items-center">
                    <LibraryAddCheckOutlinedIcon className="w-5 h-5" />
                    {/* <VerticalAlignBottomOutlinedIcon className="w-4 h-4" /> */}
                  </div>
                  <div className="flex flex-col mr-3">
                    <div className="flex justify-between items-center ">
                      <h5 className=" text-[#424750] text-[15px] font-bold ml-auto">
                        موجود در انبار دیجی استور
                      </h5>
                      <KeyboardArrowLeftOutlinedIcon className="" />
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`productPriceBg w-full lg:px-5 px-2 sm:px-12 h-auto bottom-0 fixed lg:relative justify-between items-center bg-white py-2 z-[99] lg:z-0 border-2 lg:border-0 border-l-0 border-r-0 border-b-0  border-gray-200 lg:flex-col-reverse lg:flex lg:items-end lg:w-full lg:gap-y-3 lg:py-3 ${
                  modalMobileSwiper ? "hidden" : "flex"
                }`}
              >
                {quantityReduxProduct > 0 ? (
                  <div className="flex items-center w-full">
                    {/* count */}
                    <div className="flex justify-between items-center bg-white w-[102px] max-w-[102px] h-11 max-h-11 ml-2 shadow-[0_1px_5px_1px_rgb(0,0,0,0.2),0_1px_5px_-2px_rgb(0,0,0,0.2)] rounded-sm px-2">
                      <button
                        onClick={() => addRedux(product)}
                        disabled={
                          quantityReduxProduct == product.stock ? true : false
                        }
                        className={`${
                          quantityReduxProduct == product.stock
                            ? "cursor-not-allowed"
                            : "cursor-pointer"
                        }`}
                      >
                        <AddCircleOutlinedIcon className="fill-[#ef4056]" />
                      </button>
                      <div className="text-[#ef4056] flex flex-col items-center ">
                        <p>{quantityReduxProduct}</p>
                        <p className="text-sm">
                          {quantityReduxProduct == product.stock && "حداکثر"}
                        </p>
                      </div>
                      <button onClick={() => removeRedux(product)}>
                        {quantityReduxProduct == 1 ? (
                          <DeleteOutlinedIcon className="fill-[#ef4056]" />
                        ) : (
                          <RemoveOutlinedIcon className="fill-[#ef4056]" />
                        )}
                      </button>
                    </div>

                    <div className="hidden lg:flex flex-col justify-start text-sm">
                      <p>در سبد شما</p>
                      <Link href="/checkout/cart" passHref>
                        <p className="cursor-pointer text-blue-400">
                          مشاهده سبد خرید
                        </p>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => addRedux(product)}
                    className="bg-[#ef394e] text-xs text-center text-white px-6 py-2 sm:px-16 sm:py-3 md:px-32 md:py-3 rounded-lg font-bold h-fit lg:w-full lg:px-0"
                  >
                    افزودن به سبد خرید {quantityReduxProduct}
                  </button>
                )}
                {product.offer > 0 ? (
                  <div className="flex w-full lg:w-auto flex-col gap-y-1 items-end">
                    <div className="flex items-center">
                      <del className="text-xs text-gray-400">
                        {Number(product.price).toLocaleString()}
                      </del>
                      <span className="bg-[#ef394e] text-xs text-white rounded-xl mr-2 py-1 px-2">
                        {product.offer}%
                      </span>
                    </div>
                    <div>
                      <span className="text-base">
                        {(
                          Number(product.price) -
                          Number(product.price) * (Number(product.offer) / 100)
                        ).toLocaleString()}{" "}
                        تومان
                      </span>
                    </div>
                  </div>
                ) : (
                  <span className="text-[18px] text-black">
                    {Number(product.price).toLocaleString()} تومان
                  </span>
                )}
              </div>
            </div>
            <div className="flex lg:hidden flex-col px-4 border-4 border-b-0 border-l-0 border-r-0 border-[#e0e0e2] ">
              <div className="flex flex-col mt-2 py-3 text-black break-word">
                <h5 className="text-base font-bold">ویژگی ها</h5>
              </div>

              <ul className="flex flex-col border border-t-0 border-r-0 border-l-0 border-[#e0e0e2] pb-6 items-start gap-y-3">
                {product.products_values.data
                  .map((c) => c.attributes)
                  .slice(0, propertyDisplayCount)
                  .map((item, index) => {
                    return (
                      <div key={index} className="flex items-center gap-x-1">
                        <NoiseControlOffIcon className="fill-[#e0e0e2] w-4 h-4" />
                        <p className="text-[#81858b] text-sm">
                          {item.filter} :
                        </p>
                        <p className="text-[#424750] text-sm font-bold">
                          {item.value}
                        </p>
                      </div>
                    );
                  })}
                {propertyLength > 5 && (
                  <button
                    onClick={showMorePropertyHandler}
                    className={`text-[#19bfd3] text-xs cursor-pointer ${
                      showMoreProperty ? "hidden" : "block"
                    }`}
                  >
                    <span>نمایش بیشتر</span>
                    <KeyboardArrowLeftOutlinedIcon className="" />
                  </button>
                )}
              </ul>

              <div className="flex items-center py-3 mb-6 px-2 lg:px-0">
                <ErrorOutlineOutlinedIcon className="stroke-[#81858b] mr-1 w-4 h-4" />
                <span className="break-word text-xs leading-6 mr-3 text-[#424750]">
                  درخواست مرجوع کردن کالا در گروه لپ تاپ و الترابوک با دلیل
                  "انصراف از خرید" تنها در صورتی قابل تایید است که کالا در شرایط
                  اولیه باشد (در صورت پلمپ بودن، کالا نباید باز شده باشد).
                </span>
              </div>
            </div>

            <div className="bg-[#f0f0f1] lg:hidden px-4 py-4">
              <div className="bg-white flex justify-between items-center  border border-[#e0e0e2] rounded-lg mb-3 ml-4 lg:ml-0">
                <div className="flex-col mr-4">
                  <h5 className="text-[15px] text-[#232933] font-bold">
                    ارسال رایگان
                  </h5>
                  <span className="text-xs text-[#81858b]">
                    برای سفارش بالای 500 هزار تومان
                  </span>
                </div>
                <Image
                  src="https://www.digikala.com/_next/static/media/normalFreeShippingTouchPointImage.d4416515.svg"
                  width={140}
                  height="70%"
                  // layout="responsive"
                  objectFit="cover"
                />
              </div>
            </div>
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
