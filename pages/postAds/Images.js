import React from "react";
import Layout from "../../components/postAdsComponent/Layout";
import ShopProductUpload from "../../components/ShopProducUpload";
import { useEffect, useState } from "react";
import { useDropzone, Dropzone } from "react-dropzone";
import { BsCloudUpload } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { handleImagesUpdate, handleVideoUpdate, isProductForShop, profileDetails } from "../../features/bellefuSlice";
import { toast } from "react-toastify";
import Video from "./Video";


const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 7,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 190,
  height: 150,
  padding: 4,
  boxSizing: "border-box",
};

const img = {
  width: "20vw",
  borderRadius: 7,
};

export default function Images(props) {



  const videoFile = useSelector(state => state.bellefu?.video);
  const imageFile = useSelector(state => state.bellefu?.images);
  const user = useSelector(profileDetails);
  const isNewProductForShop = useSelector(isProductForShop);

  const router = useRouter();

  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [files2, setFiles2] = useState([]);
  const [isUploadingProductToShop, setUploadingProductToShop] = useState(false);
  // const [vidfi, setVidfi] = useState("");






  console.log(files);
  console.log(files2);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      if (files.length >= 10) {
        toast.error("Image upload can not be more than 10", {
          position: "top-center",
        });
      } else {
        setFiles((prevState) => [
          ...prevState,
          URL.createObjectURL(acceptedFiles[0]),
        ]);      }

     

      // see the file object image  dey end for back end which is files2 as arrays of files

      for (let i = 0; i < acceptedFiles.length; i++) {
        let loopedFile = acceptedFiles[i];

        if (files2.length >= 10) {
          return;
        } else {
          setFiles2((prevState) => [...prevState, loopedFile]);
        }
      }
      // setFiles2((prevState) => [...prevState, acceptedFiles]);
    },
  });






  // console.log(files2);
  const handleRemovetag = (tags) => {
    const newArr = files.filter((tag) => tag !== tags);
    const newArr2 = files2.filter((tag) => tag.name !== tags);
    setFiles(newArr);
    setFiles2(newArr2);
  };
  

  const thumbs = files.map((file, index) => (
    <div style={thumb} key={index}>
      <div className="flex">
        <img src={file} className="rounded object-fill w-[200px] lg:w-[18vw]" />
        <MdClose
          onClick={() => handleRemovetag(file)}
          className="text-[28px] z-10 cursor-pointer bg-gray-100  hover:bg-gray-300 p-[2px] rounded-md m-[3px] absolute "
        />
      </div>
    </div>
  ));

  const handleBack = (e) => {
    e.preventDefault();
    router.back();
  };
  //  see where i dey dispatch the file object images to redux then from redux to publish page where i dey end everything
  const handleSubmit = (e) => {
    e.preventDefault();
    if (files2.length !== 0) {
      if (isNewProductForShop) setUploadingProductToShop(true);
      else {
        dispatch(handleImagesUpdate(files2));
        dispatch(handleVideoUpdate(videoFile));
        router.push("/postAds/Publish");
      }
      
    } else {
      toast.error("You have not uoloaded any Images", {
        position: "top-center",
      });
    }
  };


  return (
    <div>
      {isUploadingProductToShop? <ShopProductUpload images={files2} video={videoFile} />: files.length === 0 ? (
        <div
          {...getRootProps()}
          className="border-dashed  space-y-4 border-4 mx-10 my-16 flex flex-col border-gray-300 justify-center p-10  items-center hover:border-blue-400 "
        >
          <input {...getInputProps()} />
          <p>
            <BsCloudUpload className="text-6xl text-gray-600" />
          </p>

          <div className="space-y-3 flex flex-col items-center justify-center">
            <p className=" text-[12px] lg:text-base text-center">
              Click here or Drag & drop images/Videos here{" "}
            </p>

            <div>
              <p className=" text-[12px] lg:text-base">
                Max file size : <strong className="ml-[10px">5mb</strong>
              </p>
              <p className="mb-10 text-[12px] lg:text-base">
                Accept : jpeg/png/
              </p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="border-dashed   space-y-4 border-4 lg:mx-10 lg:my-16 flex  border-gray-300 p-10   hover:border-blue-400 flex-wrap ">
            <div className="m-5  flex">
              <aside>{thumbs}</aside>
            </div>
            <div
              className="border-gray-300 p-6 flex justify-center items-center sm:h-[20vh] lg:h-[7vh] rounded-md m-5 border-dashed border-4 hover:border-blue-400 "
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <span>
                <AiOutlinePlus className="text-4xl text-gray-600" />
              </span>
            </div>
          </div>



          {/* #################### VIDEO */}
          <Video />

          {/* ######################## */}


          <div className="p-5 flex justify-between">
            <button
              onClick={handleBack}
              type="submit"
              class="flex justify-center items-center w-[15vw] py-2 px-4  shadow-sm text-sm font-medium rounded-md text-[black] bg-bellefuWhite  border hover:bg-[#e4e4e4] focus:outline-none focus:ring-2 focus:ring-offset-2 "
            >
              Back
            </button>
            <button
              disabled={files2?.length === 0 ? true : false}
              onClick={handleSubmit}
              type="submit"
              class="flex justify-center items-centerw-[19vw]  lg:w-[15vw] py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-bellefuOrange hover:bg-[#ffc253] focus:outline-none focus:ring-2 focus:ring-offset-2 "
            >
              Continue
            </button>
          </div>
        </>
      )}
    </div>
  );
}
Images.Layout = Layout;
