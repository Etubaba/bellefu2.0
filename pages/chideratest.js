import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";

const chideratest = ({ data, index }) => {
  const [ip, setIp] = useState("");
  const [ipchi, setIpchi] = useState("");

  const ip2 = data?.data.name;

  console.log("index", index);

  useEffect(() => {
    const getIP = async () => {
      await axios
        .get("https://bellefu.inmotionhub.xyz/api/general/country/byip")
        .then((res) => {
          setIp(res.data.data.name);
        });
    };
    getIP();
  }, []);

  useLayoutEffect(() => {
    const getIP = async () => {
      await axios.get("https://api64.ipify.org?format=json").then((res) => {
        setIpchi(res.data.ip);

        if (res.status) {
          axios
            .post("https://bellefu.inmotionhub.xyz/api/web30/set/ip", {
              ip: res.data.ip,
            })
            .then((res) => console.log(res));
        }
      });
    };
    getIP();
  }, []);

  return (
    <div className="h-screen mt-32">
      <p>useEffect={ip}</p>
      <p>server{ip2}</p>
    </div>
  );
};

export default chideratest;

export async function getServerSideProps() {
  const res = await fetch(
    "https://bellefu.inmotionhub.xyz/api/general/country/byip"
  );
  const res2 = await fetch(
    "https://bellefu.inmotionhub.xyz/api/web30/get/web/index"
  );

  const data = await res.json();
  const index = await res2.json();

  return {
    props: {
      data,
      index,
    },
  };
}
