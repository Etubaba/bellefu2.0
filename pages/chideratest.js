import axios from "axios";
import React, { useEffect, useState } from "react";

const chideratest = () => {
  const [ip, setIp] = useState("");

  useEffect(() => {
    const getIP = async () => {
      axios
        .get("https://bellefu.inmotionhub.xyz/api/general/country/byip")
        .then((res) => setIp(res.data.data.name));
    };

    getIP();
  }, []);
  return <div className="h-screen mt-32">{ip}</div>;
};

export default chideratest;
