import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { AppButton } from "../core/AppButton";
import { TheModels } from "../models/TheModels";

// test
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setQuotesFiles } from "../../store/slices/quotesSlice";

// const url =
//   "https://storage.googleapis.com/ucloud-v3/ccab50f18fb14c91ccca300a.stl";

// const style = {
//   top: 0,
//   left: 0,
//   width: 200,
//   height: 200,
// };

export const PanelQuote = ({ handleInc }) => {
  // ------> Material versions <-------
  const [materials, setMaterials] = useState([]);
  const dispatch = useDispatch();
  const fileRef = useRef();
  const total = useSelector(state => state.order.costs)

  useEffect(() => {
    axios.get("/api/material_info").then(({ data }) => setMaterials(data));
  }, []);

  // ------> Material Info <-------
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const items = useSelector(state => state.quotes.files)

  const getTypeFile = (file) => {
    const [name, ext] = file.name.split(".").map(e => e.toLowerCase());
    return {name, ext}
  }

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

    if (items.map(i => i.name).includes(fileDetails.name)) {
      toast.warning("This file's already in the list!");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (evt) => {
      dispatch(setQuotesFiles({name: fileDetails.name, blob: evt.target.result}));
    };
  }

  const sendOrder = () => {
    setTimeout(() => {
      toast.success("Order placed succesfully! You're now referred to orders' page.")
    }, Math.floor(Math.random() * (5000 - 2000) + 2000))
  }

  return (
    <>
      {/* <h2 className="mt-8 mb-3 font-bold text-sm">Parts & Specifications</h2> */}
      <div className="flex justify-between space-x-5">
        <div className="flex flex-col w-[55%]">
        <input
            onChange={handleDrop}
            type="file"
            name="file"
            id="file"
            ref={fileRef}
            hidden
          />
          <TheModels models={items} />
          <button
                className="self-center border rounded border-grey hover:bg-gray-100 hover:text-red-700 mt-2 w-[100%] bg-gray-200"
                onClick={() => fileRef.current.click()}
              >
                Добавить модель +
          </button>
         

          {/* <div
            onDragStart={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <div className="flex flex-col w-full">
              <AppButton
                className="!bg-transparent rounded text-black flex justify-center items-center gap-2 mt-5"
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
                <p>
                  <b>Добавить</b> новую модель
                </p>
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
          </div> */}
        </div>

        <div className="flex flex-1 flex-col gap-5 relative">
          <div className="absolute -left-2 h-full w-[1px] top-0 bottom-0 bg-gray-500"></div>

          <div className="bg-gray-600 rounded p-5 flex flex-col justify-between gap-5 text-white">
            <select
              className="p-3 text-black bg-white border border-black rounded max-w-[100%]"
              id="material-list"
              value={selectedValue}
              onChange={handleSelectChange}
            >
              <option value="" disabled selected>
                Выбрать материал
              </option>
              <option value="ABS">ABS</option>
              <option value="PLA">PLA</option>
              <option value="PETG">PETG</option>
              <option value="TPU">TPU</option>
            </select>

            {selectedValue && (
              <div>
                <h2 className="font-bold mb-4">Информация о материале</h2>
                {materials.map((o) => {
                  if (o.name === selectedValue) {
                    return (
                      <>
                        <p className="mb-3 text-sm">
                          {o.name} | {o.description}
                        </p>
                        <p className="mb-3 text-sm">{o.advantages}</p>
                        <p className="mb-3 text-sm">{o.projects}</p>
                      </>
                    );
                  }
                })}
              </div>
            )}
          </div>

          <hr />

          <div className="flex justify-between">
            <h3>Итого</h3>
            <p>USD ${total.length > 0 ? Math.round((total.reduce((a, v) => a + v, 0)) * 100) / 100 : 0}</p>
          </div> 
          <AppButton className="!bg-transparent text-black" onClick={sendOrder}>
            Отправить на рассмотрение
          </AppButton>
        </div>
      </div>
    </>
  );
};
