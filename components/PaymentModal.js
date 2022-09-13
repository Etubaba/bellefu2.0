import { useState } from "react";
//import { Modal } from "@mui/material";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useDispatch, useSelector } from "react-redux";
import { productImageUrl, shopApi } from "../constant";
import axios from "axios";
import { toast } from "react-toastify";
import { orderPayment, profileDetails } from "../features/bellefuSlice";

const PaymentModal = ({
  setShowModal,
  currentOrderItem,
  currentOrderItemIndex,
  orderhistory,
  setOrderHistory,
}) => {
  const [gateway, setGateway] = useState(null);
  const [showPaypal, setShowPaypal] = useState(false);
  const userData = useSelector(profileDetails);
  const userFullName = userData?.first_name + "  " + userData?.last_name;
  const userEmail = userData?.email;
  const phone = userData?.phone;
  const {
    currency_code,
    orderItemId,
    price,
    product_quantity: quantity,
    shipping,
    userId,
  } = currentOrderItem;
  const config = {
    public_key: "FLWPUBK_TEST-d5182b3aba8527eb31fd5807e15bf23b-X",
    tx_ref: Date.now(),
    amount: price * quantity,
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

  const handleFlutterPayment = useFlutterwave(config);
  const onPaymentSuccess = async (res) => {
    await axios
      .post(`${shopApi}update/order/item`, {
        orderItemId,
        actor: "buyer",
        gateway: "flutterwave",
        transactionId: gateway === "paypal" ? res.id : res.transaction_id,
        totalAmount: price * quantity,
        userId: userId,
        shipping: 200,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status) {
          const orders = orderhistory;
          orders[currentOrderItemIndex] = {
            ...orders[currentOrderItemIndex],
            status: "ordered",
          };

          setOrderHistory(orders);
        }
      })
      .catch((error) => {
        console.log(
          `Error reaching server after payment due to: ${error.message}`
        );
      });
  };

  const createOrder = async (data, actions) => {
    // await totalPrice
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: price * quantity,
            // value: "5",
          },
        },
      ],
    });
  };

  return (
    <div
      className="fixed overflow-auto top-0 bottom-0 left-0 right-0 modal-bg z-50"
      onClick={() => setShowModal(false)}
    >
      <div className="w-1/2 mx-auto mt-52 relative">
        <div className="mb-6 absolute -right-8 -top-8 w-6 h-6 bg-white rounded-full border-2">
          <span
            className="-mt-12 -ml-1.5 inline-block hover:cursor-pointer text-lg p-2"
            onClick={() => setShowModal(false)}
          >
            <strong className="text-bellefuOrange">&#10006;</strong>
          </span>
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
                        callback: async (response) => {
                          //setPaymentRes(response);
                          //console.log(response);
                          closePaymentModal();
                          setShowModal(false);
                          //setPrice(null);
                          if (response.status === "successful") {
                            //dispatch(orderPayment(true));
                            await onPaymentSuccess(response);
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
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowPaypal(true);
                    }}
                    className="flex items-center outline outline-gray-200 rounded-lg px-3 "
                  >
                    <img src="/Paypal.png" className="w-40" alt="paypl card" />
                  </button>
                </div>
              </div>

              {showPaypal && (
                <div className="flex justify-center mt-7 items-center">
                  <PayPalButtons
                    createOrder={(data, actions) => createOrder(data, actions)}
                    onApprove={async (data, actions) => {
                      return actions.order.capture().then(async (details) => {
                        setGateway("paypal");
                        if (details.status == "COMPLETED") {
                          toast.success("Payment completed successfully", {
                            position: "top-right",
                          });

                          await onPaymentSuccess(details);
                        }
                      });
                    }}
                    // onApprove={(data, actions) => onApprove(data, actions)}
                  />
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
