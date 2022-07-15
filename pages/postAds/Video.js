import React from "react";
import { useEffect, useState } from "react";
import { useDropzone, Dropzone } from "react-dropzone";

import { MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { FcVideoCall } from "react-icons/fc";
import { handleVideo } from "../../features/bellefuSlice";

export default function Video({ videoFiles }) {
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [files2, setFiles2] = useState([]);
  const [vidchecker, setVidchecker] = useState(false);

  // videoFiles(files2);




  if (files2.length > 0) {
    const [mainthing]=files2
    dispatch(handleVideo(mainthing));
  }

  const thumb = {
    display: "inline-flex",
    borderRadius: 7,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    padding: 4,
    boxSizing: "border-box",
  };

  const { getRootProps, getInputProps } = useDropzone({
    disabled: vidchecker,
    maxSizeBytes: 10240000,
    accept: "video/*",
    onDrop: (acceptedFiles) => {
      if (acceptedFiles[0].size > 10240000) {
        toast.error("Video can't be more than 10mb", {
          position: "top-center",
        });
      } else {
        setFiles([acceptedFiles[0].name]);

        for (let i = 0; i < acceptedFiles.length; i++) {
          let loopedFile = acceptedFiles[i];
          setFiles2([loopedFile]);
          dispatch(handleVideo(loopedFile));

        }
      }

      // see the file object image  dey end for back end which is files2 as arrays of files

      // setFiles2((prevState) => [...prevState, acceptedFiles]);
    },
  });

  const handleRemovetag = (tags, e) => {
    setVidchecker(false);
    e.stopPropagation();
    const newArr = files?.filter((tag) => tag !== tags);
    const newArr2 = files2?.filter((tag) => tag.name !== tags);
    setFiles(newArr);
    setFiles2(newArr2);
  };

  console.log(files);
  console.log(files2);
  const thumbs = files.map((file, index) => (
    <div style={thumb} key={index}>
      <div className="flex">
        <strong className="rounded">{file}</strong>
        <MdClose
          onClick={(e) => handleRemovetag(file, e)}
          className="text-[28px] z-10 cursor-pointer bg-gray-100  hover:bg-gray-300 p-[2px] rounded-md m-[3px] relative "
        />
      </div>
    </div>
  ));

  return (
    <div
      {...getRootProps()}
      className="   space-y-4 border-4 lg:mx-10 lg:my-16 flex  border-gray-300 p-10   hover:border-blue-400 flex-wrap lg:flex-nowrap "
    >
      <div className="rounded-lg flex  hover:bg-gray-300 border space-x-2 px-4 p-1 mr-10">
        <input {...getInputProps()} />

        <FcVideoCall className="text-2xl mr-2 text-bellefuGreen " />
        <div className="flex flex-wrap">
          <span>Upload Video(optional)</span>
          <pre>
            Max file size : <strong className="ml-[10px">10mb</strong>
          </pre>
        </div>
      </div>
      <div className="m-5  flex">
        <aside>{thumbs}</aside>
      </div>
    </div>
  );
}
