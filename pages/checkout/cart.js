import Navbar from "components/Navbar";
import { ResponseToArray } from "lib/ResponseToArray";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import LibraryAddCheckOutlinedIcon from "@mui/icons-material/LibraryAddCheckOutlined";
import VerticalAlignBottomOutlinedIcon from "@mui/icons-material/VerticalAlignBottomOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { addProductToCart, removeProductFromCart } from "redux/AddToCart";
import axios from "axios";


const HomePage = ({ mainCategories, category }) => {
  const cartBasketItem = useSelector((item) => item.cart);
  const totalBasketCart = useSelector((item) => item.cart.total);
  const dispatch = useDispatch();

  const cartBasketLength = cartBasketItem?.cart?.map((item) => item).length;

  const addRedux = (product) => {
    dispatch(addProductToCart(product));
  };

  const removeRedux = (product) => {
    dispatch(removeProductFromCart(product));
  };

  return (
    <>
      <Head>
        <title>سبد خرید</title>
      </Head>
      <Navbar mainCategory={mainCategories} category={category} />

      <div className="flex !justify-center">
        <div className="flex justify-center max-w-screen-2xl w-full lg:mx-24 py-12 lg:gap-x-4">
        {cartBasketLength > 0 ? (
            <>
              {/* basket items */}
              <div className="flex flex-col flex-1 border rounded-lg">
                {/* total cart */}
                <div className="mr-8 mt-5 space-y-2">
                  <p className="font-bold">سبدخرید شما</p>
                  <p className="text-sm">{totalBasketCart} کالا</p>
                </div>

                {/* total item */}
                <div className=" px-12">
                  {cartBasketItem.cart &&
                    cartBasketItem.cart.map((product) => (
                      <>
                        <div className="grid  grid-cols-[118px_minmax(auto,_1fr)] border border-t-0 border-x-0 last:border-0 py-4">
                          {/* product image */}

                          <div className="relative block mb-2 lg:px-8 w-[118px] h-[118px] ">
                            <Image
                              src={product.thumbnail}
                              layout="fill"
                              objectFit="contain"
                              alt=""
                            />
                          </div>

                          {/* product name and information */}
                          <div className="flex flex-col w-auto  mr-5">
                            <div className="text-[#23254e] text-[12px] lg:text-base font-bold">
                              <Link href={`/product/${product.slug}`} passHref>
                                {product.name}
                              </Link>
                            </div>

                            <div className="flex items-center py-3  ">
                              <VerifiedUserOutlinedIcon className="w-4 h-4" />
                              <p className="mr-2 text-xs">
                                گارانتی اصالت و سلامت فیزیکی کالا
                              </p>
                            </div>

                            <div className="flex flex-col ">
                              <div className="flex">
                                <div className="flex flex-col justify-evenly gap-y-1 stroke-[#19bfd3] items-center">
                                  <LibraryAddCheckOutlinedIcon className="w-4 h-4" />
                                  <VerticalAlignBottomOutlinedIcon className="w-4 h-4" />
                                </div>
                                <div className="flex flex-col mr-3">
                                  <div className="flex justify-between items-center ">
                                    <h5 className=" text-[#424750] text-xs font-bold ml-auto">
                                      موجود در انبار دیجی استور
                                    </h5>
                                    <KeyboardArrowLeftOutlinedIcon className="" />
                                  </div>
                                  <div className="flex items-center gap-x-1 text-sm pt-2">
                                    <LocalShippingOutlinedIcon className="w-4 h-4 stroke-[#e6123d]" />
                                    <p className="text-slate-600 text-[12px] font-normal">
                                      ارسال دیجی استور
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* product add or remove item */}

                          <div className="flex justify-between items-center bg-white w-[102px] max-w-[102px] h-11 max-h-11 ml-2 shadow-[0_1px_5px_1px_rgb(0,0,0,0.2),0_1px_5px_-2px_rgb(0,0,0,0.2)] rounded-sm px-2">
                            <button
                              onClick={() => addRedux(product)}
                              disabled={
                                product.quantity == product.stock ? true : false
                              }
                              className={`${
                                product.quantity == product.stock
                                  ? "cursor-not-allowed"
                                  : "cursor-pointer"
                              }  select-none`}
                            >
                              <AddCircleOutlinedIcon className="fill-[#ef4056]" />
                            </button>
                            <div className="text-[#ef4056] flex flex-col items-center ">
                              <p>{product.quantity}</p>
                              <p className="text-sm">
                                {product.quantity == product.stock && "حداکثر"}
                              </p>
                            </div>
                            <button onClick={() => removeRedux(product)}>
                              {product.quantity == 1 ? (
                                <DeleteOutlinedIcon className="fill-[#ef4056]" />
                              ) : (
                                <RemoveOutlinedIcon className="fill-[#ef4056]" />
                              )}
                            </button>
                          </div>

                          <div className="flex items-center text-base text-[#23254e] font-bold mr-5">
                            {Number(product.price).toLocaleString()} تومان
                          </div>
                        </div>
                      </>
                    ))}
                </div>
              </div>

            </>
          ) : (
            <div className="flex flex-col justify-center items-center w-full h-auto border rounded-lg py-6">
              <Image
                src="https://www.digikala.com/statics/img/svg/empty-cart.svg"
                width={200}
                height={150}
              />
              <p
                className="text-[19px] font-semibold mt-6 mb-4
"
              >
                سبد خرید شما خالی است!
              </p>
            </div>
          )}
        </div>
      </div>
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
