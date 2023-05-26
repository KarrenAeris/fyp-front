import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { TheHeader } from "../components/TheHeader";
import { useDispatch } from "react-redux";
import { setToken } from "../store/slices/userSlice";

export const MainLayout = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("tokens");

    if (!token) {
      return;
    }

    dispatch(setToken(true));
  }, []);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
      <TheHeader />
      {children}
    </>
  );
};
