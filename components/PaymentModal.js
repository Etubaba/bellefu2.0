import { useState, useEffect } from "react";
import { Modal } from "@mui/material";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { useDispatch, useSelector } from "react-redux";
import { productImageUrl, shopApi } from "../constant";
import axios from "axios";
import { toast } from "react-toastify";
import { orderPayment, profileDetails } from "../features/bellefuSlice";

const PaymentModal = ({setShowModal, currentOrderItem, currentOrderItemIndex, orderhistory, setOrderHistory}) => {
  // console.log(currentOrderItem);
  // console.log(currentOrderItemIndex);
  // console.log(orderhistory[currentOrderItemIndex]);
  // const orders = orderhistory;
  // orders[currentOrderItemIndex] = {
  //   ...orders[currentOrderItemIndex],
  //   status: "on transmit",
  // };
  // console.log(orders[currentOrderItemIndex]);
  // console.log(orders)
  //const [paymentRes, setPaymentRes] = useState(null);
  //const [cartList, setCartList] = useState([]);
  //const [modalopen, setModalOpen] = useState(false);
  const [gateway, setGateway] = useState(null);

  const userData = useSelector(profileDetails);
  // const priceSum = cartList?.reduce((acc, curr) => {
  //   acc += curr.price * curr.quantity;
  //   return acc;
  // }, 0);
  // const shippingFee = 200;
  // const totalPrice = priceSum + shippingFee;
  const userFullName = userData?.first_name + "  " + userData?.last_name;
  const userEmail = userData?.email;
  const phone = userData?.phone;
  const {currency_code, orderItemId, price, product_quantity: quantity, shipping, userId} = currentOrderItem;

  //const parser = new DOMParser();
  //const doc = parser.parseFromString(currency, "text/html");
  //const currencyCode = doc.body.firstChild.textContent;
  //console.log(doc.body.firstChild.textContent);
  //const currencyCode = userData?.currency_code;
  // console.log(phone);
  // console.log(price)
  // console.log(product_quantity);
  // console.log(quantity)

  const config = {
    public_key: "FLWPUBK_TEST-d5182b3aba8527eb31fd5807e15bf23b-X",
    tx_ref: Date.now(),
    amount: price*quantity,
    // amount: 999,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: userEmail,
      phonenumber: phone,
      name: userFullName,
    },
    customizations: {
      title: "Payment for your order",
      description: "Payment for items in your cart",
      logo: "https://www.linkpicture.com/q/bellefuApplogo.jpg",
    },
  };

  //const cartId = cartList.length > 0 ? cartList?.map((item) => item.cartId) : [];
  const handleFlutterPayment = useFlutterwave(config);
  const OnPaymentSuccess = (res) => {
    // console.log(gateway);
    // console.log(res);
    // console.log(res.transaction_id)

    axios.post(`${shopApi}update/order/item`, {
      orderItemId,
      actor: "buyer",
      gateway: "flutterwave",
      transactionId: res.transaction_id,
      totalAmount: price * quantity,
      userId: userId,
      shipping: "200"
    })
    .then((res) => {
      if (res.data.status) {
        const orders = orderhistory;
        // console.log(orders);
        // console.log(currentOrderItem);
        // console.log(currentOrderItemIndex);
        // console.log(orders[currentOrderItemIndex]);
        orders[currentOrderItemIndex] = {
          ...orders[currentOrderItemIndex],
          status: "ordered",
        };
        console.log(orders[currentOrderItemIndex]);
        console.log(orders);
        setOrderHistory(orders);
      }
    })
    .catch(error => {
      console.log(`Error reaching server after payment due to: ${error.message}`)
    })
  }

  // useEffect(() => {
  //   const getCart = async () => {
  //     await axios
  //       .get(`${shopApi}list/cart/item/${userData?.id}`)
  //       .then((res) => setCartList(res.data.data));
  //   };
  //   getCart();
  // }, []);

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 modal-bg z-50" onClick={() => setShowModal(false)}>
      <div className="w-1/2 mx-auto mt-52 relative">
        <div className="mb-6 absolute -right-8 -top-8 w-6 h-6 bg-white rounded-full border-2">
          <span className="-mt-12 -ml-1.5 inline-block hover:cursor-pointer text-lg p-2" onClick={() => setShowModal(false)}><strong className="text-bellefuOrange">&#10006;</strong></span>
        </div>
        <div className="bg-white px-6 py-8 rounded-lg">
          <div className="bg-slate-500 py-3 mt-3 lg:mt-0">
            <section className="pl-3 py-2">
              <h2 className="font-semibold text-sm md:text-base font-poppins text-white">
                Make Payment
              </h2>
            </section>
            <hr />
            <section className="px-3 py-2 mt-6">
              <div className=" justify-center items-center flex flex-col space-y-5 md:space-y-0 md:flex-row">
                <div className="md:mr-auto">
                  <button
                    onClick={(evt) => {
                      evt.stopPropagation();
                      setGateway("flutterwave");
                      
                      handleFlutterPayment({
                        callback: (response) => {
                          //setPaymentRes(response);
                          console.log(response);
                          closePaymentModal();
                          setShowModal(false);
                          //setPrice(null);
                          if (response.status === "successful") {
                            //dispatch(orderPayment(true));
                            OnPaymentSuccess(response)
                            toast.success("Payment Successful");
                          }
                          // this will close the modal programmatically
                        },
                        onClose: () => {},
                      });
                    }}
                    className="flex items-center outline outline-bellefuOrange rounded-lg px-3 py-2"
                  >
                    <img src="/card.png" className="w-40" alt="visa card" />
                    {/* <span className="pl-4 md:text-base text-sm">Pay with Card</span> */}
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => setGateway("paypal")}
                    className="flex items-center outline outline-gray-200 rounded-lg px-3 "
                  >
                    <img
                      src="/Paypal.png"
                      className="w-40"
                      alt="paypl card"
                    />
                    {/* <span className="pl-4 md:text-base text-sm">Pay with Paypal</span> */}
                  </button>
                </div>
              </div>
              {/* {cartPath !== "" && (
                <div>
                  <div className="mb-4 mt-12">
                    <p className="mb-2">
                      <label
                        htmlFor="card-no"
                        className="font-semibold md:text-base text-sm"
                      >
                        Address
                      </label>
                    </p>
                    <p>
                      <input
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                        type="text"
                        id="card-no"
                        className="w-full rounded-xl py-3 pl-5 outline outline-gray-300 focus:outline-bellefuOrange"
                      />
                    </p>
                  </div>
                  <div className="mb-4">
                    <p className="mb-2">
                      <label
                        htmlFor="card-no"
                        className="font-semibold md:text-base text-sm"
                      >
                        City
                      </label>
                    </p>
                    <p>
                      <input
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        type="text"
                        id="card-no"
                        className="w-full rounded-xl py-3 pl-5 outline outline-gray-300 focus:outline-bellefuOrange"
                      />
                    </p>
                  </div>
                  <div className="mb-4">
                    <p className="mb-2">
                      <label
                        htmlFor="card-no"
                        className="font-semibold md:text-base text-sm"
                      >
                        State
                      </label>
                    </p>
                    <p>
                      <input
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        type="text"
                        id="card-no"
                        className="w-full rounded-xl py-3 pl-5 outline outline-gray-300 focus:outline-bellefuOrange"
                      />
                    </p>
                  </div>
                  <div className="mb-4">
                    <p className="mb-2">
                      <label
                        htmlFor="card-no"
                        className="font-semibold md:text-base text-sm"
                      >
                        Zip Code
                      </label>
                    </p>
                    <p>
                      <input
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        type="text"
                        id="card-no"
                        className="w-full rounded-xl py-3 pl-5 outline outline-gray-300 focus:outline-bellefuOrange"
                      />
                    </p>
                  </div>
                  <div className="mb-4">
                    <p className="mb-2">
                      <label
                        htmlFor="card-no"
                        className="font-semibold md:text-base text-sm"
                      >
                        Country
                      </label>
                    </p>
                    <p>
                      <input
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        type="text"
                        id="card-no"
                        className="w-full rounded-xl py-3 pl-5 outline outline-gray-300 focus:outline-bellefuOrange"
                      />
                    </p>
                  </div>
                  <div className="mb-4">
                    <p className="mb-2">
                      <label
                        htmlFor="card-no"
                        className="font-semibold md:text-base text-sm"
                      >
                        Phone Number
                      </label>
                    </p>
                    <p>
                      <input
                        placeholder="e.g +2348168776544"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        type="text"
                        id="card-no"
                        className="w-full  rounded-xl py-3 pl-5 outline outline-gray-300 focus:outline-bellefuOrange"
                      />
                    </p>
                  </div>
                </div>
              )} */}
              {/* <Modal
                open={modalopen}
                onClose={() => setModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <div
                  className="flex flex-col items-center justify-center mx-auto mt-52 pt-2  rounded-lg shadow-md   bg-bellefuWhite w-[80%] md:w-[60%] lg:w-[40%]"
                  // sx={edit}
                >
                  <div className="flex justify-center items-center">
                    <IoMdCheckmarkCircleOutline className="md:text-8xl text-bellefuGreen text-6xl mt-4 md:mb-3" />
                  </div>

                  <h1 className=" font-semibold leading-10 my-4 text-center text-3xl">
                    Congratulation!!!
                  </h1>

                  <p className="p-1 mx-3 mb-2 md:mb-6 text-center ">
                    {" "}
                    Your order has been placed successfully. Please, check
                    your email for order confirmation before proceeding to
                    payment.
                  </p>
                </div>
              </Modal>
              {cartPath !== "" && (
                <div className="mt-14 flex items-end justify-end">
                  <button
                    onClick={handleOrder}
                    className="md:px-28 text-white rounded-xl bg-bellefuOrange hover:bg-orange-500 md:py-2 px-16 py-4"
                  >
                    Place Order
                  </button>
                </div>
              )} */}
            </section>
          </div>
        </div>
      </div>
   
    </div>
  )
}

export default PaymentModal;