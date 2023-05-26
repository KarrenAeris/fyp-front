import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setToken } from "../store/slices/userSlice";
import { AppInput } from "../components/core/AppInput";
import { APIKEY } from "../constants/api";

const Login = () => {
  const [login, setLogin] = useState({});
  const router = useRouter();
  const { asPath, query } = router;
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let token_obtain_pair;

  const handleSubmit = async (event) => {
    token_obtain_pair = {
      email,
      password,
    };
    try {
      event.preventDefault();
      const res = await fetch(`${APIKEY}/api/v1/auth/login_token/`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(token_obtain_pair),
      });

      console.log(token_obtain_pair);
      const data = await res.json();

      // if (data.email[0] === "This field is required.") {
      //   toast("Something went wrong 😓", { type: "warning" });
      //   return;
      // }

      console.log(data);

      setLogin({});
      toast("Login successfully! 🥳", { type: "success" });
      localStorage.setItem("tokens", "1");
      dispatch(setToken(1));
      router.push({ pathname: "/quotes" });
      return;
    } catch (err) {
      toast("Something went wrong 😓", { type: "warning" });
      return;
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLogin((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <Image
            src="/img/header/logo.svg"
            alt="logo"
            width={130}
            height={24}
          />
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <AppInput
                  onChange={(e) => setEmail(e.target.value)}
                  label="Your email"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="name@company.com"
                  required
                  value={email}
                />
              </div>
              <div>
                <AppInput
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="name@company.com"
                  required
                  value={password}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  href="register"
                  className="font-medium text-primary hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
