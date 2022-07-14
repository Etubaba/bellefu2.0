import Head from "next/head";
import RegisterHeader from "../components/usercomponent/RegisterHeader";

const Policy = () => {
  return (
    <div className="mt-32">
      <Head>
        <title>Policy and Privacy</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          property="og:image"
          content="https://bellefu30web.vercel.app/bellefulogo.png"
        />
        <meta property="og:title" content="Privacy Policy Scope" />
        <meta
          property="og:description"
          content="This Privacy Policy identifies and describes the way Bellefu uses and protects the information we collect about users. All use of Bellefu products and services, as well as visits to our website, are subject to this Privacy Policy. We may collect different types of personal and other information based on your use of our services"
        />
      </Head>
      <RegisterHeader
        firstLink={{
          firstLinkText: "Policy and Privacy",
          firstLinkUrl: "/policy",
        }}
        secondLink={{
          secondLinkText: "Terms and Conditions",
          secondLinkUrl: "/terms-and-conditions",
        }}
        customWidth={true}
      />
      <div className="text-center md:mx-28">
        <h1 className="capitalize text-bellefuOrange underline font-bold text-2xl">
          Bellefu Privacy and policy
        </h1>
        <ul>
          <li>
            <h2 className="font-bold text-xl my-4">Privacy Policy Scope</h2>
            <p className="mb-3">
              This Privacy Policy identifies and describes the way Bellefu uses
              and protects the information we collect about users. All use of
              Bellefu products and services, as well as visits to our website,
              are subject to this Privacy Policy. We may collect different types
              of personal and other information based on your use of our
              services:
            </p>
            <p className="mb-3">
              Contact Information that allows us to communicate with you —
              including your
            </p>
            <p className="mb-3">name, address, and e-mail address;</p>
            <p className="mb-3">
              Equipment, Performance, Viewing and other Technical Information
              about your use of our network, services, products or websites.
              <br />
              We collect information in two primary ways:
            </p>
            <p className="mb-3">
              You give it to us when you login with your credential;
              <br />
              We collect it automatically when you use our services.
              <br />
              We may use the information we collect in a variety of ways,
              including:
            </p>
            <p className="mb-3">
              Providing you with the best user experience possible;
              <br />
              Providing the services you use and to respond to your questions;
              <br />
              Communicating with you regarding service updates, offers, and
              promotions;
              <br />
              Delivering customized content that may be of interest to you;
              <br />
              Addressing network integrity and security issues;
              <br />
              Investigating, preventing or taking action regarding illegal
              activities, violations of our Terms of Service or Acceptable Use
              Policies.
            </p>
          </li>
          <li>
            <h2 className="font-bold text-xl my-4">Online Activity Tracking</h2>
            <p className="mb-3">
              We collect information about your activity in Bellefu applications
              and website for a number of purposes using technologies such as
              cookies, user behaviour, <br />
              and server
              <br />
              log files.
            </p>
            <p className="mb-3">
              We use that information to help tailor the content you see on our
              site.
            </p>
          </li>
          <li>
            <h2 className="font-bold text-xl my-4">Personal data protection</h2>
            <p className="mb-3">
              Bellefu treats the personal data of its users with the utmost
              responsibility. We believe that each user has
              <br />
              the right to know how his personal data is used, the purposes of
              such use and how it is possible to stop
              <br />
              the use of his or her data. We classify user personal data as
              anonymous (which cannot be associated with a<br />
              living, existing person) and identifiable (which can be associated
              with a living, existing person).
              <br />
              Anonymous data is collected and processed starting at the moment
              you visit our website. Identifiable data, in
              <br />
              the other hand, is only collected and processed once we receive
              your explicit consent by accepting our Terms of Use.
            </p>
          </li>
          <li>
            <h2 className="font-bold text-xl my-4">Information Sharing</h2>
            <p className="mb-3">
              We may provide Personal Information to non-Bellefu companies or
              other third parties for purposes such as:
            </p>
            <p className="mb-3">
              Complying with court orders and other legal process; To assist
              with identity verification, and to prevent fraud and identity
              theft; Enforcing our agreements <br />
              and property rights.
            </p>
            <p className="mb-3">
              Additionally, when you complete a purchase with Bellefu service,
              we share your submitted shipping address and phone number for
              shipping purposes only. <br />
              This information is shared with the entities fulfilling and
              shipping your order, such as the merchant and the shipping
              provider.
            </p>
          </li>
          <li>
            <h2 className="font-bold text-xl my-4">
              Anonymous &amp; Aggregate Information
            </h2>
            <p className="mb-3">
              We collect some information on an anonymous basis. We also may
              anonymize the personal information we collect about you.
            </p>
            <p className="mb-3">
              We obtain aggregate data by combining anonymous data that meet
              certain criteria into groups.
            </p>
            <p className="mb-3">
              We may share aggregate or anonymous information in various formats
              with trusted non-Bellefu entities, and may work with those
              entities to do research <br />
              and provide products and services.
            </p>
          </li>
          <li>
            <h2 className="font-bold text-xl my-4">
              Policy on Data Protection and Security
            </h2>
            <p className="mb-3">
              We do not sell your Personal Information to anyone for any
              purpose. We maintain information about you in our business records
              while you are a user, or until <br />
              it is no longer needed for business, tax, or legal purposes.
            </p>
            <p className="mb-3">
              We have implemented encryption or other appropriate security
              controls to protect Personal Information when stored or
              transmitted by Bellefu
            </p>
            <p className="mb-3">
              We require non-Bellefu companies acting on our behalf to protect
              any Personal Information they may receive in a manner consistent
              with this Policy. <br />
              We do not allow them to use such information for any other
              purpose.
            </p>
          </li>
          <li>
            <h2 className="font-bold text-xl my-4">
              Links to/from Other Web Sites
            </h2>
            <p className="mb-3">
              Bellefu is not responsible for the practices employed by websites
              linked to or from our website, nor the information or content
              contained therein. Please remember that when you use a link to go
              from our website to another website, our Privacy Policy is no
              longer in effect. Your browsing and interaction on any other
              website, including those that have a link on our website, is
              subject to that website&apos;s own rules and policies. Please read
              over those rules and policies before proceeding.
            </p>
          </li>
          <li>
            <h2 className="font-bold text-xl my-4">
              Changes to Our Privacy Policy
            </h2>
            <p className="mb-3">
              If we change our privacy policies and procedures, we will post
              those changes on our website to keep you aware of what information
              we collect, how we use it and under what circumstances we may
              disclose it. Changes to this Privacy Policy are effective when
              they are posted on this page.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Policy;
