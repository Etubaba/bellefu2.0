import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { GiWallet } from "react-icons/gi";
import { AiOutlineOrderedList } from "react-icons/ai";
import Layout from "../../components/Layout";
import { useSelector } from "react-redux";
import axios from "axios";
import { apiData } from "../../constant";
import { profileDetails, userDId } from "../../features/bellefuSlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";

const Creditwallet = () => {
  const [creditwallet, setCreditwallet] = useState(0);
  const [history, setHistory] = useState(false);
  const [products, setProducts] = useState([]);
  const router = useRouter();

  const user = useSelector(profileDetails);
  //get wallet ballance
  useEffect(() => {
    const getWallet = async () => {
      axios.get(`${apiData}get/wallet/balance/${user?.id}`).then((res) => {
        setCreditwallet(res.data.data);
      });
    };

    getWallet();
  }, []);

  //get wallet history
  useEffect(() => {
    const getWalletHistory = async () => {
      axios.get(`${apiData}get/history/wallet/${user?.id}`).then((res) => {
        setProducts(res.data.data);
      });
    };
    getWalletHistory();
  }, []);

  return (
    <>
      <Head>
        <title>My Wallet</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="bg-bellefuWhite rounded-md lg:mt-5 mt-2">
        <div className="flex justify-between items-center px-5 py-3">
          <h1 className=" text-sm lg:text-lg font-semibold">My Wallet</h1>
          <div
            className="  text-bellefuOrange rounded-md hover:cursor-pointer py-2 flex items-center justify-center lg:px-10 px-6"
            // onClick={addMoney}
          >
            {history ? (
              <div
                onClick={() => setHistory(!history)}
                className="flex items-center space-x-2 justify-center"
              >
                <GiWallet className="w-4 h-4 lg:w-5 lg:h-5" />

                <p className="text-sm lg:text-lg font-semibold">View Balance</p>
              </div>
            ) : (
              <div
                onClick={() => setHistory(!history)}
                className="flex items-center space-x-2 justify-center"
              >
                <GiWallet className="w-4 h-4 lg:w-5 lg:h-5" />

                <p className="text-sm lg:text-lg font-semibold">View History</p>
              </div>
            )}
          </div>
        </div>
        <hr />
        {!history ? (
          <div className="w-auto py-20">
            <div className="flex flex-col lg:flex-row lg:justify-center mb-8 px-2 lg:px-0 space-y-3 lg:space-y-0">
              <div className="bg-[#F8FDF2] lg:mr-12 lg:p-16 rounded-lg py-4">
                <p className="text-center text-lg lg:text-xl">
                  Bellicoin Balance:
                </p>
                <span className="text-center justify-center items-center flex text-sm lg:text-3xl font-semibold lg:font-bold">
                  <p className="mr-2">₿</p>
                  <p>{creditwallet}</p>
                </span>
              </div>
            </div>
          </div>
        ) : products.length > 0 ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className="font-semibold">Date</TableCell>
                  <TableCell className="font-semibold" align="center">
                    Amount(₿)
                  </TableCell>
                  <TableCell className="font-semibold" align="center">
                    Description
                  </TableCell>
                  <TableCell className="font-semibold" align="center">
                    Status
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
                      {moment(product.created_at).format(
                        "MMMM Do YYYY, h:mm a"
                      )}
                    </TableCell>
                    <TableCell align="center">{product.amount}</TableCell>
                    <TableCell align="center">{product.description}</TableCell>
                    <TableCell align="center">{product.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <div className="w-auto text-center text-xl py-20">
            You have no wallet history
          </div>
        )}
      </div>
    </>
  );
};

Creditwallet.Layout = Layout;
export default Creditwallet;
