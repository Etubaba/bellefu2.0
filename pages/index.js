import Head from "next/head";
import Image from "next/image";
import HeaderSearch from '../components/HeaderSearch'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Bellefu</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Overall container */}
      <div className="bg-bellefuBackground max-w-6xl mx-auto">
        {/* second nav bar */}
        <div> <HeaderSearch /></div>
        {/* main body */}
        <div className="flex">
          {/* cstegory side bar */}
          <div className="w-72 min-h-screen bg-bellefuWhite">
            category nav bar
          </div>
          {/* list of products & slider */}
          <div className="flex-1">
            <div>the slider here</div>
            <div>The products here</div>
          </div>
        </div>
      </div>
    </div>
  );
}
