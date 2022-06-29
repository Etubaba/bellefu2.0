import axios from "axios";
import React, { useEffect, useState } from "react";

const chideratest = ({ data }) => {
  const [ip, setIp] = useState("");

  const ip2 = data.data.name;

  useEffect(() => {
    const getIP = async () => {
      axios
        .get("https://bellefu.inmotionhub.xyz/api/general/country/byip")
        .then((res) => setIp(res.data.data.name));
    };

    getIP();
  }, []);

  console.log("ip2", ip2);
  console.log("ip", ip);
  return (
    <div className="h-screen mt-32">
      <p>{ip}</p>
      <p>{ip2}</p>
    </div>
  );
};

export default chideratest;

export async function getServerSideProps() {
  const res = await fetch(
    "https://bellefu.inmotionhub.xyz/api/general/country/byip"
  );
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}
