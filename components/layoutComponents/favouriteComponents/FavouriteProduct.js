import React, { useState } from "react";
import { MdLocationOn, MdOutlineWarningAmber } from "react-icons/md";
import { IoIosHeartDislike } from "react-icons/io";

import { MdOutlineMessage, MdCall } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Button } from '@mui/material'
import { apiData, productImageUrl } from '../../../constant'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { favUpdated, login, msgScroll } from "../../../features/bellefuSlice";
import { Box, margin } from "@mui/system";



const FavouriteProduct = ({ product }) => {
  const [open, setOpen] = useState(false)
  const [favId, setFavId] = useState(null)
  const [favUpdate, setFavUpdate] = useState(false)


  const userId = useSelector(state => state.bellefu.userDetails?.id)
  const dispatch = useDispatch()


  const handleMessage = () => {
    router.push(`/product/${product.productId}`);
    dispatch(msgScroll(1));

  }


  const actionCall = () => {
    axios.post(`${apiData}monitor/user/action`, {
      userId: userId,
      action: 'call',
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err);
      });
  }


  const handleCall = () => {
    const { phone } = product;
    window.open(`tel:${phone}`);
    actionCall()
  }
  const router = useRouter()
  const details = useSelector(state => state.bellefu.indexData)

  const remove = () => {
    // setFavUpdate(!favUpdate)

    axios.post(`${apiData}delete/favorite`, {
      favoriteId: favId,
    })
      .then(res => {
        if (res.data.status) {
          toast.info('Product removed from favourite')
          setOpen(false)
          dispatch(favUpdated())
        }
      })

  }

  const edit = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    height: 200,
    bgcolor: 'white',
    boxShadow: 24,
    borderRadius: 3,
    paddingTop: 2,
    margin: '0 auto'
  }

  return (
    <div className="bg-bellefuWhite shadow-md  mb-5 p-3 rounded-b-md">
      <img
        onClick={() => router.push(`/product/${product.productId}`)}
        src={`${productImageUrl}${product.images[0]}`}
        className="rounded-md w-full h-44 object-cover" />
      <p className="capitalize text-medium">{product.title.substring(0, 20)}</p>
      <div className="flex items-center space-x-2">
        <MdLocationOn className="w-4 h-4 text-bellefuBlack1" />
        <div className="flex items-center space-x-1">
          {/* <p className="text-bellefuBlack1 text-sm capitalize">
            {product.state},
          </p> */}
          <p className="text-bellefuBlack1 text-sm capitalize">
            {product.country_name}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-bellefuGreen flex font-poppins font-semibold">
          <p
            className="mr-1"
            dangerouslySetInnerHTML={{ __html: details?.defaultCurrency }}
          />   {product.price}
        </p>
        <IoIosHeartDislike onClick={() => {
          setOpen(true)
          setFavId(product.FavId)
        }} className="w-5 h-5 text-bellefuOrange" />

        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          opacity={6}
        // sx={{ marginLeft: 'auto', marginRight: 'auto', width: '100%', justifyContent: 'center', alignItems: 'center' }}

        >


          <Box
            sx={edit}
          >
            <div className='flex justify-center items-center'>
              {/* <WarningAmberIcon sx={{ fontSize: 50 }} /> */}
              <MdOutlineWarningAmber className='md:text-5xl text-5xl mb-1 md:mb-2' />
            </div>
            <hr className="mb-4 md:mb-3" />

            <p className="p-1 mx-3 mb-2 md:mb-2 " > Do you want to remove this Product from favorite ? </p>



            <hr className='mb-2 mt-2' />
            <div className='flex mt-3 space-x-20 justify-around'>
              <Button onClick={() => setOpen(false)}><p className='text-xs md:text-[15px]'>Cancel</p></Button>
              <Button color='error' onClick={remove} ><p className='text-xs md:text-[15px]'>Remove</p></Button>
            </div>
          </Box>

        </Modal>



      </div>
      {/* <div className="flex items-center space-x-3 mt-2">
        <button
          onClick={handleMessage}
          className="bg-bellefuOrange rounded-md w-full flex items-center justify-center py-4">
          <MdOutlineMessage className="text-white" />
        </button>
        <button
          onClick={handleCall}
          className="bg-bellefuGreen w-full flex items-center justify-center py-4 rounded-md">
          <MdCall className="text-white" />
        </button>
      </div> */}
    </div>
  );
};

export default FavouriteProduct;
