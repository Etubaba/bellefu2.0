import React, { useEffect, useState, useRef } from "react";
import Layout from "../../components/Layout";
import { FaEye } from "react-icons/fa";
import { Modal, Fade, Box, Backdrop, Alert } from "@mui/material";
import { IoMdCall, IoWarningOutline } from "react-icons/io";
import { BsCheck2All } from "react-icons/bs";
import { MdDeleteForever, MdSend, MdClose } from "react-icons/md";
import { FcVideoCall, FcSms } from "react-icons/fc";
import { MdOutlineCancel } from "react-icons/md";
import { AiOutlinePaperClip } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { apiData, imageBaseUrl, UserAvataUrl } from "../../constant";
import { toast } from "react-toastify";
import axios from "axios";
import Dropzone from "react-dropzone";

import moment from "moment";
import { chatting, msgRead } from "../../features/bellefuSlice";
import Skeleton from "@mui/material/Skeleton";

import Pusher from "pusher-js";
import { useRouter } from "next/router";

const messages = ({ data1 }) => {
  const [read, setRead] = useState(false);
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(undefined);
  const [preview, setPreview] = useState();
  const [contact, setContact] = useState([]);
  const [chat, setChat] = useState([]);
  const [fname, setFname] = useState(null);
  const [lname, setLname] = useState(null);
  const [dp, setDp] = useState(null);
  const [receiverId, setReceiverId] = useState(null);
  const [sent, setSent] = useState(0);
  const [unread, setUnread] = useState(0);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [noteModal, setNoteModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [attachments, setAttachments] = useState(null);
  const [refetch, setRefetch] = useState(0);
  const [msgCheck, setMsgCheck] = useState(0);
  const [notifyMsg, setNotifyMsg] = useState("");
  const [notifyType, setNotifyType] = useState("");
  const [from, setFrom] = useState("");

  const theRef = useRef();
  const router = useRouter();

  const senderId = useSelector((state) => state.bellefu?.profileDetails?.id);
  const pusher = useSelector((state) => state.bellefu?.pusher);

  const checkRead = useDispatch();
  const currentPath = router.pathname;
  const test = 639;
  // handle message sent

  const handleMessage = (e) => {
    // e.preventDefault();
    setSent((prev) => prev + 1);
    if ((message !== "" || file !== undefined) && read) {
      const formData = new FormData();
      formData.append("messageTo", receiverId);
      formData.append("messageFrom", senderId);
      formData.append("image", file !== undefined ? file : "");
      formData.append("message", message);
      axios({
        method: "POST",
        url: `${apiData}send/messages`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((res) => {
        console.log(res);
        if (res.data.status) {
          setMessage("");
          setFile(undefined);
        }
      });
    }
  };

  // get contact list
  useEffect(() => {
    const getMessages = async () => {
      await axios
        .get(`${apiData}get/user/messages/${senderId}`)
        .then((res) => setContact(res.data.data));
    };

    getMessages();
  }, [pusher]);

  // get chat between two people

  useEffect(() => {
    const getChat = async () => {
      // senderId/receiverId
      await axios
        .get(`${apiData}single/contact/${senderId}/${receiverId}`)
        .then((res) => {
          setChat(res.data.data);
        });
    };

    getChat();
  }, [msgCheck, refetch, receiverId, sent]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  useEffect(() => {
    theRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [read, chat]);

  // change from unread to seen message

  // check if message sent or received is today

  function isToday(dateParameter) {
    const today = new Date();

    return (
      dateParameter.getDate() == today.getDate() &&
      dateParameter.getMonth() == today.getMonth() &&
      dateParameter.getFullYear() == today.getFullYear()
    );
  }

  if (noteModal) {
    setTimeout(() => {
      setNoteModal(!noteModal);
    }, 10000);
  }

  //const channelName = `graceful${senderId}${receiverId}`;

  return (
    // the message header
    <div
      onKeyPress={(e) => e.key == "Enter" && handleMessage()}
      className="w-full md:mt-3  rounded-lg lg:mt-5 bg-bellefuWhite h-auto md:w-auto  pb-2 "
    >
      {noteModal && (
        <div
          onClick={() => {
            if (notifyType === "chat") router.push("/users/messages");
            if (notifyType === "notification")
              router.push("/users/notification");
            setModalOpen(false);
          }}
          className="w-auto top-32 ml-10 animate-slide-in flex absolute justify-end items-end"
        >
          <Alert variant="filled" severity="success">
            <p>
              {from} :{"   "}{" "}
              {notifyMsg.charAt(0).toLocaleUpperCase() + notifyMsg.slice(1)}.
            </p>
          </Alert>
        </div>
      )}
      {loading ? (
        <div className="flex items-center  text-center p-3">
          <div className="text-xl ">Messages</div>
        </div>
      ) : (
        <Skeleton
          className="rounded mt-6 "
          variant="rectangular"
          animation="wave"
          width={"100%"}
          height={30}
        />
      )}
      <hr />

      {!read && contact.length === 0 && (
        <div className="h-full px-2 ">
          <div className=" md:border mx-auto my-10 rounded-xl w-full lg:w-7/12 h-11/12 ">
            <div className="flex flex-col justify-center mt-24 mb-24 items-center">
              <FcSms className="text-5xl lg:text-6xl mb-5 text-gray-600" />
              <p className="text-sm capitalize lg:text-lg text-gray-600 text-center px-2">
                You do not have any messages yet
              </p>
            </div>
          </div>
        </div>
      )}

      {/* message contents 1 */}
      {!read && contact.length > 0 && (
        <div>
          {contact?.map((item, index) => (
            <div
              onClick={() => {
                setFname(item.first_name);
                setReceiverId(item.id);
                setUnread(item.unread);
                setLname(item.last_name);
                setDp(item.avatar);
                setRead(!read);
                setPhone(item.phone);
                checkRead(chatting(item.id));
                localStorage.setItem("chatwith", item.id);
                // const pusher = new Pusher("cef6262983ec85583b4b", {
                //   cluster: "eu",
                // });
                // var channel = pusher.subscribe(`${channelName}`);
                var channel = pusher?.subscribe(`notification${senderId}`);
                channel?.bind("notification", function (data) {
                  // alert(JSON.stringify(data));

                  setFrom(data.data.from);
                  setNotifyType(data.data.type);
                  setNotifyMsg(data.data.message);

                  if (data.data.type === "chat")
                    setMsgCheck((prev) => (prev !== data ? data : 0));
                  if (
                    data.data.type === "chat" &&
                    data.data.userid == item.id
                    // && currentPath === "/users/messages"
                  ) {
                    return;
                  } else {
                    setNoteModal(true);
                  }
                });

                if (item.unread > 0) {
                  axios
                    .post(`${apiData}update/seen/status`, {
                      receiverId: item.id,
                      userId: senderId,
                    })
                    .then((res) => console.log(res.data))
                    .catch((err) => console.log("wahala =>", err));

                  checkRead(msgRead());
                }
              }}
              key={index}
              className="p-2  mx-auto w-full  lg:w-[93%] lg:p-5 my-3 md:my-5 border-b md:border md:rounded-lg hover:bg-[#F9FDF5]  h-auto"
            >
              <div className="flex">
                <img
                  src={`${UserAvataUrl}${item.avatar}`}
                  // src={`https://bellefu.inmotionhub.xyz/get/user/images/${item.avatar}`}
                  className="lg:w-20 lg:h-20 mt-2 mr-3 lg:mr-10 rounded-full w-10 h-10"
                  alt="Bellefu"
                />
                <div className="w-full m-1 lg:mt-3">
                  <span className="flex w-full   mb-1 justify-between">
                    <strong className="flex-1 text-sm md:text-lg">
                      {item.first_name} {item.last_name}
                    </strong>
                    {item.unread > 0 ? (
                      <div className="flex h-5 w-5  md:h-6 md:w-6 items-center lg:mr-0 mr-2 rounded-full justify-center bg-bellefuGreen">
                        <span className=" text-xs lg:text-sm   justify-end text-white ">
                          {item.unread}
                        </span>
                      </div>
                    ) : null}
                  </span>

                  <p className="text-[#3F3F3F] mb:1 md:mb-3 text-xs md:text-base truncate">
                    {item.message.body}
                  </p>

                  <p className="text-[#9799AB] text-xs md:text-sm">
                    {/* {moment(item.message.chattime).startOf('day').fromNow()} */}
                    {isToday(new Date(item.message.chattime))
                      ? moment(item.message.chattime).format("LT")
                      : moment(item.message.chattime).format("ll")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Open message to reply */}

      {read && (
        <div className="lg:w-[93%] w-full md:px-0  my-3  md:my-5 px-2  rounded-lg mx-auto md:border h-auto ">
          <div className="sticky z-30 top-0">
            <div className="flex md:flex-row   flex-col md:justify-between md:space-x-40 md:items-center bg-[#F9FDF5] px-2 p-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    // src="https://bellefu.inmotionhub.xyz/get/user/images/useravatar.jpg"
                    src={`${UserAvataUrl}${dp}`}
                    alt="error"
                    className="md:w-12 md:h-12 object-fill w-8 h-8 rounded-full mr-4 "
                  />
                  <span className="flex text-sm  md:text-xl space-x-2">
                    <strong>{fname}</strong>
                    <strong>{lname}</strong>
                  </span>
                </div>
                <div className=" md:hidden flex items-center space-x-5 ">
                  <div onClick={() => window.open(`tel:${phone}`)}>
                    <IoMdCall className="text-xl text-bellefuGreen " />{" "}
                  </div>
                  <div
                    onClick={() => {
                      setRead(false);
                      checkRead(chatting(null));
                    }}
                  >
                    <MdOutlineCancel className="text-xl  text-bellefuOrange " />
                  </div>
                </div>
              </div>
              <div className="md:inline-block hidden">
                <div className="flex  items-center justify-around m-5 ">
                  <div
                    onClick={() => window.open(`tel:${phone}`)}
                    className="rounded-lg flex border px-3 mr-3 p-1"
                  >
                    <IoMdCall className="text-xl mr-2" /> Call
                  </div>
                  <div
                    onClick={() => setModalOpen(true)}
                    className="rounded-lg flex border space-x-2 px-4 p-1 mr-10"
                  >
                    <FcVideoCall className="text-2xl mr-2" /> Video{" "}
                    <span>call</span>
                  </div>
                  <div onClick={() => setRead(false)}>
                    <MdOutlineCancel className="text-3xl  text-bellefuOrange " />
                  </div>
                </div>
              </div>
            </div>
            <hr />
          </div>
          <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            // sx={{ marginLeft: 'auto', marginRight: 'auto', width: '100%', justifyContent: 'center', alignItems: 'center' }}
          >
            <div
              className="flex flex-col items-center justify-center mx-auto mt-52 pt-2  rounded-lg shadow-md   bg-bellefuWhite w-[80%] md:w-[60%] lg:w-[40%]"
              // sx={edit}
            >
              <div className="flex justify-center items-center">
                {/* <WarningAmberIcon sx={{ fontSize: 50 }} /> */}
                <FcVideoCall className="md:text-8xl  text-6xl mt-4 md:mb-3" />
              </div>
              <p className="p-1 mx-3 mb-2 md:mb-6 text-center ">
                {" "}
                Download our mobile application to be able to use this service.
              </p>
              <div className=" flex mb-7">
                <a
                  target="_blank"
                  href="https://play.google.com/store/apps/details?id=com.bellefu_farmers_market.bellefu"
                >
                  <img
                    alt="error"
                    src="https://www.linkpicture.com/q/play-removebg-preview-1.png"
                    className="w-40 h-10 mr-6"
                  />
                </a>
                <a
                  target="_blank"
                  href="https://apps.apple.com/us/app/bellefu/id1556135856"
                >
                  <img
                    alt="error"
                    src="https://www.linkpicture.com/q/ios-removebg-preview.png"
                    className="w-40 h-10"
                  />
                </a>
              </div>
            </div>
          </Modal>

          <div className="md:h-80 h-72 p-5 overflow-y-scroll    bg-[#F9FDF5] ">
            <ul className="space-y-2">
              {chat?.map((item, index) => (
                <div key={index} className="block ">
                  <li
                    className={
                      item.from_id !== senderId
                        ? "flex justify-start"
                        : "flex justify-end"
                    }
                  >
                    {item.attachment === null ? (
                      <div
                        className={
                          item.from_id !== senderId
                            ? "after:content-[''] after:absolute after:right-[100%] after:top-[0] after:border-l-gray-100  relative max-w-xl mb-4 px-4 py-2 md:px-5 md:py-4 text-gray-700 bg-gray-100 rounded shadow"
                            : "relative max-w-xl mb-4 px-4 py-2 md:px-5 md:py-4 text-gray-100 bg-bellefuGreen rounded shadow"
                        }
                      >
                        <div className="block">
                          <span className="block text-sm md:text-lg">
                            {item.body}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => {
                          setAttachments(item.attachment);
                          setModal(true);
                        }}
                        className={
                          item.from_id !== senderId
                            ? "after:content-[''] after:absolute after:right-[100%] after:top-[0] after:border-l-gray-100  relative max-w-xl mb-4 px-2 py-1 md:px-4 md:py-2 text-gray-700 hover:bg-gray-200 bg-gray-100 rounded shadow"
                            : "relative max-w-xl mb-4 px-1 py-1 md:px-4 md:py-2 text-gray-100 hover:bg-[#4CAF50] bg-bellefuGreen rounded shadow"
                        }
                      >
                        <img
                          src={`${imageBaseUrl}get/chat/image/${item.attachment}`}
                          alt="error"
                          className=" md:w-52 md:h-64 w-48 h-52 object-fill rounded-md"
                        />
                      </div>
                    )}
                  </li>
                  <span
                    className={
                      item.from_id !== senderId
                        ? "flex justify-start text-xs text-gray-400 mt-[-16px]"
                        : "text-gray-400 flex mt-[-16px] justify-end text-xs"
                    }
                  >
                    <span>
                      {" "}
                      {isToday(new Date(item.created_at))
                        ? moment(item.created_at).format("LT")
                        : moment(item.created_at).format("ll")}
                    </span>
                    <span>
                      {" "}
                      {item.from_id === senderId && item.seen ? (
                        <div className=" text-[#9799AB] text-xs ">
                          <FaEye className=" text-xm mt-1 ml-1" />
                        </div>
                      ) : null}
                    </span>
                  </span>
                  {/* <div ref={theRef} ></div> */}
                </div>
              ))}
            </ul>
            <div ref={theRef} />
          </div>
          <div className="">
            {file !== undefined && read && (
              <div className=" rounded-t-lg flex bg-[#F9FDF5] pl-3 pb-1">
                <img
                  className="md:w-32 md:h-32 w-24 h-24 object-cover rounded-md"
                  src={preview}
                  alt="???"
                />
                <span
                  onClick={() => setFile(undefined)}
                  className="bg-red-600 h-6 w-6 flex items-center justify-center rounded-full -ml-3 -mt-2"
                >
                  {" "}
                  <MdClose className="text-white text-xl" />
                </span>
              </div>
            )}
            <div className="flex items-center justify-between p-3 border-t border-gray-300">
              <Dropzone
                onDrop={(acceptedFiles) => {
                  for (let i = 0; i < acceptedFiles.length; i++) {
                    let loopedfile = acceptedFiles[i];
                    setFile(loopedfile);
                  }
                  setPreview(URL.createObjectURL(acceptedFiles[0]));
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <button
                    // onClick={handleFile}
                    {...getRootProps()}
                  >
                    <input {...getInputProps()} />
                    <AiOutlinePaperClip className="w-6 h-6 text-3xl text-gray-500 hover:text-gray-300" />
                  </button>
                )}
              </Dropzone>
              <input
                type="text"
                placeholder="Message"
                onBlur={() => setRefetch((prev) => prev + 1)}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                name="message"
                required
              />
              <button
                disabled={
                  message.length === 0 && file === undefined ? true : false
                }
                onClick={handleMessage}
                className={
                  message.length === 0 && file === undefined
                    ? "justify-center flex  items-center px-3 py-3  h-10 w-10 bg-[#E0E0E0] rounded-full"
                    : "justify-center flex hover:bg-gray-200 items-center px-3 py-3 h-10 w-10 bg-bellefuBackground rounded-full"
                }
              >
                <MdSend
                  className={
                    message.length === 0 && file === undefined
                      ? "text-[#A6A6A6] w-5 h-5 text-3xl "
                      : " w-5 h-5 text-3xl  text-gray-500"
                  }
                />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* image modal goes here  */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modal}
        onClose={() => setModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modal}>
          <Box sx={style}>
            <img
              src={`${imageBaseUrl}get/chat/image/${attachments}`}
              alt="error"
              className=" md:w-full md:h-[60vh] w-full h-[40vh] object-fill rounded-md"
            />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

messages.Layout = Layout;
export default messages;
