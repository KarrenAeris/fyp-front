import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { StlViewer } from "react-stl-viewer";
import { deleteQuotesFiles } from "../../store/slices/quotesSlice";
import { formOrder } from "../../store/slices/orderSlice";

const style = {
  top: 0,
  left: 0,
};

const constants = {
  r_failure: 0.1,
  labor_cost: 2,
  e: 150,
  e_rate: 0.02
}

export const TheModelItem = ({ model, id }) => {
  const dispatch = useDispatch();
  const totalCost = useSelector(state => state.order)

  const [material, setMaterialCost] = useState([1.08, 0.015]);
  const [quantity, setQuantity] = useState(1);
  
  const handleMatChange = (e) => setMaterialCost(e.target.value.split("_").map(v => parseFloat(v)))
  
  const pre_processing = 3* quantity * 2; // wtime принят за три часа, первое число
  
  const cmaterial = 3.5 * quantity * material[0] * material[1]; // объём принят за 3.5 см3, первое число
  const energy = 0.02 * 3.5* quantity * 150; // снова тот же объём
  const overhead = 3* quantity * 1.5; // снова тот же wtime, оверхед взят 1.5 ака накинуть 50% стоимости времени сверху

  // остальное по формуле расчёта
  const processing = cmaterial + energy + overhead;
  const total_proc = pre_processing + processing;
  const cost = Math.round((total_proc + 0.1 * total_proc) * 100) / 100; // округляется до 2 десятичных знаков

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDelete = () => { 
    const a = totalCost.costs.slice().splice(id, 1)
    dispatch(formOrder(a))
    dispatch(deleteQuotesFiles(model.name)) 
  }

  useEffect(() => {
    const currentCost = totalCost.costs.slice();
    currentCost[id] = cost;
    dispatch(formOrder(currentCost));
  }, [cost])

  return (
    <>
      <div className="flex justify-between space-x-5 mt-4">
        <div className="flex flex-col w-[100%]">
          <div className="grid grid-cols-2 gap-x-5 border-2 border-gray-500 p-5 seld-center">
            <div className="flex flex-col">
              <StlViewer style={style} orbitControls shadows url={model.blob} />
              <p className="text-lg text-left font-bold my-2">{model.name}.stl</p>
              <p className="text-sm text-left hover:bg-gray-100">
                Test Parameter 1
              </p>
              <p className="text-sm text-left hover:bg-gray-100">
                Test Parameter 2
              </p>
            </div>

            <div className="flex flex-col self-center">
              <button
                className="self-end border rounded border-grey p-2 mb-5 hover:bg-gray-100 hover:text-red-700"
                onClick={handleDelete}
              >
                Удалить
              </button>

              <select
                className="p-3 bg-white border border-black rounded max-w-[100%]"
                id="material-list"
                defaultValue='ABS'
                onChange={handleMatChange}
              >
                <option value="" disabled selected>
                  Выбрать материал
                </option>
                <option value="1.08_0.015">ABS</option>
                <option value="1.25_0.018">PLA</option>
                <option value="1.34_0.016">PETG</option>
                <option value="1.25_0.027">TPU</option>
              </select>

              <div className="flex gap-1 my-10">
                <span className="border rounded border-black p-3 pt-3 text-center">
                  {quantity}
                </span>
                <div className="flex flex-col">
                  <button
                    className="border rounded border-black px-1 mb-1"
                    onClick={handleIncrement}
                  >
                    +
                  </button>
                  <button
                    className="border rounded border-black"
                    onClick={handleDecrement}
                  >
                    -
                  </button>
                </div>
              </div>
              <p className="self-start">{cost} $</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
