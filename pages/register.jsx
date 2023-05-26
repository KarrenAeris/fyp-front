import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AppInput } from "../components/core/AppInput";
import { APIKEY } from "../constants/api";

const register = () => {
  const [registration, setRegistration] = useState({});
  const router = useRouter();
  const { asPath, query } = router;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  let userData;

  const handleSubmit = async (event) => {
    userData = {
      name,
      email,
      password,
      confirm_password: confirmPassword,
    };
    try {
      event.preventDefault();
      const res = await fetch(`${APIKEY}/api/v1/auth/register/`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(userData),
      });
      console.log(userData);
      const data = await res.json();

      // if (data.email[0] === "This field is required.") {
      //   toast("Something went wrong 😓", { type: "warning" });
      //   return;
      // }

      console.log(data);

      setRegistration({});
      toast("Registration successfully! 🥳", { type: "success" });
      localStorage.setItem("tokens", "1");
      router.push({ pathname: "/quotes", query }, asPath, { scroll: false });
      return;
    } catch (err) {
      toast("Something went wrong 😓", { type: "warning" });
      return;
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRegistration((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h flex flex-col items-end justify-end">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <Link
          href="/"
          className="flex items-center font-semibold text-gray-900 dark:text-white"
        >
          <Image
            className="mb-5"
            src="/img/header/logo.svg"
            alt="logo"
            width={130}
            height={24}
          />
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create and account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              action="#"
              onSubmit={handleSubmit}
            >
              <div>
                <AppInput
                  onChange={(e) => setName(e.target.value)}
                  label="First name"
                  id="firstName"
                  name="name"
                  required
                  value={name}
                />
              </div>
              <div>
                <AppInput
                  onChange={(e) => setLastName(e.target.value)}
                  label="Last name"
                  id="lastName"
                  name="last_name"
                  required
                  value={lastName}
                />
              </div>
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
                  placeholder="*****"
                  required
                  value={password}
                />
              </div>
              <div>
                <AppInput
                  onChange={(e) => setconfirmPassword(e.target.value)}
                  label="Password"
                  id="password"
                  type="password"
                  name="confirm_password"
                  placeholder="*****"
                  required
                  value={confirmPassword}
                />
                <p
                  className={`${
                    password != confirmPassword && "text-red-600"
                  } text-xs mt-2 mb-1`}
                >
                  {password != confirmPassword
                    ? "password should match with confirm password"
                    : "Password should contain at least 6 characters"}
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required=""
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  href="login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default register;
