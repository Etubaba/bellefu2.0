import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import RegisterHeader from "../components/usercomponent/RegisterHeader";
import google from "../public/bellefu-images/google.svg";
import facebook from "../public/bellefu-images/facebook.svg";

const Register = () => {
  const [formFields, setFormFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    phone: "",
    password: "",
  });
  const [countries, setCountries] = useState([
    { name: "Nigeria", code: "NG" },
    { name: "Ghana", code: "GH" },
  ]);
  const [showIcon, setShowIcon] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const onChange = (input) => (evt) => {
    setFormFields({ ...formFields, [input]: evt.target.value });
    //setPassword(evt.target.value);
    if (input === "password") {
      if (evt.target.value) setShowIcon(true);
      else setShowIcon(false);
    }
  };
  const handleClickShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <>
      <Head>
        <title>Register</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <RegisterHeader />
      <div className="w-[80%] md:w-[55%] mx-auto mb-20 rounded-lg border-2">
        <h1 className="text-center font-bold py-4">
          Create Your Account With Bellefu!
        </h1>
        <hr />
        <div className="py-8 px-12">
          <div className="flex my-9">
            <div className="flex flex-col flex-auto mr-6">
              <p>
                <label id="first-name">First Name</label>
              </p>
              <p>
                <input
                  type="text"
                  htmlFor="first-name"
                  className="w-full rounded-lg py-2 px-3 outline outline-[#F1F1F1] focus:outline-[#FFA500]"
                  value={formFields.firstName}
                  onChange={onChange("firstName")}
                />
              </p>
            </div>
            <div className="flex flex-col flex-auto">
              <p>
                <label id="first-name">Last Name</label>
              </p>
              <p>
                <input
                  type="text"
                  htmlFor="first-name"
                  className="w-full rounded-lg py-2 px-3 outline outline-[#F1F1F1] focus:outline-[#FFA500]"
                  value={formFields.lastName}
                  onChange={onChange("lastName")}
                />
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row my-3 md:my-9">
            <div className="flex flex-col flex-auto md:mr-6 mb-4 md:mb-0">
              <p>
                <label id="email">Email</label>
              </p>
              <p>
                <input
                  type="text"
                  htmlFor="email"
                  className="w-full rounded-lg py-2 px-3 outline outline-[#F1F1F1] focus:outline-[#FFA500]"
                  value={formFields.email}
                  onChange={onChange("email")}
                />
              </p>
            </div>
            <div className="flex flex-col flex-auto mb-4 md:mb-0">
              <p>
                <label id="country">Country</label>
              </p>
              <p>
                <select
                  htmlFor="first-name"
                  className="w-full rounded-lg py-2 px-3 outline outline-[#F1F1F1] focus:outline-[#FFA500]"
                  value={formFields.country}
                  onChange={onChange("country")}
                >
                  <option className="w-full"></option>
                  {countries.map((country) => (
                    <option
                      key={country.code}
                      value={country.code}
                      className="w-full"
                    >
                      {country.name}
                    </option>
                  ))}
                </select>
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row my-3 md:mb-9">
            <div className="flex flex-col flex-auto md:mr-6 mb-4 md:mb-0">
              <p>
                <label id="first-name">Phone Number</label>
              </p>
              <p>
                <input
                  type="text"
                  htmlFor="first-name"
                  value={formFields.phone}
                  className="w-full rounded-lg py-2 px-3 outline outline-[#F1F1F1] focus:outline-[#FFA500]"
                  onChange={onChange("phone")}
                />
              </p>
            </div>
            <div className="flex flex-col flex-auto">
              <p>
                <label id="first-name">Password</label>
              </p>
              {showPassword ? (
                <BsEyeSlash
                  onClick={handleClickShowPassword}
                  className={
                    showIcon
                      ? "absolute  mt-9  right-[28%] hover:cursor-pointer"
                      : "hidden"
                  }
                />
              ) : (
                <BsEye
                  onClick={handleClickShowPassword}
                  className={
                    showIcon
                      ? "absolute  mt-9  right-[28%] hover:cursor-pointer"
                      : "hidden"
                  }
                />
              )}
              <p>
                <input
                  type={showPassword ? "text" : "password"}
                  htmlFor="first-name"
                  className="w-full rounded-lg py-2 px-3 outline outline-[#F1F1F1] focus:outline-[#FFA500]"
                  value={formFields.password}
                  onChange={onChange("password")}
                />
              </p>
            </div>
          </div>
          <p className="bg-[#FFA500] hover:bg-[#fabe50] text-white w-[50%] mx-auto py-2 text-center rounded-md mb-4 hover:cursor-pointer">
            Register
          </p>
        </div>
        <hr />
        <p className="text-center mt-11 mb-8">OR</p>
        <div className="flex justify-center mb-12">
          <p className="mr-9">
            <button
              type="button"
              className="border-2 rounded-lg py-3 pl-4 pr-14"
            >
              <Image src={google} alt="google" width="14px" height="14px" />
              <span className="pl-4">Register with Google</span>
            </button>
          </p>
          <p className="text-white">
            <button
              type="button"
              className="border-2 rounded-lg py-3 pl-4 pr-14 bg-[#3B5998]"
            >
              <span className="rounded-full bg-white">
                <Image src={facebook} alt="google" width="14px" height="14px" />
              </span>
              <span className="pl-4">Register with Facebook</span>
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;