import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { signIn, useSession, signOut } from "next-auth/react";
import { toast } from "react-toastify";
import Head from "next/head";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { ImFacebook } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import RegisterHeader from "../components/usercomponent/RegisterHeader";
import { apiData } from "../constant";
import { useDispatch } from "react-redux";
import {
  isLoggedIn,
  setProfileDetails,
  ifVerified,
} from "../features/bellefuSlice";
import axios from "axios";
import classNames from "classnames";

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();

  const [formFields, setFormFields] = useState({
    phone: "",
    password: "",
    socialSignin: false,
  });
  const [phoneEmpty, setPhoneEmpty] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (input) => (evt) => {
    if (input === "password") {
      if (evt.target.value) setShowIcon(true);
      else setShowIcon(false);
    }
    setFormFields({ ...formFields, [input]: evt.target.value });
  };
  const handleLogin = (evt) => {
    evt.preventDefault();

    //Check for empty fields
    const emptyFieldExists = validateInput(formFields);

    if (emptyFieldExists) {
      if (!formFields.password) setPasswordEmpty(true);
      if (!formFields.phone) setPhoneEmpty(true);
      return;
    }

    setLoading(true);
    fetch(`${apiData}user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formFields),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);

        if (data.status) {
          const user = data.data.user;
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem(
            "verify",
            JSON.stringify(data.data.verification)
          );
          dispatch(ifVerified(data.data.verification));
          dispatch(isLoggedIn(true));
          dispatch(setProfileDetails(user));
          router.replace("/");
        } else {
          toast.error(data.msg, {
            position: toast.POSITION.TOP_CENTER,
          });
          router.push("/login");
        }
      })
      .catch((error) => {
        setLoading(false);

        console.log(`Error during login due to: ${error}`);
      });
  };
  const validateInput = (formValues) => {
    const emptyFieldExists = false;

    for (const key in formValues) {
      if (Object.hasOwnProperty.call(formValues, key)) {
        if (key === "socialSignin") continue;
        if (!formValues[key]) {
          emptyFieldExists = true;
          break;
        }
      }
    }

    if (emptyFieldExists) return true;
    else return false;
  };
  const clearErrorMsg = (input) => () => {
    if (input === "phone") setPhoneEmpty(false);
    if (input === "password") setPasswordEmpty(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const socialLoginCallback = async (sessionData) => {
    const { providerId, providerName } = sessionData;

    const res = await axios.post(`${apiData}user/login`, {
      providerId,
      providerName,
      socialSignin: true,
    });
    const data = res.data;

    if (!data.status) {
      toast.error(data.msg, {
        position: toast.POSITION.TOP_CENTER,
      });
      return signOut({ redirect: false });
      //router.push("/login");
      //return null;
    }

    const user = data.data.user;
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("verify", JSON.stringify(data.data.verification));
    dispatch(ifVerified(data.data.verification));
    dispatch(isLoggedIn(true));
    dispatch(setProfileDetails(user));

    //Sign out user after authentication from the social media network to make bellefu handle logout.
    const signOutData = await signOut({ redirect: false, callbackUrl: "/" });
    router.replace(signOutData.url);
  };

  useEffect(() => {
    if (session?.providerId) {
      socialLoginCallback(session);
    }
  }, [session]);

  return (
    <div className="mt-28">
      <Head>
        <title>Bellefu Digital Agro Connect</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Bellefu is a agricultural products site and connection between farmers and buyers that offers a wide. We are into food products, agricultural machinery,farmers"
        />

        <link
          rel="icon"
          href="https://www.linkpicture.com/q/bellefuApplogo.jpg"
        />
      </Head>
      <RegisterHeader />
      <div className="w-[90%] md:w-[55%] mx-auto mb-20 rounded-lg border-2 mt-12">
        <h1 className="text-center font-bold py-4">
          Welcome Back! Login To Your Account
        </h1>
        <hr />
        <form className="py-8 px-3 sm:px-6 md:px-12" onSubmit={handleLogin}>
          <div className="flex flex-col md:flex-row my-3 md:my-9">
            <div className="flex flex-col flex-auto md:mr-6 mb-4 md:mb-0">
              <p>
                <label
                  id="phone"
                  className="after:content-['*'] after:ml-0.5 after:text-red-500 text-sm font-medium text-slate-700"
                >
                  User Name or Phone Number{" "}
                  <strong className="text-red-500">*</strong>
                </label>
              </p>
              <p>
                <input
                  type="text"
                  htmlFor="phone"
                  value={formFields.phone}
                  className="w-full rounded-lg py-2 px-3 outline outline-[#F1F1F1] focus:outline-[#FFA500]"
                  onChange={handleChange("phone")}
                  onFocus={clearErrorMsg("phone")}
                />
              </p>
              {phoneEmpty && (
                <p className="text-red-500 text-sm font-medium">
                  Username or Phone must not be empty!
                </p>
              )}
            </div>
            <div className="flex flex-col flex-auto mb-4 md:mb-0">
              <p>
                <label
                  id="password"
                  className="after:content-['*'] after:ml-0.5 after:text-red-500 text-sm font-medium text-slate-700"
                >
                  Password <strong className="text-red-500">*</strong>
                </label>
              </p>
              {showPassword ? (
                <BsEyeSlash
                  onClick={handleClickShowPassword}
                  className={
                    showIcon
                      ? "absolute  mt-9  right-[10%] md:right-[27%] hover:cursor-pointer"
                      : "hidden"
                  }
                />
              ) : (
                <BsEye
                  onClick={handleClickShowPassword}
                  className={
                    showIcon
                      ? "absolute  mt-9 right-[10%] md:right-[27%] hover:cursor-pointer"
                      : "hidden"
                  }
                />
              )}
              <p className="">
                <input
                  type={showPassword ? "text" : "password"}
                  htmlFor="password"
                  className="w-full rounded-lg py-2 pl-3 pr-30 outline outline-[#F1F1F1] focus:outline-[#FFA500]"
                  value={formFields.password}
                  onChange={handleChange("password")}
                  onFocus={clearErrorMsg("password")}
                />
              </p>
              {passwordEmpty && (
                <p className="text-red-500 text-sm font-medium">
                  Password must not be empty!
                </p>
              )}
              <p className="text-right mt-2">
                <button
                  type="button"
                  onClick={() => router.push("/forgot-password")}
                  className="hover:text-bellefuGreen hover:underline hover:cursor-pointer"
                >
                  forgot password
                </button>
              </p>
            </div>
          </div>
          <div onClick={handleLogin} className="w-[100%] md:w-[50%] mx-auto">
            <button
              onClick={handleLogin}
              className={classNames(
                "text-center text-white py-2 w-full rounded-md mb-2",
                {
                  "bg-[#FFA500] hover:bg-[#fabe50]": !isLoading,
                  "bg-[#fabe50]": isLoading,
                  "cursor-not-allowed": isLoading,
                  "bg-[#fabe50]": isLoading,
                }
              )}
              type="submit"
              disabled={isLoading ? true : false}
            >
              {!isLoading ? "Login" : "Processing..."}
            </button>
          </div>
        </form>
        <hr />
        <p className="text-center mt-5 mb-2">OR</p>
        <div className="flex flex-col md:flex-row items-center md:justify-center mb-12 px-2 py-4 md:px-4 md:py-4">
          <p
            className="mb-3 md:mb-0 md:mr-9 w-[100%] md:w-[75%]"
            onClick={() => signIn("google")}
          >
            <button
              type="button"
              className="flex items-center border-2 rounded-lg py-3 pl-4 pr-6 bg-white hover:bg-[#F2F2F2] w-full"
            >
              <FcGoogle className="text-3xl" />{" "}
              <strong className="text-[#303A4B] pl-4 text-lg">
                Sign in with Google
              </strong>
            </button>
          </p>
          <p
            className="text-white w-[100%] md:w-[75%]"
            onClick={() => signIn("facebook")}
          >
            <button
              type="button"
              className="flex border-2 rounded-lg py-3 items-center pl-4 pr-6 bg-blue-500 hover:bg-blue-600 w-full"
            >
              <ImFacebook className="text-3xl text-white" />
              <strong className="pl-4 text-md">Sign in with Facebook</strong>
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
