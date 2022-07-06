import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Head from "next/head";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import { apiData, indexAPI } from "../constant";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import RegisterHeader from "../components/usercomponent/RegisterHeader";
import { setProfileDetails } from "../features/bellefuSlice";
//import { homeData } from "../features/bellefuSlice";
//import { useSelector } from "react-redux";
import { AiFillCaretDown } from "react-icons/ai";
import { ImFacebook } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import classNames from "classnames";
import { toast } from "react-toastify";

export const getStaticProps = async () => {
  const res = await fetch(`${indexAPI}`);
  const data = await res.json();

  const response = await fetch(`${apiData}get/countries`);
  const { data: resData } = await response.json();

  return {
    props: {
      data,
      countries: resData.slice().sort(),
      countries1: resData.slice().sort((a, b) => a?.phone_code - b?.phone_code),
    },
  };
};

const Register = ({ data, countries, countries1 }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const defaultCountry = data?.defaultCountry;
  const [formFields, setFormFields] = useState({
    fname: "",
    lname: "",
    email: "",
    countryCode: "",
    gender: "",
    phone: "",
    username: "",
    password: "",
    socialSignup: false,
    providerId: "",
    providerName: "",
  });
  const [countryPhoneCode, setCountryPhoneCode] = useState("");
  const [usernameExists, setUsernameExists] = useState(false);
  const [phoneExists, setPhoneExists] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectCountry, setSelectCountry] = useState(false);
  const [flag, setFlag] = useState(null);
  const [showHelp, setShowHelp] = useState(false);

  const onChange = (input) => (evt) => {
    evt.stopPropagation();

    if (input === "password") {
      if (evt.target.value) setShowIcon(true);
      else setShowIcon(false);
    }

    if (input === "fname" || input === "lname") {
      setFormFields({
        ...formFields,
        [input]: `${evt.target.value
          .charAt(0)
          .toUpperCase()}${evt.target.value.substring(1)}`,
      });
      return;
    }

    setFormFields({ ...formFields, [input]: evt.target.value });
  };
  const handleClickShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  const handleRegister = () => {
    let formValues = formFields;
    // let emptyFieldExists = false;
    if (formFields.password.length < 6) {
      toast.error("please password must be at least 6 characters long", {
        position: "top-center",
      });
    }
    // emptyFieldExists = validateInput(formValues);

    // if (emptyFieldExists) {
    //   return;
    // }

    if (!formFields.email) {
      formValues = { ...formFields, email: `${formFields.username}@gmail.com` };
    }

    //Check for phone number that starts with zero
    for (const field in formValues) {
      if (Object.hasOwnProperty.call(formValues, field) && field === "phone") {
        if (Number(formValues[field].charAt(0)) === 0)
          formValues[field] = formValues[field].substring(1);
        break;
      }
    }
    formValues = {
      ...formValues,
      phone: countryPhoneCode.concat(formValues.phone),
    };
    setIsLoading(true);
    fetch(`${apiData}user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        if (data.status) {
          localStorage.setItem("user", JSON.stringify(data.data));
          dispatch(setProfileDetails(data.data));

          //Sign out the user after authentication, for bellefu to take control of login and logout
          return signOut({ redirect: false, callbackUrl: "/verify-phone" });
          //router.push("/verify-phone");
        }
      })
      .then((resSignOut) => {
        router.replace(resSignOut.url);
      })
      .catch((error) => {
        console.log(`Error for user registration ${error}`);
        setIsLoading(false);
      });
  };
  // const validateInput = (formValues) => {
  //   const emptyFieldExists = false;
  //   for (const key in formValues) {
  //     if (Object.hasOwnProperty.call(formValues, key) && !formValues[key]) {
  //       emptyFieldExists = true;
  //       break;
  //     }
  //   }

  //   if (emptyFieldExists) return true;
  //   else return false;
  // };
  const checkExists = (evt) => {
    const target = evt.target;

    if (!target.value) return;

    let url, data;
    if (target.name === "phone") {
      let phone;

      if (Number(target.value.charAt(0)) === 0)
        phone = target.value.substring(1);
      else phone = target.value;

      url = `${apiData}userphone/exist`;
      data = { phone: countryPhoneCode.concat(phone) };
    }

    if (target.name === "username") {
      url = `${apiData}username/exist`;
      data = { username: target.value };
    }

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((resData) => {
        if (resData.status && target.name === "phone") setPhoneExists(true);
        else setPhoneExists(false);

        if (resData.status && target.name === "username")
          setUsernameExists(true);
        else setUsernameExists(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const clearExists = (evt) => {
    const target = evt.target;

    if (target.name === "phone") setPhoneExists(false);
    if (target.name === "username") setUsernameExists(false);
  };

  useEffect(() => {
    if (!session) return;
    const { user, providerId, providerName } = session;
    //signOut();

    setFormFields({
      ...formFields,
      fname: `${user.name.split(" ")[0].charAt(0).toUpperCase()}${user.name
        .split(" ")[0]
        .substring(1)}`,
      lname: `${user.name.split(" ")[1].charAt(0).toUpperCase()}${user.name
        .split(" ")[1]
        .substring(1)}`,
      email: user.email,
      socialSignup: true,
      providerId,
      providerName,
    });
  }, [session]);

  useEffect(() => {
    if (!countryPhoneCode) {
      const country = countries1.find(
        (country) => country.iso2 === defaultCountry
      );
      setCountryPhoneCode(`+${country?.phone_code}`);
    }
  }, []);

  const checkLength = () => {
    if (formFields.password.length < 6) {
      setShowHelp(true);
    }
  };

  return (
    <>
      <Head>
        <title>Register</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {!session && <RegisterHeader />}
      <div
        className={classNames(
          "w-[90%] md:w-[55%] mx-auto mb-20 rounded-lg border-2 mt-28",
          { "mt-9": session }
        )}
      >
        <h1 className="text-center font-bold py-4">
          {!session
            ? "Create Your Account With Bellefu!"
            : "Thanks for Your Interest in Bellefu App"}
        </h1>
        {session && (
          <h2 className="text-center font-semibold pb-4">
            To Serve You Better and Complete Your Registration, We Need More
            Information from You.
          </h2>
        )}
        <hr />
        <div className="py-4 md:py-8 px-3 sm:px-6 md:px-12">
          <div className="flex flex-col md:flex-row my-3 md:my-9">
            <div className="flex flex-col flex-auto md:mr-6 mb-4 md:mb-0">
              <p>
                <label
                  id="first-name"
                  className="after:content-['*'] after:ml-0.5 after:text-red-500 text-sm font-medium text-slate-700"
                >
                  First Name
                </label>
              </p>
              <p>
                <input
                  type="text"
                  htmlFor="first-name"
                  className="w-full rounded-lg py-2 px-3 outline outline-[#F1F1F1] focus:outline-[#FFA500]"
                  value={formFields.fname}
                  onChange={onChange("fname")}
                  disabled={session ? true : false}
                />
              </p>
            </div>
            <div className="flex flex-col flex-auto mb-4 md:mb-0">
              <p>
                <label
                  id="first-name"
                  className="after:content-['*'] after:ml-0.5 after:text-red-500 text-sm font-medium text-slate-700"
                >
                  Last Name
                </label>
              </p>
              <p>
                <input
                  type="text"
                  htmlFor="first-name"
                  className="w-full rounded-lg py-2 px-3 outline outline-[#F1F1F1] focus:outline-[#FFA500]"
                  value={formFields.lname}
                  onChange={onChange("lname")}
                  disabled={session ? true : false}
                />
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row my-3 md:my-9">
            <div className="flex flex-col w-[100%] md:w-[50%] md:mr-6 mb-4 md:mb-0">
              <p>
                <label
                  id="phone"
                  className="after:content-['*'] after:ml-0.5 after:text-red-500 text-sm font-medium text-slate-700 z-0"
                >
                  Phone Number
                </label>
              </p>
              <div
                className="absolute mt-8 left-[5%] md:left-[24%] flex space-x-1 items-center justify-center ml-8 hover:cursor-pointer"
                onClick={() => setSelectCountry(!selectCountry)}
              >
                <div className="flex">
                  <span className="mr-1">{`${countryPhoneCode}`}</span>
                  <img
                    alt="error"
                    src={
                      flag === null
                        ? `https://flagcdn.com/32x24/${defaultCountry?.toLowerCase()}.png`
                        : `https://flagcdn.com/32x24/${flag?.toLowerCase()}.png`
                    }
                  />
                </div>
                <AiFillCaretDown
                  className={
                    selectCountry ? "text-bellefuOrange" : "text-gray-600"
                  }
                />
              </div>
              {selectCountry && (
                <div className="z-50 absolute top-56 left-[9%] md:left-[24%] h-60 overflow-y-scroll mt-2 w-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {countries1?.map((country) => (
                    <div
                      key={country.id}
                      onClick={() => {
                        setFlag(country.iso2);
                        setSelectCountry(false);
                        setCountryPhoneCode(`+${country?.phone_code}`);
                      }}
                      className="py-1 flex space-x-3 hover:bg-bellefuBackground"
                    >
                      <p
                        key={country.id}
                        className="text-gray-700 space-x-3 px-4 flex py-2 text-sm"
                      >
                        <div className="flex">
                          <span className="mr-2">{`+${country?.phone_code}`}</span>
                          <img
                            alt="error"
                            src={`https://flagcdn.com/20x15/${country.iso2.toLowerCase()}.png`}
                          />
                        </div>
                      </p>
                    </div>
                  ))}
                </div>
              )}
              <p className="w-full">
                <input
                  type="text"
                  htmlFor="phone"
                  value={formFields.phone}
                  name="phone"
                  className="w-full rounded-lg py-2 pl-[112px] md:pl-[100px] pr-3 outline outline-[#F1F1F1] focus:outline-[#FFA500]"
                  onChange={onChange("phone")}
                  onFocus={clearExists}
                  onBlur={checkExists}
                />
              </p>
              {phoneExists && (
                <p className="text-red-500 text-sm font-medium">
                  phone number already exists!
                </p>
              )}
            </div>
            <div className="flex flex-col w-[100%] md:w-[50%] mb-4 md:mb-0">
              <p>
                <label
                  id="email"
                  className="text-sm font-medium text-slate-700"
                >
                  Email {!session && "(optional)"}
                </label>
              </p>
              <p className="w-full">
                <input
                  type="text"
                  htmlFor="email"
                  className="w-full rounded-lg py-2 px-3 outline outline-[#F1F1F1] focus:outline-[#FFA500]"
                  value={formFields.email}
                  onChange={onChange("email")}
                  disabled={session ? true : false}
                />
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row my-3 md:my-9">
            <div className="flex flex-col w-[100%] md:w-[50%] md:mr-6 mb-4 md:mb-0">
              <p>
                <label
                  id="gender"
                  className="after:content-['*'] after:ml-0.5 after:text-red-500 text-sm font-medium text-slate-700"
                >
                  Gender
                </label>
              </p>
              <p>
                <select
                  htmlFor="gender"
                  className="w-full rounded-lg py-2 px-3 outline outline-[#F1F1F1] focus:outline-[#FFA500]"
                  value={formFields.gender}
                  onChange={onChange("gender")}
                >
                  <option className="w-full"></option>
                  <option value="M" key="m">
                    Male
                  </option>
                  <option value="F" key="f">
                    Female
                  </option>
                  <option value="O" key="o">
                    Other
                  </option>
                </select>
              </p>
            </div>
            <div className="flex flex-col w-[100%] md:w-[50%] mb-4 md:mb-0">
              <p>
                <label
                  id="country"
                  className="after:content-['*'] after:ml-0.5 after:text-red-500 text-sm font-medium text-slate-700"
                >
                  Country
                </label>
              </p>
              <p>
                <select
                  htmlFor="country"
                  className="w-full rounded-lg py-2 px-3 outline outline-[#F1F1F1] focus:outline-[#FFA500]"
                  value={formFields.country}
                  onChange={onChange("countryCode")}
                >
                  <option className="w-full" key={1}></option>
                  {countries.map((country) => (
                    <option
                      key={country.iso2}
                      value={country.iso2}
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
                <label
                  id="user-name"
                  className="after:content-['*'] after:ml-0.5 after:text-red-500 text-sm font-medium text-slate-700"
                >
                  User Name
                </label>
              </p>
              <p>
                <input
                  type="text"
                  htmlFor="user-name"
                  value={formFields.username}
                  name="username"
                  className="w-full rounded-lg py-2 px-3 outline outline-[#F1F1F1] focus:outline-[#FFA500]"
                  onChange={onChange("username")}
                  onFocus={clearExists}
                  onBlur={checkExists}
                />
              </p>
              {usernameExists && (
                <p className="text-red-500 text-sm font-medium">
                  username already exists!
                </p>
              )}
            </div>
            <div className="flex flex-col flex-auto mb-4 md:mb-0">
              <p>
                <label
                  id="password"
                  className="after:content-['*'] after:ml-0.5 after:text-red-500 text-sm font-medium text-slate-700"
                >
                  Password
                </label>
              </p>
              {showPassword ? (
                <BsEyeSlash
                  onClick={handleClickShowPassword}
                  className={
                    showIcon
                      ? "absolute  mt-9 right-[10%] md:right-[27%] hover:cursor-pointer"
                      : "hidden"
                  }
                />
              ) : (
                <BsEye
                  onClick={handleClickShowPassword}
                  className={
                    showIcon
                      ? "absolute  mt-9 right-[10%]  md:right-[27%] hover:cursor-pointer"
                      : "hidden"
                  }
                />
              )}
              <div>
                <input
                  type={showPassword ? "text" : "password"}
                  htmlFor="password"
                  className="w-full rounded-lg py-2 px-3 outline outline-[#F1F1F1] focus:outline-[#FFA500]"
                  value={formFields.password}
                  onChange={onChange("password")}
                  onBlur={checkLength}
                />
                {showHelp && (
                  <p className="text-red-500 text-sm font-medium">
                    Password must be atleast 6 characters
                  </p>
                )}
              </div>
            </div>
          </div>
          {!isLoading ? (
            <button
              className="hover:bg-bellefuOrange bg-[#fabe50] text-white w-[100%] md:w-[50%] mx-auto py-2 text-center rounded-md mb-4 hover:cursor-pointer font-bold"
              onClick={handleRegister}
            >
              {!session ? "Register" : "Continue"}
            </button>
          ) : (
            <p
              className="bg-[#fabe50] text-white w-[100%] md:w-[50%] mx-auto py-2 text-center rounded-md mb-4 ..."
              disabled
            >
              <svg
                className="animate-spin h-1 w-5 mr-3 ..."
                viewBox="0 0 24 24"
              ></svg>
              Processing...
            </p>
          )}
        </div>
        {!session && (
          <>
            <div className="flex items-center mt-4 mb-8">
              <p className="w-[46%]">
                <hr className="w-full" />
              </p>
              <p className="w-[6%] text-center mx-4">OR</p>
              <p className="w-[46%]">
                <hr className="w-full" />
              </p>
            </div>
            {/* <hr /> */}
            {/* <p className="text-center mt-11 mb-8">OR</p> */}
            <div className="flex flex-col md:flex-row items-center justify-center mb-12 px-6 py-4 md:px-12 md:py-4">
              <p
                className="mb-3 md:mb-0 md:mr-9 w-[100%] md:w-[75%]"
                onClick={() => signIn("google")}
              >
                <button
                  type="button"
                  className="flex justify-center items-center border-2 rounded-lg py-3 pl-4 pr-10 bg-white hover:bg-[#F2F2F2] w-full"
                >
                  <FcGoogle className="text-3xl" />{" "}
                  <strong className="text-[#303A4B] pl-4 text-md">
                    Sign up with Google
                  </strong>
                </button>
              </p>
              <p
                className="text-white w-[100%] md:w-[75%]"
                onClick={() => signIn("facebook")}
              >
                <button
                  type="button"
                  className="flex items-center border-2 rounded-lg py-3 pl-4 pr-10 md:pr-14 bg-blue-500 hover:bg-blue-600 w-full"
                >
                  <ImFacebook className="text-3xl text-white" />{" "}
                  <strong className="pl-4 text-md">
                    Sign up with Facebook
                  </strong>
                </button>
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Register;
