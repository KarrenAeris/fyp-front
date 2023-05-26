import React from "react";
import { AppButton } from "../core/AppButton";
import { useRef } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setQuotesFiles } from "../../store/slices/quotesSlice";

export const UploadQuote = ({ handleInc }) => {
  const dispatch = useDispatch();
  const fileRef = useRef();

  const handleUploadFile = (e) => {
    fileRef.current.click();
  };

  const getTypeFile = (file) => {
    const [name, ext] = file.name.split(".");
    return { name: name.toLowerCase(), ext: ext.toLowerCase() };
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const { files } = e.dataTransfer || e.target;

    if (files.length > 1) {
      toast.warning("You cannot upload multiple files!");
      return;
    }

    const [file] = Array.from(files);
    const fileDetails = getTypeFile(file);

    if (!file) {
      toast.warning("Something went wrong!");
      return;
    }

    if (fileDetails.ext !== "stl") {
      toast.warning("Invalid format, service only supports .stl!");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (evt) => {
      dispatch(
        setQuotesFiles({ name: fileDetails.name, blob: evt.target.result })
      );
      handleInc(2);
    };
  };

  return (
    <>
      <h2 className="mt-9 mb-5">Upload your file to find out the price</h2>
      <div
        className="flex justify-center items-center w-full h-[70%] rounded-xl bg-gray-400"
        onDragStart={(e) => e.preventDefault()}
        onDragLeave={(e) => e.preventDefault()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <div className="flex flex-col text-center gap-3 text-white uppercase">
          <h2>Drag and drop</h2>
          <span>or</span>
          <AppButton
            className="!bg-white !text-black text-sm !rounded self-center flex items-center space-x-2"
            onClick={handleUploadFile}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.75 9.5V3.3875L3.8 5.3375L2.75 4.25L6.5 0.5L10.25 4.25L9.2 5.3375L7.25 3.3875V9.5H5.75ZM0.5 12.5V8.75H2V11H11V8.75H12.5V12.5H0.5Z"
                fill="black"
              />
            </svg>
            <span>Select file</span>
          </AppButton>
          <input
            onChange={handleDrop}
            type="file"
            name="file"
            id="file"
            ref={fileRef}
            hidden
          />
        </div>
      </div>
    </>
  );
};
