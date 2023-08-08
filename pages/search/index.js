import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { ResponseToArray } from "lib/ResponseToArray";
import Head from "next/head";
import FilterListIcon from "@mui/icons-material/FilterList";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from "next/router";
import { LayoutGroup } from "framer-motion";
import Pagination from "components/Pagination";
import Product from "components/SearchedProducts";

export default function HomePage({
  productss,
  brand,
  query,
  filterProduct,
  category,
  mainCategories,
  data,
}) {
  const [products, setProducts] = useState(productss);
  const [filteredProducts, setFilteredProducts] = useState(productss || null);
  const [filterProducts, setFilterProducts] = useState(null);
  const [brands, setBrands] = useState(brand);
  const [newBrands, setNewBrands] = useState(brands || null);
  const [checked, setChecked] = useState([]);
  const [checkedValue, setCheckedValue] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOffer, setIsOffer] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [sortText, setSortText] = useState("پربازدیدترین");
  const [openBrand, setOpenBrand] = useState(false);
  const [openValue, setOpenValue] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");
  const [openModalFilter, setOpenModalFilter] = useState(false);

  const openModalFilterHandler = () => {
    setOpenModalFilter(true);
  };

  const closeModalFilterHandler = () => {
    setOpenModalFilter(false);
  };

  const filtersData = filterProducts && filterProducts.map((filter) => filter);

  const filters = filtersData?.reduce((acc, current) => {
    const x = acc.find((item) => item.filterProduct === current.filterProduct);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  useEffect(() => {
    setFilterProducts(
      filterProduct.filter((filter) => filter.showFilter == true)
    );
  }, []);

  const searchHandler = (e) => {
    setSearchFilter([e.target.value]);
  };
  useEffect(() => {}, [searchFilter, filterProducts]);

  const openValueHandler = (e) => {
    if (openValue == e) {
      return setOpenValue(null);
    }
    setOpenValue(e);
    setSearchFilter("");
  };

  const openBrandHandler = () => {
    setOpenBrand(!openBrand);
  };

  const isAvailableHandler = () => {
    setIsAvailable(!isAvailable);
  };

  const offerHandler = () => {
    setIsOffer(!isOffer);
  };

  const changeBrandHandler = (id) => {
    const currentIndex = checked.indexOf(id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const changeValueHandler = (id) => {
    const currentIndex = checkedValue.indexOf(id);
    const newChecked = [...checkedValue];

    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedValue(newChecked);
  };

  // useEffect(() => {
  //   let filteredArray = products.slice()
  //   filteredArray = filteredArray
  //     .filter(data => data.productsValues.some(elemet => elemet.value == ["ابریشم"])).map(data => data)
  // })

  const router = useRouter();
  useEffect(() => {
    router.prefetch("/search");
  });

  const [querySearch, setQuerySearch] = useState("");

  useEffect(() => {
    setQuerySearch(query.q);
  });
  useEffect(() => {
    let filteredArray = products.slice();
    if (checked.length != 0) {
      filteredArray = filteredArray
        .filter((data) => checked.includes(data.brand))
        .map((filteredName) => {
          return filteredName;
        });
      setFilteredProducts(filteredArray);
    }
    if (checkedValue.length != 0) {
      filteredArray = filteredArray
        .filter((data) =>
          data.products_values.data
            .map((item) => item.attributes)
            .some((elemet) => checkedValue.includes(elemet.value))
        )
        .map((filteredName) => {
          return filteredName;
        });
      setFilteredProducts(filteredArray);
    }
    if (querySearch) {
      filteredArray = filteredArray.filter((product) =>
        product.name.includes(querySearch)
      );
      setFilteredProducts(filteredArray);
    }
    if (isAvailable) {
      filteredArray = filteredArray.filter((data) => data.stock > 0);
      setFilteredProducts(filteredArray);
    }
    if (isOffer) {
      filteredArray = filteredArray.filter((data) => data.offer > 0);
      setFilteredProducts(filteredArray);
    }

    setFilteredProducts(filteredArray);
    setCurrentPage(1);
  }, [checked, isOffer, checkedValue, isAvailable, querySearch]);

  useEffect(() => {
    let filterBrands = products.map((product) => product.brand);
    const newFilter = (filterBrands = [...new Set(filterBrands)]);
    const data = brands
      .filter((data) => newFilter.includes(data.name))
      .map((filterBrand) => filterBrand);
    setNewBrands(data);
  }, []);

  return (
    <div className="flex flex-col w-full h-auto ">
      <Head>
        <title>همه محصولات دیجی استور</title>
      </Head>
      <Navbar mainCategory={mainCategories} category={category} />
      <div className="pt-4 w-full h-auto pb-8">
        {category
          .filter((cate) =>
            cate.sub_categories.data
              .map((c) => c.attributes)
              .some((sub) => sub.name == query)
          )
          .map((datas,index) => {
            return (
              <ul key={index} className="flex gap-x-3 mx-3 text-sm font-bold mb-5 mt-2">
                <li>دیجیکالا /</li>
                <li>{datas.mainCategory} /</li>
                <li>{datas.name} /</li>
                {datas.subCategory
                  .filter((sub) => sub.name == query)
                  .map((subs,index) => {
                    return <li key={index}>{subs.name}</li>;
                  })}
              </ul>
            );
          })}
        {/* section */}
        <div className="w-full flex flex-col lg:flex-row px-3">
          {/* filter */}
          <div className="w-[300px] border hidden flex-col lg:flex px-2 py-4">
            <div className="flex flex-col">
              {/* برند */}
              <div className="cursor-pointer">
                <div
                  onClick={openBrandHandler}
                  className={`flex justify-between items-center cursor-pointer py-3 font-bold text-[15px] text-[#424750] ${
                    openBrand ? "border-0" : "border border-x-0 border-t-0"
                  } `}
                >
                  <p>برند</p>
                  <KeyboardArrowDownIcon className="w-6 h-6" />
                </div>

                <div>
                  {newBrands.map((brand) => {
                    return (
                      <div
                        key={brand.id}
                        className={`w-full border border-x-0 border-t-0 flex items-center ${
                          openBrand
                            ? "max-h-auto visible"
                            : "h-0 max-h-0 invisible"
                        } `}
                      >
                        <input
                          className="w-[15px] h-[15px] ml-4 py-1 accent-[#008eb2] cursor-pointer"
                          onChange={() => changeBrandHandler(brand.name)}
                          type="checkbox"
                          name=""
                          id={brand.name}
                        />
                        <label
                          className="select-none text-[#424750] text-[15px]font-bold py-2 cursor-pointer"
                          htmlFor={brand.name}
                        >
                          {brand.name}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* تخفیف */}
              <div className="flex py-3 border border-x-0 border-t-0 justify-between font-bold text-[15px] text-[#424750]">
                <label className="grow cursor-pointer" htmlFor="default-toggle">
                  فقط کالا های تخفیف دار
                </label>

                <label
                  htmlFor="default-toggle"
                  className="inline-flex relative items-center cursor-pointer"
                >
                  <input
                    onChange={offerHandler}
                    type="checkbox"
                    value=""
                    id="default-toggle"
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              {/* کالا های موجود */}

              <div className="flex py-3 border border-x-0 border-t-0 justify-between font-bold text-[15px] text-[#424750]">
                <label
                  className="grow cursor-pointer"
                  htmlFor="default-toggles"
                >
                  فقط کالا های موجود
                </label>

                <label
                  htmlFor="default-toggles"
                  className="inline-flex relative items-center cursor-pointer"
                >
                  <input
                    onChange={isAvailableHandler}
                    type="checkbox"
                    value=""
                    id="default-toggles"
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* فیلتر اصلی */}
              {filters?.map((filter,index) => {
                return (
                  <div key={index} className="border border-x-0 border-t-0 last:border-b-0">
                    {/* let filterValues = filterProduct && filterProduct.map(data => data.productValues.filter(el => searchFilter.includes(el.value)).map(dats=>dats)) */}
                    <div
                      onClick={() => openValueHandler(filter.publishedAt)}
                      key={filter.publishedAt}
                      className="flex justify-between items-center w-full cursor-pointer"
                    >
                      <div
                        className={` py-3 font-bold text-[15px] text-[#424750]`}
                      >
                        {filter.filterProduct}
                      </div>
                      <KeyboardArrowDownIcon className="w-6 h-6" />
                    </div>

                    <div
                      className={`flex flex-col w-full h-auto items-center border border-x-0 border-t-0 ${
                        openValue == filter.publishedAt
                          ? "max-h-[200px] scrollCustomer overflow-y-scroll visible"
                          : "!invisible !h-0"
                      } `}
                    >
                      {filter.product_values.data.map((item) => item.attributes)
                        .length > 5 && (
                        <input
                          onChange={searchHandler}
                          className="border mb-3 mt-1 px-2 py-3 text-sm w-full rounded-md"
                          type="text"
                          placeholder={`جستجو در ${filter.filterProduct}`}
                        />
                      )}
                      {filter.product_values &&
                        filter.product_values.data
                          .map((item) => item.attributes)
                          .filter((el) => el.value.includes(searchFilter))
                          .map((value, index) => {
                            return (
                              // <div onChange={() => changeBrandHandler(filter.value)}>{value.value}</div>
                              <div
                                key={index}
                                className={`flex w-full h-auto items-center border border-x-0 border-t-0 last:border-0 ${
                                  openValue == filter.publishedAt
                                    ? "max-h-auto visible"
                                    : "!invisible !h-0"
                                } `}
                              >
                                <input
                                  className="w-[15px] h-[15px] ml-4 py-1 accent-[#008eb2] cursor-pointer"
                                  onChange={() =>
                                    changeValueHandler(value.value)
                                  }
                                  type="checkbox"
                                  name=""
                                  id={value.value}
                                />
                                <label
                                  className="select-none grow text-[#424750] text-[15px]font-bold py-2 cursor-pointer"
                                  htmlFor={value.value}
                                >
                                  {value.value}
                                </label>
                              </div>
                            );
                          })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* mobile filter */}
          <div className="flex flex-col flex-1">
            <div className="flex xl:hidden items-center mx-10 border border-x-0 border-t-0 pb-2">
              <div
                onClick={openModalFilterHandler}
                className="flex items-center "
              >
                <FilterListIcon className="w-6 h-6 fill-[#424750] cursor-pointer" />
                <span className="text-xs font-bold cursor-pointer">فیلتر</span>
              </div>
              <div className="hidden items-center mr-2">
                <ImportExportIcon className="w-6 h-6 fill-[#424750]" />
                <span className="text-xs font-bold">{sortText}</span>
              </div>
            </div>

            {/* products */}
            <LayoutGroup>
              <Pagination
                data={filteredProducts}
                RenderComponent={Product}
                title="Posts"
                buttonConst={3}
                contentPerPage={10}
                siblingCount={1}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </LayoutGroup>
          </div>
        </div>
      </div>

      {/* modal filter */}
      <div
        className={`fixed bottom-0 lg:top-full xl:hidden border  pt-2 left-0 p-4 bg-white  overflow-x-hidden w-full  min-h-fit max-h-3/4 overflow-y-scroll scrollCustomer z-[999] ${
          openModalFilter
            ? "-translate-y-0 lg:block transition-all duration-500"
            : "translate-y-full  lg:hidden transition-all duration-500"
        } `}
      >
        <div className="flex flex-col">
          {/* close */}
          <div className="text-sm my-2 " onClick={closeModalFilterHandler}>
            <CloseIcon className="w-6 h-6 text-red-600" />
            بستن فیلتر
          </div>
          {/* برند */}
          <div className="cursor-pointer">
            <div
              onClick={openBrandHandler}
              className={`flex justify-between items-center cursor-pointer py-3 font-bold text-[15px] text-[#424750] ${
                openBrand ? "border-0" : "border border-x-0 border-t-0"
              } `}
            >
              <p>برند</p>
              <KeyboardArrowDownIcon className="w-6 h-6" />
            </div>

            <div>
              {newBrands.map((brand) => {
                return (
                  <div
                    key={brand.id}
                    className={`w-full border border-x-0 border-t-0 flex items-center ${
                      openBrand
                        ? "max-h-auto visible"
                        : "!h-0 !max-h-0 !invisible"
                    } `}
                  >
                    <input
                      className="w-[15px] h-[15px] ml-4 py-1 accent-[#008eb2] cursor-pointer"
                      onChange={() => changeBrandHandler(brand.name)}
                      type="checkbox"
                      name=""
                      id={brand.name}
                    />
                    <label
                      className="select-none text-[#424750] text-[15px]font-bold py-2 cursor-pointer"
                      htmlFor={brand.name}
                    >
                      {brand.name}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
          {/* تخفیف */}
          <div className="flex py-3 border border-x-0 border-t-0 justify-between font-bold text-[15px] text-[#424750]">
            <label className="grow cursor-pointer" htmlFor="default-toggle">
              فقط کالا های تخفیف دار
            </label>

            <label
              htmlFor="default-toggle"
              className="inline-flex relative items-center cursor-pointer"
            >
              <input
                onChange={offerHandler}
                type="checkbox"
                value=""
                id="default-toggle"
                className="!sr-only !peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 !peer-focus:ring-blue-300 !dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 !peer-checked:bg-blue-600"></div>
            </label>
          </div>
          {/* کالا های موجود */}

          <div className="flex py-3 border border-x-0 border-t-0 justify-between font-bold text-[15px] text-[#424750]">
            <label className="grow cursor-pointer" htmlFor="default-toggles">
              فقط کالا های موجود
            </label>

            <label
              htmlFor="default-toggles"
              className="inline-flex relative items-center cursor-pointer"
            >
              <input
                onChange={isAvailableHandler}
                type="checkbox"
                value=""
                id="default-toggles"
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* فیلتر اصلی */}
          {filters?.map((filter,index) => {
            return (
              <div key={index} className="border border-x-0 border-t-0 last:border-b-0">
                <div
                  onClick={() => openValueHandler(filter.publishedAt)}
                  key={filter.publishedAt}
                  className="flex justify-between items-center w-full cursor-pointer"
                >
                  <div className={` py-3 font-bold text-[15px] text-[#424750]`}>
                    {filter.filterProduct}
                  </div>
                  <KeyboardArrowDownIcon className="w-6 h-6" />
                </div>
                <div
                  className={`flex flex-col w-full h-auto items-center border border-x-0 border-t-0 ${
                    openValue == filter.publishedAt
                      ? "max-h-[200px] scrollCustomer overflow-y-scroll visible"
                      : "!invisible !h-0"
                  } `}
                >
                  {filter.product_values &&
                    filter.product_values.data
                      .map((item) => item.attributes)
                      .filter((el) => el.value.includes(searchFilter))
                      .map((value, index) => {
                        return (
                          // <div onChange={() => changeBrandHandler(filter.value)}>{value.value}</div>
                          <div
                            key={index}
                            className={`flex w-full h-auto items-center border border-x-0 border-t-0 last:border-0 ${
                              openValue == filter.publishedAt
                                ? "max-h-auto visible"
                                : "!invisible !h-0"
                            } `}
                          >
                            <input
                              className="w-[15px] h-[15px] ml-4 py-1 accent-[#008eb2] cursor-pointer"
                              onChange={() => changeValueHandler(value.value)}
                              type="checkbox"
                              name=""
                              id={value.value}
                            />
                            <label
                              className="select-none grow text-[#424750] text-[15px]font-bold py-2 cursor-pointer"
                              htmlFor={value.value}
                            >
                              {value.value}
                            </label>
                          </div>
                        );
                      })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(contex) {
  let { query } = contex;

  let productResponse = await axios.get(
    `/products?populate[0]=seller_views&populate[1]=product_videos&populate[2]=product_images&populate[3]=products_values`
  );
  const data = ResponseToArray(productResponse);
  let productss = data.map((a) => a);

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
      data,
    },
  };
}
