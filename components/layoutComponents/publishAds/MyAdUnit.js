import React, { useState } from "react";
import {
  MdLocationOn,
  MdOutlineWarningAmber,
  MdOutlineRemoveShoppingCart,
} from "react-icons/md";
import { BsCloudUpload, BsFillEyeFill } from "react-icons/bs";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { GrEdit } from "react-icons/gr";
import { FcApproval } from "react-icons/fc";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";
import { apiData, productImageUrl, webApi } from "../../../constant";
import { toast } from "react-toastify";
import { Modal } from "@mui/material";
import { favUpdated } from "../../../features/bellefuSlice";
import { Box } from "@mui/system";
import SelectComponent from "../SelectComponent";
import CountrySelect from "../../postAdsComponent/CountrySelect";
import { useEffect } from "react";
import Dropzone from "react-dropzone";

const MyAd = ({ product }) => {
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [modalopen, setModalOpen] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [price, setPrice] = useState("");
  const [catValue, setCatValue] = useState("");
  const [subCatValue, setSubCatValue] = useState("");
  const [stateValue, setStateValue] = useState("");
  const [cityValue, setCityValue] = useState("");

  const [location, setLocation] = useState("");
  const [des, setDes] = useState("");
  const [productName, setProductName] = useState("");
  const [cityData, setCityData] = useState([]);
  const [subCat, setSubCat] = useState([]);
  const [preview, setPreview] = useState([]);
  const [file, setFile] = useState([]);

  const router = useRouter();
  const dispatch = useDispatch();

  const details = useSelector((state) => state.bellefu?.indexData);
  const user = useSelector((state) => state.bellefu.profileDetails);

  const handleOut = () => {
    setOpen(!open);
    axios
      .post(`${apiData}change/stock`, {
        productId: product.productId,
        stockStatus: 0,
      })
      .then((res) => {
        if (res.data.status) {
          toast.info(`${product.title} is out of stock`, {
            position: "top-right",
          });
          dispatch(favUpdated());
        }
      });
  };

  const handleIn = () => {
    setOpen(!open);
    axios
      .post(`${apiData}change/stock`, {
        productId: product.productId,
        stockStatus: 1,
      })
      .then((res) => {
        if (res.data.status) {
          toast.success(` ${product.title} is now in stock`, {
            position: "top-right",
          });
          dispatch(favUpdated());
        }
      });
  };

  const updatePrice = () => {
    const formData = new FormData();
    formData.append("productId", product.productId);
    formData.append("price", price);
    axios({
      url: `${apiData}change/product/price`,
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        if (res.data.status) {
          toast.success(`${product.title} price updated`, {
            position: "bottom-left",
          });
          dispatch(favUpdated());
          setModalOpen(false);
        } else {
          toast.error(`something went wrong try again.`, {
            position: "bottom-left",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const deleteProduct = () => {
    axios
      .post(`${apiData}user/delete/product`, { productId: product.productId })
      .then((res) => {
        if (res.data.status) {
          toast.success("Product deleted successfully", {
            position: "bottom-left",
          });
          dispatch(favUpdated());
          setDeleteOpen(!deleteOpen);
        }
      });
  };

  const edit = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 350,
    height: 200,
    bgcolor: "white",
    boxShadow: 24,
    borderRadius: 3,
    paddingTop: 2,
    margin: "0 auto",
  };

  //update product matters starting from here;

  useEffect(() => {
    if (stateValue !== "") {
      axios
        .get(`${webApi}get/postadd/lgas/${stateValue}`)
        .then((response) => {
          const newLgaArr = response?.data.lga;

          setCityData(newLgaArr);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [stateValue]);

  const productEdit = () => {
    if (
      catValue === "" ||
      subCatValue === "" ||
      stateValue === "" ||
      cityValue === "" ||
      location === "" ||
      productName === "" ||
      price === "" ||
      des === ""
    ) {
      toast.error("Please,all fields are required", {
        position: "bottom-left",
      });
    } else {
      const formData = new FormData();

      formData.append("title", productName);
      formData.append("location", location);
      // see the image dey show for payload wen i post but wen e reach backend e no dey show
      formData.append("images1", file[0]);
      formData.append("images2", file[1]);
      formData.append("images3", file[2]);
      formData.append("images4", file[3]);
      formData.append("images5", file[4]);
      formData.append("images6", file[5]);
      formData.append("images7", file[6]);
      formData.append("images8", file[7]);
      formData.append("images9", file[8]);
      formData.append("images10", file[9]);
      formData.append("video", "");
      formData.append("categoryid", catValue);
      formData.append("subcategoryid", subCatValue);
      formData.append("shop", false);
      formData.append("device", "web");
      formData.append("price", price);
      formData.append("description", des);
      formData.append("tag1", "");
      formData.append("phone", user.phone);
      formData.append("userid", user.id);
      formData.append("citycode", cityValue);
      formData.append("countrycode", product.country_code);
      formData.append("states", stateValue);
      formData.append("currencyCode", user.currency_code);
      formData.append("plans", product.plan);
      formData.append("changedImage", file.length === 0 ? false : true);
      formData.append("id", product.productId);
      axios({
        method: "POST",
        url: `${apiData}all/product/update`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          if (res.data.status) {
            toast.success(`${product.title} updated successfully`, {
              position: "top-center",
            });
          }
          setModalEdit(false);
           dispatch(favUpdated());
          // res.status === 200
          //   ? setShowSuccess(false)
          //   : setShowSuccess(true) &&
          //   toast.error("Server busy. Try again", {
          //     position: "top-center",
          //   });
        })
        .catch((err) => {
          if (err)
            return toast.error("Something happend. Try again", {
              position: "top-center",
            });
        });
    }
  };

  return (
    <div className="w-full">
      <div className="bg-bellefuWhite p-3 rounded-md border border-[#dfdfdf]">
        <img
          onClick={() => router.push(`/product/${product.slug}`)}
          src={`${productImageUrl}${product.images[0]}`}
          className="rounded-md w-full h-44 object-cover"
        />
        <p className="capitalize text-medium">{product.title}</p>
        <div className="flex items-center space-x-2">
          <MdLocationOn className="w-4 h-4 text-bellefuBlack1" />
          <div className="flex items-center space-x-1">
            <p className="text-bellefuBlack1 text-sm capitalize">
              {product.stateName},
            </p>
            <p className="text-bellefuBlack1 text-sm capitalize">
              {product.country}
            </p>
          </div>
        </div>
        <div className="flex items justify-between">
          <p className="text-bellefuGreen flex font-poppins font-semibold">
            <p
              className="mr-1"
              dangerouslySetInnerHTML={{ __html: details?.defaultCurrency }}
            />
            {product.price}
          </p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="text-[#767873]  capitalize italic text-xs font-medium">
            {product.inStock ? "In stock" : "Out of stock"}
          </p>
          <div
            onClick={() => setOpen(!open)}
            className="relative focus:bg-black/30 focus:rounded-full focus:p-2"
          >
            <BiDotsHorizontalRounded className="text-bellefuOrange" />
          </div>
        </div>
      </div>

      {/* drop down beginning */}
      {open ? (
        <div className="w-full mt-1 bg-bellefuWhite rounded border transition duration-300 ease-in z-40 shadow-lg">
          <ul className="rounded px-2 py-3 space-y-2">
            <div
              onClick={() => {
                setOpen(!open);
                router.push(`/product/${product.slug}`);
              }}
              className="flex items-center space-x-4 mb-2 hover:bg-bellefuBackground px-2 rounded-md py-1"
            >
              <BsFillEyeFill className="w-4 h-4 text-bellefuOrange" />
              <p className="text-xs text-bellefuBlack1 font-normal whitespace-nowrap">
                View Products
              </p>
            </div>
            <li
              onClick={() => {
                setOpen(!open);
                setModalOpen(true);
              }}
              className="px-2 py-1 hover:bg-bellefuBackground flex space-x-3 items-center cursor-pointer rounded"
            >
              <GrEdit className="w-3 h-3 text-[#767873]" />
              <span className="text-xs text-bellefuBlack1">update price</span>
            </li>
            <li
              onClick={() => {
                setOpen(!open);
                setModalEdit(true);
              }}
              className="px-2 py-1 hover:bg-bellefuBackground flex space-x-3 items-center cursor-pointer rounded"
            >
              <FaRegEdit className="w-3 h-3 text-[#767873]" />
              <span className="text-xs text-bellefuBlack1">Edit Product</span>
            </li>

            {product.inStock ? (
              <li
                onClick={handleOut}
                className="px-2 py-1 hover:bg-bellefuBackground flex space-x-3 items-center cursor-pointer rounded"
              >
                <MdOutlineRemoveShoppingCart className="w-3 h-3 text-[#767873]" />
                <span className="text-xs text-bellefuBlack1">
                  Put out of stock
                </span>
              </li>
            ) : (
              <li
                onClick={handleIn}
                className="px-2 py-1 hover:bg-bellefuBackground flex space-x-3 items-center cursor-pointer rounded"
              >
                <FcApproval className="w-3 h-3 text-[#767873]" />
                <span className="text-xs text-bellefuBlack1">Put in stock</span>
              </li>
            )}

            <li
              onClick={() => setDeleteOpen(!deleteOpen)}
              className="px-2 py-1 hover:bg-bellefuBackground flex space-x-3 items-center cursor-pointer rounded"
            >
              <RiDeleteBin6Line className="w-3 h-3 text-[#767873]" />
              <span className="text-xs text-bellefuBlack1">Delete Product</span>
            </li>
          </ul>
        </div>
      ) : null}
      {/* dropdown end */}

      {/* delete Modal */}
      <Modal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        opacity={6}
        // sx={{ marginLeft: 'auto', marginRight: 'auto', width: '100%', justifyContent: 'center', alignItems: 'center' }}
      >
        <Box sx={edit}>
          <div className="flex justify-center items-center">
            {/* <WarningAmberIcon sx={{ fontSize: 50 }} /> */}
            <MdOutlineWarningAmber className="md:text-5xl text-5xl mb-1 md:mb-2" />
          </div>
          <hr className="mb-4 md:mb-3" />

          <p className="p-1 mx-3 mb-2 md:mb-2 ">
            {" "}
            Do you want to delete this Product ?{" "}
          </p>

          <hr className="mb-2 mt-2" />
          <div className="flex mt-3 space-x-20 justify-around">
            <button
              className="bg-gray-300 px-4 py-2 rounded-md shadow  text-white "
              onClick={() => setDeleteOpen(false)}
            >
              <p className="text-xs md:text-[15px]">Cancel</p>
            </button>
            <button
              className="bg-red-600 px-4 py-2 rounded-md shadow  text-white"
              onClick={deleteProduct}
            >
              <p className="text-xs md:text-[15px]">Delete</p>
            </button>
          </div>
        </Box>
      </Modal>
      {/* price modal  */}
      <Modal
        open={modalopen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
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
                disabled={true}
                // onChange={(e) => setProductsName(e.target.value)}
                defaultValue={product.title}
                type="text"
                className="  bg-gray-100 p-[7px] mt-1 focus:ring-bellefuGreen focus:outline-0 block w-full shadow-sm sm:text-sm border-gray-300 border-2 rounded-md"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700 flex-row justify-between">
                <p>price</p>
              </label>
              <input
                onChange={(e) => setPrice(e.target.value)}
                defaultValue={product.price}
                type="number"
                className="  bg-gray-100 p-[7px] mt-1 focus:ring-bellefuGreen focus:outline-0 block w-full shadow-sm sm:text-sm border-gray-300 border-2 rounded-md"
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
              onClick={updatePrice}
            >
              <p className="text-xs text-white md:text-[15px]">save </p>
            </button>
          </div>
        </div>
      </Modal>

      {/* Edit Product Modal */}

      <Modal
        open={modalEdit}
        onClose={() => setModalEdit(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ overflowY: "scroll" }}
      >
        <div
          className="flex flex-col overflow-y-scroll items-center justify-center mx-auto md:mt-20 lg:mt-10 pt-2  rounded-lg shadow-md   bg-bellefuWhite w-[85%] md:w-[50%] lg:w-[60%]"
          // sx={edit}
        >
          <div className="grid grid-cols-6 gap-3  my-5">
            <div className="col-span-8 sm:col-span-3 lg:w-72">
              <label className="block text-sm font-medium text-gray-700 flex-row justify-between">
                <p>Category</p>
              </label>
              <SelectComponent
                defaultName={product.category}
                items={details.categories}
                setValue={setCatValue}
                setSubCat={setSubCat}
              />
              {/* <input
                disabled={true}
                // onChange={(e) => setProductsName(e.target.value)}
                defaultValue={product.title}
                type="text"
                className="  bg-gray-100 p-[7px] mt-1 focus:ring-bellefuGreen focus:outline-0 block w-full shadow-sm sm:text-sm border-gray-300 border-2 rounded-md"
              /> */}
            </div>
            <div className="col-span-8 sm:col-span-3  md:60 lg:w-72">
              <label className="block text-sm font-medium text-gray-700 flex-row justify-between">
                <p>Sub Category</p>
              </label>

              <SelectComponent
                items={subCat}
                setValue={setSubCatValue}
                defaultName={product.subcategory}
                subcatSelect={true}
              />
            </div>
            <div className="col-span-8 sm:col-span-3  md:60 lg:w-72">
              <label className="block text-sm font-medium text-gray-700 flex-row justify-between">
                <p>Country</p>
              </label>

              <CountrySelect />
            </div>
            <div className="col-span-8 sm:col-span-3  md:60 lg:w-72">
              <label className="block text-sm font-medium text-gray-700 flex-row justify-between">
                <p>State</p>
              </label>
              <SelectComponent
                defaultName={"select state"}
                items={details.countryStates}
                setValue={setStateValue}
                state={true}
              />
            </div>
            <div className="col-span-8 sm:col-span-3  md:60 lg:w-72">
              <label className="block text-sm font-medium text-gray-700 flex-row justify-between">
                <p>City</p>
              </label>
              <SelectComponent
                defaultName={"select City"}
                items={cityData}
                setValue={setCityValue}
                state={true}
              />
            </div>
            <div className="col-span-8 sm:col-span-3  md:60 lg:w-72">
              <label className="block text-sm font-medium text-gray-700 flex-row justify-between">
                <p>Location</p>
              </label>
              <input
                onChange={(e) => setLocation(e.target.value)}
                defaultValue={product.stateName}
                type="text"
                className="  bg-gray-100 p-[8px] mt-4 focus:ring-bellefuGreen focus:outline-0 block w-full shadow-sm sm:text-sm border-gray-300 border-2 rounded-md"
              />
            </div>
            <div className="col-span-8 sm:col-span-3  md:60 lg:w-72">
              <label className="block text-sm font-medium text-gray-700 flex-row justify-between">
                <p>Product Name</p>
              </label>
              <input
                onChange={(e) => setProductName(e.target.value)}
                defaultValue={product.title}
                type="text"
                className="  bg-gray-100 p-[7px] mt-1 focus:ring-bellefuGreen focus:outline-0 block w-full shadow-sm sm:text-sm border-gray-300 border-2 rounded-md"
              />
            </div>
            <div className="col-span-8 sm:col-span-3  md:60 lg:w-72">
              <label className="block text-sm font-medium text-gray-700 flex-row justify-between">
                <p>Price</p>
              </label>
              <input
                onChange={(e) => setPrice(e.target.value)}
                defaultValue={product.price}
                type="text"
                className="  bg-gray-100 p-[7px] mt-1 focus:ring-bellefuGreen focus:outline-0 block w-full shadow-sm sm:text-sm border-gray-300 border-2 rounded-md"
              />
            </div>
          </div>
          <div className="w-full px-20 md:px-20 lg:px-[8rem] ">
            <label className="block text-sm font-medium text-gray-700 flex-row justify-between">
              <p>Description</p>
            </label>
            <textarea
              value={des}
              onChange={(e) => setDes(e.target.value)}
              placeholder="Enter description here"
              className="w-full p-3 md:p-3 h-12 md:h-24 border focus:ring-bellefuGreen focus:outline-0
              bg-gray-100"
            />
          </div>

          <small className="text-red-600 my-4 text-center">
            Do not upload image if you do not want
            <br /> to replace the image.
          </small>

          <Dropzone
            onDrop={(acceptedFiles) => {
              for (let i = 0; i < acceptedFiles.length; i++) {
                let looped = acceptedFiles[i];
                let loopedPreview = acceptedFiles[i].name;
                setFile((prev) => [...prev, looped]);
                setPreview((prev) => [...prev, loopedPreview]);
              }
              // setBiz(URL.createObjectURL(acceptedFiles[0]))
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps()}
                className="border-dashed space-y-4 border-2 mx-4 md:mx-10 my-4 md:my-6 flex flex-col border-gray-300 justify-center p-2 md:p-4  items-center "
              >
                <input {...getInputProps()} />
                <p>
                  <BsCloudUpload className="md:text-6xl text-3xl text-gray-600" />
                </p>

                <div className="space-y-3 text-center text-sm md:text-base flex flex-col items-center justify-center">
                  <p>Click here or Drag & drop images here </p>

                  <div>
                    <p>
                      Max file size : <strong className="ml-4">2mb</strong>
                    </p>
                    <p className="mb-10">Accept : jpeg/png</p>
                  </div>
                </div>
              </div>
            )}
          </Dropzone>

          {preview.length !== 0 && (
            <div className="flex flex-col">
              {preview.map((items, idx) => (
                <div className="flex space-x-2">
                  <p>
                    {idx + 1}.{"  "}
                  </p>
                  <p key={idx}>{items}</p>
                </div>
              ))}
            </div>
          )}

          <div className="flex my-4 md:w-[60%] lg:w-[60%] space-x-20 justify-between">
            <button
              className=" bg-gray-400 rounded-md py-2 px-5"
              onClick={() => setModalEdit(false)}
            >
              <p className="text-xs text-white md:text-[15px]">Cancel</p>
            </button>
            <button
              className="bg-bellefuOrange rounded-md py-2 px-5"
              onClick={productEdit}
            >
              <p className="text-xs text-white md:text-[15px]">save </p>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MyAd;
