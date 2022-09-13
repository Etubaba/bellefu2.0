import ProductItem from "./ProductItem";
import ShopComponent2 from "../shopComponents/ShopComponent2";
import { useSelector } from "react-redux";
import { apiData, shopApi } from "../../constant";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Main } from "next/document";

const Products = ({ shops }) => {
  const [page, setPage] = useState(1);
  const [countryData, setCountryData] = useState([]);
  const [productIndex, setProductIndex] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [categoryitem, setCategoryItem] = useState([]);

  const getCountry = useSelector((state) => state.bellefu.countrySelected);
  const search = useSelector((state) => state.bellefu.searchFilter);
  const location = useSelector(
    (state) => state.bellefu.indexData?.defaultCountry
  );
  const category = useSelector((state) => state.bellefu.catfilter);
  console.log(category);

  // console.log(getCountry);
  // console.log(countryData);
  console.log(searchResult);
  const main =
    getCountry !== null && search === ""
      ? countryData
      : search !== ""
      ? searchResult
      : category !== null
      ? categoryitem
      : page !== 1 && search === "" && getCountry === null
      ? productIndex
      : shops;

  useEffect(() => {
    setCountryData([]);

    const newProducts = async () => {
      // if (searchCountry) setSearching(true);

      axios
        .get(`${shopApi}goods/list/${getCountry}?page=${page}`)
        .then((res) => {
          // console.log(res.data?.data?.data);
          // if (!res.data.data.data.length) initialRender.current = 1;
          // else if (res.data.data.data.length) initialRender.current = 2;

          setCountryData(res.data?.data?.data);
          setTotalPage(res.data?.last_page);
          // setInitialData(res.data.data.data);
          // setSearching(false);
        })
        .catch((err) => {
          console.log(err);
          // setSearching(false);
        });
    };
    newProducts();
  }, [getCountry, page]);

  // _________________________________________________________ filter by catgories
  useEffect(() => {
    setCategoryItem([]);

    const newProduct = async () => {
      // if (searchCountry) setSearching(true);

      axios
        .get(`${shopApi}goods/category/${category}?page=${page}`)
        .then((res) => {
          console.log(res.data?.data?.data);
          // if (!res.data.data.data.length) initialRender.current = 1;
          // else if (res.data.data.data.length) initialRender.current = 2;

          setCategoryItem(res.data?.data?.data);
          setTotalPage(res.data?.last_page);
          // setInitialData(res.data.data.data);
          // setSearching(false);
        })
        .catch((err) => {
          console.log(err);
          // setSearching(false);
        });
    };
    newProduct();
  }, [category, page]);

  const where = getCountry === null ? location : getCountry;

  useEffect(() => {
    if (search !== "") {
      const getSearchResult = async () => {
        await axios
          .get(`${shopApi}goods/search/${search.toLocaleLowerCase()}/${where}`)
          .then((res) => {
            console.log(res);
            setSearchResult(res.data?.data?.data);
            setTotalPage(res.data?.last_page);
            // setSuggestion(res.data.suggest.data);
          })
          //  setCountryData(res.data.data))
          .catch((err) => console.log(err));
      };

      getSearchResult();
    } else {
      setCountryData(main);
    }
  }, [search, page]);

  return (
    <div
      className={
        grid
          ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      }
    >
      {main.map((item, index) => (
        <div key={index}>
          {/* <ProductItem item={item} /> */}
          <ShopComponent2 key={index} product={item} />
        </div>
      ))}
    </div>
  );
};

export default Products;
