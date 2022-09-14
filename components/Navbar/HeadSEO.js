import Head from "next/head";

function Heads() {
  return (
    <Head>
      {/* <!-- Primary Meta Tags --> */}
      <title>Bellefu Digital Connect</title>
      <meta charSet="UTF-8" />

      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" href="/mefav.png" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Sacramento&display=swap"
        rel="stylesheet"
      ></link>

      <meta name="title" content="Bellefu Digital Connect." />
      <meta
        name="description"
        content="Bellefu.com is a dynamic online marketplace dedicated to agriculture-related 
        activities ensuring farmers, buyers, and sellers of agricultural products have direct
         contact with other agro-allied providers and manufacturing industries around the world.
          Bellefu is designed to make searching for agro products available at your fingertips."
      />

      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://bellefu.com/" />
      <meta property="og:title" content="Bellefu  Digital Connect" />
      <meta
        property="og:description"
        content="Bellefu.com is a dynamic online marketplace dedicated to agriculture-related 
        activities ensuring farmers, buyers, and sellers of agricultural products have direct
         contact with other agro-allied providers and manufacturing industries around the world.
          Bellefu is designed to make searching for agro products available at your fingertips."
      />
      <meta property="og:image" content="https://bellefu.com/bellefulogo.png" />

      {/* <!-- Twitter --> */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://bellefu.com/" />
      <meta property="twitter:title" content="Bellefu Digital Connect" />
      <meta
        property="twitter:description"
        content="Bellefu.com is a dynamic online marketplace dedicated to agriculture-related 
        activities ensuring farmers, buyers, and sellers of agricultural products have direct
         contact with other agro-allied providers and manufacturing industries around the world.
          Bellefu is designed to make searching for agro products available at your fingertips."
      />
      <meta
        property="twitter:image"
        content="https://bellefu.com/bellefulogo.png"
      />
    </Head>
  );
}

export default Heads;
