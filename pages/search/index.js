import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { ResponseToArray } from "lib/ResponseToArray";
import Head from "next/head";
import FilterListIcon from "@mui/icons-material/FilterList";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function HomePage({
  productss,
  brand,
  query,
  filterProduct,
  category,
  mainCategories,
}) {
  const [openBrand, setOpenBrand] = useState(false);
  const [brands, setBrands] = useState(brand);
  const [newBrands, setNewBrands] = useState(brands || null);
  const [products, setProducts] = useState(productss);
  const [checked, setChecked] = useState([]);
  const [isOffer, setIsOffer] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);

  
  useEffect(() => {
    let filterBrands = products.map((product) => product.brand);
    const newFilter = (filterBrands = [...new Set(filterBrands)]);
    const data = brands
      .filter((data) => newFilter.includes(data.name))
      .map((filterBrand) => filterBrand);
    setNewBrands(data);
  }, []);
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
          .map((datas) => {
            return (
              <ul className="flex gap-x-3 mx-3 text-sm font-bold mb-5 mt-2">
                <li>دیجی استور /</li>
                <li>{datas.mainCategory} /</li>
                <li>{datas.name} /</li>
                {datas.subCategory
                  .filter((sub) => sub.name == query)
                  .map((subs) => {
                    return <li>{subs.name}</li>;
                  })}
              </ul>
            );
          })}
        <div className="w-full flex flex-col lg:flex-row px-3">
          {/* filter */}
          <div className="w-[300px] border hidden flex-col lg:flex px-2 py-4">
            <div className="flex flex-col">
              {/* برند */}
              <div className="cursor-pointer">
                <div
                  onClick={() => setOpenBrand(!openBrand)}
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
                  for="default-toggle"
                  class="inline-flex relative items-center cursor-pointer"
                >
                  <input
                    onChange={() => setIsOffer(!isOffer)}
                    type="checkbox"
                    value=""
                    id="default-toggle"
                    class="sr-only peer"
                  />
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
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
                  for="default-toggles"
                  class="inline-flex relative items-center cursor-pointer"
                >
                  <input
                    onChange={()=>setIsAvailable(!isAvailable)}
                    type="checkbox"
                    value=""
                    id="default-toggles"
                    class="sr-only peer"
                  />
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(contex) {
  let { query } = contex;

  let productResponse = await axios.get(
    `http://localhost:1337/api/products?populate[0]=seller_views&populate[1]=product_videos&populate[2]=product_images&populate[3]=products_values`
  );
  const data = ResponseToArray(productResponse);
  let productss = data.map((a) => a);

  let categoryResponse = await axios.get(
    "http://localhost:1337/api/categories?populate[0]=sub_categories"
  );
  const category = ResponseToArray(categoryResponse);

  let brandsResponse = await axios.get("http://localhost:1337/api/brands");
  const brand = ResponseToArray(brandsResponse);

  let filterProductResponse = await axios.get(
    "http://localhost:1337/api/filter-products?populate[0]=product_values"
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
