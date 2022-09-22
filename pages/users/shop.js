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
import { Card } from "../../public/card.png";
import { MdOutlineDeleteOutline } from "react-icons/md";
import {
  payment,
  profileDetails,
  shopCreated,
} from "../../features/bellefuSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BsShopWindow } from "react-icons/bs";
import { Backdrop, Fade, Modal } from "@mui/material";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { IconButton } from "@mui/material";
import Switch from "@mui/material/Switch";
import { imageBaseUrl, shopApi } from "../../constant";
import Payment from "../../components/paymentComponent/Payment";
import { GoListOrdered } from "react-icons/go";
import moment from "moment";
import { Box } from "@mui/system";

function shop() {
  const user = useSelector(profileDetails);
  const router = useRouter();
  const [valueupdate, setValueUpdate] = useState({});
  const [shopDetails, setShopDetails] = useState([]);
  const [orderdetails, setOrderDetails] = useState();
  const [showorders, setShowOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [subType, setSubType] = useState(25);
  const [productsname, setProductsName] = useState(valueupdate?.title);
  const [shoporder, SetshopOrder] = useState(false);
  const [productsprice, setProductsPrice] = useState(valueupdate?.promoPrice);
  const [productspromoprice, setProductsPromoPrice] = useState(
    valueupdate?.promoPrice
  );
  const [modalopen, setModalOpen] = useState(false);
  const [modalopen2, setModalOpen2] = useState(false);
  const [sub, setSub] = useState(false);
  const [qrcode, setQrcode] = useState(false);

  const [checked, setChecked] = useState(null);
  const [shippingfee, setShippingFee] = useState(null);
  const [comment, setComment] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [reload, setReload] = useState(0);
  const [orderLocation, setOrderLocation] = useState(false);
  const [orderStatus, setOrderStatus] = useState("");
  const [orderComment, setOrderComment] = useState("");
  const [orderpaid, setOrderpaid] = useState(null);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  // does a user have a shop ?
  const shopOwner = useSelector((state) => state.bellefu?.shop);
  const shopId = useSelector((state) => state.bellefu?.shopIdentity);

  const dispatch = useDispatch();

  //get qrcode image of user
  const qrcodeImage = useSelector((state) => state.bellefu?.qrcode);
  console.log("qr", qrcodeImage);

  useEffect(() => {
    axios
      .get(`${shopApi}view/single/${shopId}`)
      .then((res) => {
        if (res.data.status) setProducts(res.data.data);
        if (res.data.shop !== undefined) {
          setShopDetails(res.data?.shop);
          console.log(res.data?.shop);
        }
      })
      .then((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        // `${shopApi}/list/shop/order/${user?.shopId}`
        `${shopApi}list/shop/order/${shopId}`
      )
      .then((res) => {
        setOrderDetails(res.data.data);
      })
      .then((err) => {
        console.log(err);
      });
  }, [reload]);

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
            .get(`${shopApi}view/single/${shopId}`)
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
  const updateOrderStatus = (e) => {
    e.preventDefault();

    axios
      .post(`${shopApi}update/shipment`, {
        status: orderStatus,
        comment: orderComment,
        orderItemId: orderId,
      })
      .then((res) => {
        if (res.data.status) {
          toast.success("Shipment updated Sucessfully", {
            position: "top-center",
          });
          setReload((prev) => prev + 1);
          setOrderLocation(false);
        }
      })
      .catch((err) => {
        toast.error(`${err}`, {
          position: "top-center",
        });
      });
  };
  const handleSave2 = (e) => {
    e.preventDefault();

    axios
      .post(`${shopApi}update/order/item`, {
        actor: "seller",
        // productId: valueupdate?.productId,
        status: "pending",
        shipping: shippingfee,
        comment: comment,
        orderItemId: orderId,
      })
      .then((res) => {
        if (res.data.status) {
          toast.success("Shipping fee updated Sucessfully", {
            position: "top-center",
          });
          setReload((prev) => prev + 1);
          setModalOpen2(false);
        }
      })
      .catch((err) => {
        toast.error(`${err}`, {
          position: "top-center",
        });
      });
  };

  const hasPaid = useSelector((state) => state.bellefu?.hasPaid);

  if (hasPaid && subType !== 0) {
    setTimeout(() => {
      axios
        .post(`${shopApi}renew/subscription`, {
          shopId: shopDetails[0]?.shopId,
          subscriptionType: subType === 25 ? "monthly" : "yearly",
        })
        .then((res) => {
          if (res.data.status) {
            toast.success(
              "Your shop subscription has been successfully renewed."
            );
            dispatch(payment(false));
            dispatch(shopCreated(true));
            setSubType(0);
            localStorage.removeItem("coin");
          }
        });
    }, 2000);
  }

  const edit = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 350,
    height: 420,
    bgcolor: "white",
    boxShadow: 24,
    borderRadius: 3,
    paddingTop: 2,
    margin: "0 auto",
    padding: "15px",
  };

  const download = () => {
    if (window !== "undefined") {
      var element = document.createElement("a");
      var file = new Blob([`${shopApi}get/qrcode/image/${qrcodeImage}`], {
        type: "image/*",
      });
      element.href = URL.createObjectURL(file);
      element.download = "image.jpg";
      element.click();
    }
  };

  return (
    <>
      <Modal
        title="Add shipping fee"
        open={modalopen2}
        onClose={() => setModalOpen2(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ overflowY: "scroll" }}
      >
        <div
          className="flex flex-col items-center justify-center mx-auto mt-16 p-4  rounded-lg shadow-md   bg-bellefuWhite w-[80%] md:w-[60%] lg:w-[50%]"
          // sx={edit}
        >
          <div className="w-full">
            <h1 className="font-bold text-xl italic">Buyer Location</h1>
            {/* <div className="flex justify-between border-b-2 border-dashed my-2">
              <p className="font-bold text-[1rem]">Name</p>
              <p>John doe</p>
            </div> */}
            <div className="flex justify-between  border-b-2 border-dashed mb-2">
              <p className="font-bold text-[1rem]">Country</p>
              <p>{showorders?.countryName}</p>
            </div>
            <div className="flex justify-between  border-b-2 border-dashed mb-2">
              <p className="font-bold text-[1rem]">State</p>
              <p>{showorders?.stateName}</p>
            </div>
            <div className="flex justify-between  mb-2">
              <p className="font-bold text-[1rem]">Address</p>
              <p>{showorders?.address}</p>
            </div>
          </div>

          <div className="w-full mt-4">
            <h1 className="font-bold text-xl italic">Product Info</h1>
            <div className="flex justify-between border-b-2 border-dashed my-2">
              <p className="font-bold text-[1rem]">Title</p>
              <p>{showorders?.title}</p>
            </div>
            <div className="flex justify-between  border-b-2 border-dashed mb-2">
              <p className="font-bold text-[1rem]">Product qty.</p>
              <p>{showorders?.product_quantity}</p>
            </div>
            <div className="flex justify-between  border-b-2 border-dashed mb-2">
              <p className="font-bold text-[1rem]">Price</p>
              <p>{showorders?.price}</p>
            </div>
            <div className="flex justify-between  border-b-2 border-dashed mb-2">
              <p className="font-bold text-[1rem]">Total-Price</p>
              <p>{showorders?.grandTotal}</p>
            </div>
            <div className="  md:flex lg:flex justify-between border-b-2 border-dashed  mb-2">
              <p className="font-bold text-[1rem]">Description</p>
              <p className="">
                <p
                  className=""
                  dangerouslySetInnerHTML={{ __html: showorders?.description }}
                />
              </p>
            </div>
            <div className="flex justify-between border-b-2 border-dashed  mb-2">
              <p className="font-bold text-[1rem]">Status</p>
              <p>{showorders?.status}</p>
            </div>
            <div className="flex justify-between border-b-2 border-dashed  mb-2">
              <p className="font-bold text-[1rem]">Shipping fee</p>
              <input
                onChange={(e) => setShippingFee(e.target.value)}
                className=" p-1 w-[120px] md:auto lg:w-auto  bg-gray-100 rounded-md"
                type="number"
                placeholder="Enter shipping fee.."
              />
            </div>
            <div className="flex justify-between  mb-2">
              <p className="font-bold text-[1rem]">Comment</p>
              <input
                onChange={(e) => setComment(e.target.value)}
                className=" p-1 w-[120px] md:auto lg:w-auto  bg-gray-100 rounded-md"
                type="text"
                placeholder="comment here.."
              />
            </div>
          </div>
          <div className="flex my-4 md:w-[60%] lg:w-[60%] space-x-20 justify-between">
            <button
              className=" bg-gray-400 rounded-md py-2 px-5"
              onClick={() => setModalOpen2(false)}
            >
              <p className="text-xs text-white md:text-[15px]">Cancel</p>
            </button>
            <button
              className="bg-bellefuOrange rounded-md py-2 px-5"
              onClick={handleSave2}
            >
              <p className="text-xs text-white md:text-[15px]">save </p>
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        open={orderLocation}
        onClose={() => setOrderLocation(false)}
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
                <p>Order Location/Status</p>
              </label>
              <input
                onChange={(e) => setOrderStatus(e.target.value)}
                value={orderStatus}
                type="text"
                className="  bg-gray-100 p-[7px] mt-1 focus:ring-bellefuGreen focus:outline-0 block w-full shadow-sm sm:text-sm border-gray-300 border-2 rounded-md"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700 flex-row justify-between">
                <p>Comment</p>
              </label>
              <input
                onChange={(e) => setOrderComment(e.target.value)}
                value={orderComment}
                type="text"
                className="  bg-gray-100 p-[7px] mt-1 focus:ring-bellefuGreen focus:outline-0 block w-full shadow-sm sm:text-sm border-gray-300 border-2 rounded-md"
              />
            </div>
          </div>
          <div className="flex my-4 md:w-[60%] lg:w-[60%] space-x-20 justify-between">
            <button
              className=" bg-gray-400 rounded-md py-2 px-5"
              onClick={() => setOrderLocation(false)}
            >
              <p className="text-xs text-white md:text-[15px]">Cancel</p>
            </button>
            <button
              className="bg-bellefuOrange rounded-md py-2 px-5"
              onClick={updateOrderStatus}
            >
              <p className="text-xs text-white md:text-[15px]">save </p>
            </button>
          </div>
        </div>
      </Modal>
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

      <Modal
        open={sub}
        onClose={() => setSub(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="flex mt-12 justify-center items-center">
          <Payment sub={setSubType} modal={setSub} />
        </div>
      </Modal>
      {/* image modal goes here  */}

      <Modal
        open={qrcode}
        onClose={() => setQrcode(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        opacity={6}
        // sx={{ marginLeft: 'auto', marginRight: 'auto', width: '100%', justifyContent: 'center', alignItems: 'center' }}
      >
        <Box sx={edit}>
          <div className="flex justify-center items-center">
            <img
              src={`${imageBaseUrl}get/qrcode/image/${qrcodeImage}`}
              alt="error"
              className="md:w-72 w-60 h-60 md:h-72 my-4 object-contain"
            />
          </div>
          <p className="text-center text-xs">
            Download and share QRcode for your shop link.{" "}
          </p>
          <div className="flex mt-3 space-x-20 justify-around">
            <a
              href={`${imageBaseUrl}get/qrcode/image/${qrcodeImage}`}
              download
              onClick={() => {
                download();
                setQrcode(false);
              }}
              className=" bg-bellefuOrange hover:bg-orange-300 py-2 px-4 rounded-md shadow text-white"
            >
              Download
            </a>
          </div>
        </Box>
      </Modal>
      <div className="rounded-lg md:mt-5 mt-2 bg-bellefuWhite   h-auto w-full md:w-auto">
        <div className="flex justify-between px-3  lg:px-10 md:py-6 py-2 border-b">
          {shoporder ? (
            <h1 className="font-semibold text-sm">Order Details</h1>
          ) : (
            <h1 className="font-semibold text-sm">My Shop</h1>
          )}{" "}
          {qrcodeImage !== null && (
            <p
              onClick={() => setQrcode(!qrcode)}
              className="text-bellefuGreen underline text-xs md:text-base  cursor-pointer
            hover:text-green-600"
            >
              Get QRcode
            </p>
          )}
          {shopId === null || !shopOwner ? null : (
            <div>
              {shopDetails[0]?.expired ? (
                <button
                  onClick={() => setSub(true)}
                  className="py-1 lg:py-1.5 hover:bg-orange-400  px-1.5 lg:px-3 rounded-full bg-bellefuOrange text-white text-sm lg:text-sm"
                >
                  Renew Shop subscription
                </button>
              ) : (
                <div className="flex justify-between md:space-x-10 lg:space-x-10 ">
                  <div>
                    {shoporder ? (
                      <button
                        onClick={() => SetshopOrder(!shoporder)}
                        className="py-1 lg:py-1.5 hover:bg-orange-400  px-1.5 lg:px-3 rounded-full bg-bellefuOrange text-white text-sm lg:text-sm"
                      >
                        View Shop
                      </button>
                    ) : (
                      <button
                        onClick={() => SetshopOrder(true)}
                        className="py-1 lg:py-1.5 hover:bg-orange-400  px-1.5 lg:px-3 rounded-full bg-bellefuOrange text-white text-sm lg:text-sm"
                      >
                        Shop orders
                      </button>
                    )}
                  </div>
                  {!shoporder && (
                    <div>
                      <button
                        onClick={() => router.push("/shop/upload-product")}
                        className="py-1 lg:py-1.5 hover:bg-orange-400  px-1.5 lg:px-3 rounded-full bg-bellefuOrange text-white text-sm lg:text-sm"
                      >
                        Add product
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        {shopId === null || !shopOwner ? (
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
            <div className="px-2 md:px-5 lg:px-10  ">
              {!shoporder &&
                (products?.length === 0 ? (
                  <div className="h-full px-2 lg:px-0 ">
                    <div className="border py-7 my-8 mx-auto mt-2 lg:my-10 rounded-xl w-full lg:w-[64%] h-auto ">
                      <div className="flex flex-col justify-center  items-center">
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

                        <p className="my-3 text-2xl font-semibold">
                          {shopDetails[0]?.shopName}
                        </p>
                        {/* <BsShopWindow className="text-7xl lg:text-9xl mb-5 text-gray-600" /> */}
                        {!shopDetails[0]?.expired && (
                          <p className="text-sm capitalize lg:text-lg text-gray-600 px-2 text-center">
                            You do not have any products in your shop
                          </p>
                        )}
                        {shopDetails[0]?.expired && (
                          <p className="text-sm capitalize lg:text-lg text-gray-600 px-2 text-center">
                            Renew your subscription for shop
                          </p>
                        )}
                        <div>
                          {" "}
                          {shopDetails[0]?.expired ? (
                            <button
                              // onClick={() => router.push("/shop/upload-product")}
                              className="py-1 md:py-2  mt-7 px-7 lg:px-6 rounded-full bg-bellefuGreen text-white text-sm lg:text-lg"
                            >
                              Renew Subscription
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                router.push("/shop/upload-product")
                              }
                              className="py-1 lg:py-2 hover:bg-orange-400 mt-7 px-7 lg:px-6 rounded-full bg-bellefuOrange text-white text-sm lg:text-lg"
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
                            className="hover:bg-gray-100 cursor-pointer"
                            key={index}
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {product.title?.substring(0, 20) + "...."}
                            </TableCell>
                            <TableCell align="center">
                              {product.price}
                            </TableCell>
                            <TableCell align="center">
                              {product.promoPrice}
                            </TableCell>
                            <TableCell align="center">
                              {product.inStock ? "instock" : "out Of stock"}
                            </TableCell>
                            <TableCell className=" " align="center">
                              <IconButton onClick={() => handleEdith(product)}>
                                <FaRegEdit />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ))}

              {shoporder &&
                (orderdetails.length === 0 ? (
                  <div className="border mx-auto mt-2 lg:my-5 rounded-xl w-full lg:w-7/12 h-11/12 ">
                    <div className="flex flex-col justify-center mt-24 mb-24 items-center">
                      <GoListOrdered className="text-7xl lg:text-9xl mb-5 text-gray-600" />
                      <p className="text-sm capitalize lg:text-lg text-gray-600 px-2 text-center">
                        You do not have any order from your shop yet.
                      </p>
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
                            order Date
                          </TableCell>
                          <TableCell className="font-semibold" align="center">
                            shipping-fee
                          </TableCell>
                          <TableCell className="font-semibold" align="center">
                            Status
                          </TableCell>
                          <TableCell className="font-semibold" align="center">
                            Add shipping fee
                          </TableCell>
                          {
                            <TableCell className="font-semibold" align="center">
                              shipment status
                            </TableCell>
                          }
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {orderdetails?.map((product, index) => (
                          <TableRow
                            onClick={() => {
                              setShowOrders(product), setModalOpen2(true);
                            }}
                            className="hover:bg-gray-100 cursor-pointer"
                            key={index}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {product.title?.substring(0, 20) + "...."}
                            </TableCell>
                            <TableCell align="center">
                              {product.price}
                            </TableCell>
                            <TableCell align="center">
                              {moment(product.orderTime).format("ll")}
                            </TableCell>
                            <TableCell align="center">
                              {product.shipping_fee === null
                                ? "Update Price"
                                : product.shipping_fee}
                            </TableCell>
                            {/* <TableCell align="center">
                              {product.promoPrice}
                            </TableCell> */}
                            <TableCell align="center">
                              {product.status === "ordered"
                                ? "Payment completed"
                                : product.status}
                            </TableCell>
                            <TableCell className=" " align="center">
                              <IconButton
                                onClick={() => {
                                  setModalOpen2(true);
                                  setOrderId(product.orderItemId);
                                }}
                              >
                                <FaRegEdit />
                              </IconButton>
                            </TableCell>
                            <TableCell className=" " align="center">
                              {product.status === "ordered" && (
                                <IconButton
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setOrderLocation(true);
                                    setOrderId(product.orderItemId);
                                  }}
                                >
                                  <FaRegEdit />
                                </IconButton>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
shop.Layout = Layout;
export default shop;
