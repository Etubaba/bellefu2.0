import React, { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Loader from "../constant";

function Custom404() {
  
  const router = useRouter();
  useEffect(() => {
    router.replace("/");
  }, []);
  return <div className="h-screen">  <Loader isLoading={true} /></div>;
}

export default Custom404;
