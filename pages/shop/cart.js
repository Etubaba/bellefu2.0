import React, { useEffect, useState } from "react";
import { MdKeyboardBackspace } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsFillCartXFill, BsCartFill } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import { GiShoppingCart } from "react-icons/gi";
import { useSelector, useDispatch } from "react-redux";
import Loader, { productImageUrl } from "../../constant";
import { shopApi } from "../../constant";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";
import {
  profileDetails,
  favUpdated,
  prevPath,
} from "../../features/bellefuSlice";

function Cart() {
  const [cartProduct, setCartProduct] = useState(null);
  const [cartList, setCartList] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const userId = useSelector(profileDetails);
  const cartCheck = useSelector((state) => state.bellefu?.favLoad);

  const router = useRouter();

  if (loading) {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }

  const clearCart = (e) => {
    e.stopPropagation();
    axios
      .post(`${shopApi}clear/user/cart`, { userId: userId?.id })
      .then((res) => {
        if (res.data.status) {
          setQty((prev) => prev + 1);
          dispatch(favUpdated());
          toast.info("All Cart Items have been cleared");
        }
      });
  };

  useEffect(() => {
    const getCart = async () => {
      await axios
        .get(`${shopApi}list/cart/item/${userId.id}`)
        .then((res) => setCartList(res.data.data));
    };
    getCart();
  }, [cartCheck]);

  const currentPath = router.pathname;

  const priceSum = cartList?.reduce((acc, curr) => {
    acc += curr.price * curr.quantity;
    return acc;
  }, 0);
  return (
    <div className="max-w-5xl mx-auto mt-32">
      <div className="flex justify-between mt-5">
        <p className="flex  text-[#817181] mt-1 space-x-1">
          <MdKeyboardBackspace className="mt-1 text-xs  md:text-lg" />{" "}
          <span className="text-xs md:text-lg">Back</span>
        </p>
        {cartList.length !== 0 ? (
          <span
            onClick={clearCart}
            className="text-xs flex space-x-2 hover:text-red-500  cursor-pointer md:text-lg text-red-600"
          >
            <BsFillCartXFill className="mt-1 text-xs  md:text-lg" />
            <p className="text-xs md:text-lg">Clear Cart</p>
          </span>
        ) : (
          <span className="text-xs flex space-x-2 hover:text-crystamolPink  md:text-lg text-[#817181]">
            <BsCartFill className="mt-1 text-xs  md:text-lg" />
            <p className="text-xs md:text-lg">Cart</p>
          </span>
        )}
      </div>

      <div className="w-full bg-bellefuWhite my-5 py-1 rounded-2xl h-auto">
        {/* cart items  */}
        {cartList.length === 0 ? (
          <div className="h-full px-2 lg:px-0 ">
            <div className="border mx-auto mt-2 lg:my-5 rounded-xl w-full lg:w-7/12 h-11/12 ">
              <div className="flex flex-col justify-center mt-24 mb-24 items-center">
                <GiShoppingCart className="text-7xl lg:text-9xl mb-5 text-gray-600" />
                <p className="text-sm capitalize lg:text-lg text-gray-600 px-2 text-center">
                  You do not have any product on your cart
                </p>

                <button
                  onClick={() => router.push("/shops")}
                  className="py-1 lg:py-3 hover:bg-orange-400 mt-16 px-8 lg:px-12 rounded-full bg-bellefuOrange text-white text-sm lg:text-lg"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {cartList?.map((cart, index) => (
              <div key={index}>
                <div className="flex my-5 ml-5 justify-between ">
                  <div className="flex ">
                    <img
                      alt="eeee"
                      src={`${productImageUrl}${cart?.images[0]}`}
                      className="object-fill w-36 h-32 md:w-44 mr-5 md:h-36 rounded-md"
                    />
                    <div className="flex flex-col space-y-2 ">
                      <h3 className="text-md   md:text-2xl md:mb-16 mb-2">
                        {cart?.title.charAt(0).toUpperCase() +
                          cart?.title.slice(1)}
                      </h3>

                      {/* <p className='md:mb-14   text-xs   md:text-lg '>
                                                {cart?.sizeType.charAt(0).toUpperCase() + cart?.sizeType.slice(1)}
                                                {' '}size</p> */}

                      <div className="text-crystamolPrice inline-block md:hidden mb-1  text-lg md:text-3xl font-semibold">
                        <span className="flex">
                          <p>${cart.price * cart.quantity}</p>
                        </span>
                      </div>
                      <div className="md:hidden inline-block">
                        <div className="bg-bellefuBackground flex rounded-lg h-8 w-20  p-2 space-x-3 justify-center items-center ">
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              const item = cartList.find(
                                (item) => item.cartId === cart.cartId
                              );
                              console.log("cart", item);
                              item.quantity += 1;
                              setCartList((prev) => [...prev]);

                              axios
                                .post(`${shopApi}update/cart/quantity`, {
                                  cartId: cart.cartId,
                                  qty: item.quantity,
                                })
                                .then((res) => {
                                  if (res.data.status) {
                                    setQty((prev) => prev + 1);
                                  }
                                });
                            }}
                            className="text-xl cursor-pointer -mt-1 hover:text-crystamolPink"
                          >
                            +
                          </span>

                          <span className="bg-white cursor-pointer px-2 my-1 rounded-md ">
                            {cart.quantity}
                          </span>

                          <span
                            onClick={(e) => {
                              if (cart.quantity > 1) {
                                e.stopPropagation();
                                const item = cartList.find(
                                  (item) => item.cartId === cart.cartId
                                );
                                item.quantity -= 1;
                                setCartList((prev) => [...prev]);

                                axios
                                  .post(`${shopApi}update/cart/quantity`, {
                                    cartId: cart.cartId,
                                    qty: item.quantity,
                                  })
                                  .then((res) => {
                                    if (res.data.status) {
                                      setQty((prev) => prev + 1);
                                    }
                                  });
                              }
                            }}
                            className="text-2xl hover:text-crystamolPink -mt-2"
                          >
                            -
                          </span>
                        </div>
                      </div>
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          // setCartProduct(cart.productName)
                          // removeItem()
                          axios
                            .post(`${shopApi}remove/cart/item`, {
                              cartId: cart.cartId,
                            })
                            .then((res) => {
                              if (res.data.status) {
                                setQty((prev) => prev + 1);
                                dispatch(favUpdated());
                                toast.info(
                                  `${cart.title} has been removed from cart`
                                );
                              }
                            });
                        }}
                        className="cursor-pointer flex mt-10 hover:text-orange-400 space-x-2 text-[#FF5F00]"
                      >
                        <RiDeleteBin6Line className="text-md md:text-lg" />
                        <span className="text-xs md:text-md">
                          Remove from cart
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="hidden md:inline-block">
                    <div
                      // onMouseLeave={}
                      className="bg-bellefuBackground flex rounded-lg h-10 w-24 mt-10 p-2 space-x-3 justify-center items-center "
                    >
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          const item = cartList.find(
                            (item) => item.cartId === cart.cartId
                          );
                          console.log("cart", item);
                          item.quantity += 1;
                          setCartList((prev) => [...prev]);

                          axios
                            .post(`${shopApi}update/cart/quantity`, {
                              cartId: cart.cartId,
                              qty: item.quantity,
                            })
                            .then((res) => {
                              if (res.data.status) {
                                setQty((prev) => prev + 1);
                              }
                            });
                        }}
                        className="text-xl cursor-pointer -mt-1 hover:text-crystamolPink"
                      >
                        +
                      </span>

                      <span className="bg-white px-2 my-1 rounded-md ">
                        {cart.quantity}
                      </span>

                      <span
                        onClick={() => {
                          if (cart.quantity > 1) {
                            const item = cartList.find(
                              (item) => item.cartId === cart.cartId
                            );
                            item.quantity -= 1;
                            setCartList((prev) => [...prev]);

                            axios
                              .post(`${shopApi}update/cart/quantity`, {
                                cartId: cart.cartId,
                                qty: item.quantity,
                              })
                              .then((res) => {
                                if (res.data.status) {
                                  setQty((prev) => prev + 1);
                                }
                              });
                          }
                        }}
                        className="text-2xl cursor-pointer hover:text-crystamolPink -mt-2"
                      >
                        -
                      </span>
                    </div>
                  </div>
                  <div className="text-bellefuGreen hidden md:inline-block mr-5 mt-10 text-lg md:text-3xl font-semibold">
                    <span className="flex">
                      <p>${cart.price * cart.quantity}</p>
                    </span>
                  </div>
                </div>
                <hr />
              </div>
            ))}

            {loading && <Loader isLoading={loading} />}

            {/* cart  prices */}

            <div className="m-5 space-y-10">
              <div className="flex justify-between text-sm md:text-lg ">
                <p>Subtotal</p>

                <span className="flex">
                  <p>${priceSum}</p>
                </span>
              </div>
              <div className="flex justify-between text-lg ">
                <p>Shipping</p>
                <p>200</p>
              </div>
              <div className="flex justify-between text-xl font-semibold">
                <p>Total</p>
                <span className="flex">
                  <p>${priceSum + 200}</p>
                </span>
              </div>
            </div>

            <hr />

            {/* checkout button */}

            <div className="flex justify-center m-4 md:justify-end md:m-10">
              <button
                onClick={() => {
                  router.push("/shop/checkout");
                  setLoading(true);
                  dispatch(prevPath(`${currentPath}`));
                }}
                className="bg-bellefuOrange hover:bg-orange-500 py-3 px-10 md:px-28 md:py-4 text-white flex rounded-full "
              >
                <span>Procceed to Checkout</span>{" "}
                <IoIosArrowForward className="mt-1 ml-2" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
