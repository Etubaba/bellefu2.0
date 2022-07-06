import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { profileDetails } from "../../features/bellefuSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import { BsShopWindow } from "react-icons/bs";
import { Modal } from "@mui/material";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { IconButton } from "@mui/material";
import Switch from "@mui/material/Switch";
import { imageBaseUrl, shopApi } from "../../constant";

function shop() {
  const user = useSelector(profileDetails);
  const router = useRouter();
  const [valueupdate, setValueUpdate] = useState({});
  const [shopDetails, setShopDetails] = useState([]);
  const [products, setProducts] = useState([]);
  const [productsname, setProductsName] = useState(valueupdate?.title);
  const [productsprice, setProductsPrice] = useState(valueupdate?.promoPrice);
  const [productspromoprice, setProductsPromoPrice] = useState(
    valueupdate?.promoPrice
  );
  const [modalopen, setModalOpen] = useState(false);

  const [checked, setChecked] = useState(null);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    axios
      .get(`${shopApi}view/single/${user?.shopId}`)
      .then((res) => {
        setProducts(res.data.data);
        if (res.data.shop !== undefined) {
          setShopDetails(res.data?.shop);
        }
      })
      .then((err) => {
        console.log(err);
      });
  }, []);

  const handleEdith = (e) => {
    e?.inStock === 1 ? setChecked(true) : setChecked(false);
    setModalOpen(true);
    setProductsName(e.title);
    setProductsPrice(e.price);
    setProductsPromoPrice(e.promoPrice);
    setValueUpdate(e);
  };

  const handleSave = (e) => {
    e.preventDefault();

    axios
      .post(`${shopApi}goods/update`, {
        title: productsname,
        productId: valueupdate?.productId,
        inStock: checked === true ? 1 : 0,
        price: Number(productsprice),
        promoPrice: Number(productspromoprice),
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Save Sucessful", {
            position: "top-center",
          });

          axios
            .get(`${shopApi}view/single/${user?.shopId}`)
            .then((res) => {
              setProducts(res.data.data);
            })
            .then((err) => {
              console.log(err);
            });
          setModalOpen(false);
        }
      })
      .catch((err) => {
        toast.error(`${err}`, {
          position: "top-center",
        });
      });
  };

  console.log("shopd", shopDetails);
  return (
    <>
      <Modal
        open={modalopen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        // sx={{ marginLeft: 'auto', marginRight: 'auto', width: '100%', justifyContent: 'center', alignItems: 'center' }}
      >
        <div
          className="flex flex-col items-center justify-center mx-auto mt-52 pt-2  rounded-lg shadow-md   bg-bellefuWhite w-[80%] md:w-[60%] lg:w-[40%]"
          // sx={edit}
        >
          <div className="grid grid-cols-6 gap-3  my-5">
            <div className="col-span-6 sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700 flex-row justify-between">
                <p>Product Name</p>
              </label>
              <input
                onChange={(e) => setProductsName(e.target.value)}
                defaultValue={productsname}
                type="text"
                className="  bg-gray-100 p-[7px] mt-1 focus:ring-bellefuGreen focus:outline-0 block w-full shadow-sm sm:text-sm border-gray-300 border-2 rounded-md"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700 flex-row justify-between">
                <p>price</p>
              </label>
              <input
                onChange={(e) => setProductsPrice(e.target.value)}
                defaultValue={productsprice}
                type="number"
                className="  bg-gray-100 p-[7px] mt-1 focus:ring-bellefuGreen focus:outline-0 block w-full shadow-sm sm:text-sm border-gray-300 border-2 rounded-md"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700 flex-row justify-between">
                <p>promo-price</p>
              </label>
              <input
                onChange={(e) => setProductsPromoPrice(e.target.value)}
                type="number"
                defaultValue={productspromoprice}
                className="  bg-gray-100 p-[7px] mt-1 focus:ring-bellefuGreen focus:outline-0 block w-full shadow-sm sm:text-sm border-gray-300 border-2 rounded-md"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700 flex-row justify-between">
                <p>stock status</p>
              </label>
              <Switch
                checked={checked}
                color="success"
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
                className="text-bellefuGreen "
              />
            </div>
          </div>
          <div className="flex my-4 md:w-[60%] lg:w-[60%] space-x-20 justify-between">
            <button
              className=" bg-gray-400 rounded-md py-2 px-5"
              onClick={() => setModalOpen(false)}
            >
              <p className="text-xs text-white md:text-[15px]">Cancel</p>
            </button>
            <button
              className="bg-bellefuOrange rounded-md py-2 px-5"
              onClick={handleSave}
            >
              <p className="text-xs text-white md:text-[15px]">save </p>
            </button>
          </div>
        </div>
      </Modal>
      <div className="rounded-lg md:mt-5 mt-2 bg-bellefuWhite   h-auto w-full md:w-auto">
        <div className="flex justify-between px-3  lg:px-10 md:py-6 py-2 border-b">
          <h1 className="font-semibold text-sm">My Shop Details</h1>
          {user?.shopId === null ? null : (
            <div>
              {shopDetails[0]?.expired ? (
                <button
                  onClick={() => router.push("/shop/upload-product")}
                  className="py-1 lg:py-1.5 hover:bg-orange-400  px-1.5 lg:px-3 rounded-full bg-bellefuOrange text-white text-sm lg:text-sm"
                >
                  Renew Shop subscription
                </button>
              ) : (
                <button
                  onClick={() => router.push("/shop/upload-product")}
                  className="py-1 lg:py-1.5 hover:bg-orange-400  px-1.5 lg:px-3 rounded-full bg-bellefuOrange text-white text-sm lg:text-sm"
                >
                  Add new product
                </button>
              )}
            </div>
          )}
        </div>
        {user?.shopId === null ? (
          <div className="h-full px-2 lg:px-0 ">
            <div className="border mx-auto mt-2 lg:my-5 rounded-xl w-full lg:w-7/12 h-11/12 ">
              <div className="flex flex-col justify-center mt-24 mb-24 items-center">
                <BsShopWindow className="text-7xl lg:text-9xl mb-5 text-gray-600" />
                <p className="text-sm capitalize lg:text-lg text-gray-600 px-2 text-center">
                  You do not have a shop please create one
                </p>
                <div onClick={() => router.push("/createShop")}>
                  {" "}
                  <button
                    onClick={() => router.push("/createShop")}
                    className="py-1 lg:py-3 hover:bg-orange-400 mt-16 px-8 lg:px-12 rounded-full bg-bellefuOrange text-white text-sm lg:text-lg"
                  >
                    Create shop
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="px-2 md:px-5 lg:px-10 py-6 ">
              {products?.length === 0 ? (
                <div className="h-full px-2 lg:px-0 ">
                  <div className="border mx-auto mt-2 lg:my-5 rounded-xl w-full lg:w-[64%] h-11/12 ">
                    <div className="flex flex-col justify-center mt-24 mb-24 items-center">
                      <img
                        src={`${`${imageBaseUrl}get/store/image/`}${
                          shopDetails[0]?.logo
                        }`}
                        alt=""
                        className="object-cover  rounded-md w-[70%] h-64"
                      />
                      {shopDetails[0]?.expired && (
                        <p className="absolute top-[14rem] lg:top-[15.1rem] uppercase text-xs bg-bellefuGreen px-3 py-1 rounded-tl-md rounded-br-md text-bellefuWhite font-medium">
                          expired
                        </p>
                      )}

                      <p className="my-5 text-2xl font-semibold">
                        {shopDetails[0]?.shopName}
                      </p>
                      {/* <BsShopWindow className="text-7xl lg:text-9xl mb-5 text-gray-600" /> */}
                      <p className="text-sm capitalize lg:text-lg text-gray-600 px-2 text-center">
                        You do not have any products in your shop
                      </p>
                      <div>
                        {" "}
                        {shopDetails[0]?.expired ? (
                          <button
                            // onClick={() => router.push("/shop/upload-product")}
                            className="py-1 md:py-2  mt-16 px-7 lg:px-6 rounded-full bg-bellefuGreen text-white text-sm lg:text-lg"
                          >
                            Renew Subscription
                          </button>
                        ) : (
                          <button
                            onClick={() => router.push("/shop/upload-product")}
                            className="py-1 lg:py-2 hover:bg-orange-400 mt-16 px-7 lg:px-6 rounded-full bg-bellefuOrange text-white text-sm lg:text-lg"
                          >
                            Add products
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell className="font-semibold">
                          Product-Name
                        </TableCell>
                        <TableCell className="font-semibold" align="center">
                          Price
                        </TableCell>
                        <TableCell className="font-semibold" align="center">
                          Promo-Price
                        </TableCell>
                        <TableCell className="font-semibold" align="center">
                          Status
                        </TableCell>
                        <TableCell className="font-semibold" align="center">
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {products?.map((product, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {product.title?.substring(0, 20) + "...."}
                          </TableCell>
                          <TableCell align="center">{product.price}</TableCell>
                          <TableCell align="center">
                            {product.promoPrice}
                          </TableCell>
                          <TableCell align="center">
                            {product.inStock === 1 ? "instock" : "out Of stock"}
                          </TableCell>
                          <TableCell className=" " align="center">
                            <IconButton onClick={() => handleEdith(product)}>
                              <FaRegEdit />
                            </IconButton>
                            <IconButton>
                              <MdOutlineDeleteOutline />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
shop.Layout = Layout;
export default shop;
