import React, { useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
// import data from "../../data/data";
import axios from "axios";
import { getOrder } from "../../libs/getOrder";
import { APIKEY } from "../../constants/api";
import { toast } from "react-toastify";

function OrderDetails() {
  const router = useRouter();
  const { orderId } = router.query;
  const [orders, setOrders] = useState([]);
  const [vol, setVol] = useState(0);

  const [specifications, setSpecifications] = useState("");
  const [material, setMaterial] = useState("PLA");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const [params, setParams] = useState(null);

  useEffect(() => {
    axios.get(`${APIKEY}/api/v1/order/list/`).then((res) => {
      console.log(res.data);
      setOrders(res.data);
    });
  }, []);

  const obj = orders.find((doc) => doc.id == orderId);

  function extractParamsFromSTL(stll) {
    var stlContent = stll
      .replaceAll(" facet", "facet")
      .replaceAll(" facet", "facet")
      .replaceAll(" facet", "facet")
      .replaceAll(" facet", "facet")
      .replaceAll(" vertex", "vertex")
      .replaceAll(" vertex", "vertex")
      .replaceAll(" vertex", "vertex")
      .replaceAll(" vertex", "vertex")
      .replaceAll(" vertex", "vertex")
      .replaceAll(" vertex", "vertex")
      .replaceAll(" vertex", "vertex")
      .replaceAll(" vertex", "vertex")
      .replaceAll(" endfacet", "endfacet")
      .replaceAll(" endfacet", "endfacet")
      .replaceAll(" endfacet", "endfacet")
      .replaceAll(" endfacet", "endfacet")
      .replaceAll(" endfacet", "endfacet")
      .replaceAll(" endfacet", "endfacet")
      .replaceAll(" endloop", "endloop")
      .replaceAll(" endloop", "endloop")
      .replaceAll(" endloop", "endloop")
      .replaceAll(" endloop", "endloop")
      .replaceAll(" endloop", "endloop")
      .replaceAll(" endloop", "endloop")
      .replaceAll(" endloop", "endloop")
      .replaceAll(" outer", "outer")
      .replaceAll(" outer", "outer")
      .replaceAll(" outer", "outer")
      .replaceAll(" outer", "outer")
      .replaceAll(" outer", "outer")
      .replaceAll(" vertex", "vertex");

    const objectData = stlContent.split("\n");

    console.log(objectData);

    let totalVolume = 0;
    let vertices = [];

    for (let i = 0; i < objectData.length; i++) {
      const line = objectData[i];

      if (line.startsWith("vertex")) {
        const row = line.split(" ");
        const x = parseFloat(row[1]);
        const y = parseFloat(row[2]);
        const z = parseFloat(row[3]);
        vertices.push([x, y, z]);
      } else if (line.startsWith("endfacet")) {
        if (vertices.length === 3) {
          // Calculate the volume of the triangular facet
          const v0 = vertices[0];
          const v1 = vertices[1];
          const v2 = vertices[2];
          const volume =
            (1 / 6) *
            Math.abs(
              v0[0] * v1[1] * v2[2] +
                v1[0] * v2[1] * v0[2] +
                v2[0] * v0[1] * v1[2] -
                v0[0] * v2[1] * v1[2] -
                v1[0] * v0[1] * v2[2] -
                v2[0] * v1[1] * v0[2]
            );
          totalVolume += volume;
        }
        vertices = [];
      }
    }

    // return totalVolume;
    // Calculate the absolute value of the volume
    const materialVolume = totalVolume;

    setVol(materialVolume / 200);
    return materialVolume / 200;
  }

  //   Object.keys(obj) – returns all the keys of object as array
  //   Object.values(obj) – returns all the values of the object as array
  //   Object.entries(obj) – returns an array of [key, value]

  const p_material = {
    ABS: 1.08,
    PLA: 1.25,
    PETG: 1.34,
    TPU: 1.25,
  };
  const m_material = {
    ABS: 0.015,
    PLA: 0.018,
    PETG: 0.016,
    TPU: 0.027,
  };

  const p = p_material[material];
  const m = m_material[material];

  const c_material = vol * p * m;
  // const trunning = vol / 30.15;
  // const cenergy = 0.02 * trunning * 150;
  // const coverhead = 2 * 1;
  // const cprocessing = c_material + cenergy + coverhead;
  // const cpre_processing = 2 * 2;
  // const cprocess = cpre_processing + cprocessing;
  // const ctotal = cprocess + 0.1 + cprocess;
  let ctotal = c_material;
  // Math.floor(ctotal)
  // parseFloat(ctotal).toFixed(2)
  console.log(ctotal * quantity);

  let final = ctotal * quantity;
  Math.floor(final);
  console.log("final", final);

  // setPrice(ctotal)

  function handleUpload(e) {
    // setFile(e.target.result);
    setFile(e.target.files[0]);
    const fil = e.target.files[0];
    if (!fil) {
      alert("Please select an STL file.");
      return;
    }
    // extractParamsFromSTL(file)

    const reader = new FileReader();

    reader.onload = function (event) {
      const stlContent = event.target.result;
      const params = extractParamsFromSTL(stlContent);
      setParams(params);
    };

    reader.readAsText(fil, "UTF-8");
  }

  const handleSelectChange = (event) => {
    setMaterial(event.target.value);
  };

  let orderData;
  async function handleSubmit(e) {
    orderData = {
      material_type: material,
      material_amount: quantity,
      price: Math.round(ctotal * quantity * 100) / 100,
      file: file,
      v_material: vol,
    };
    console.log(orderData);

    try {
      e.preventDefault();
      const res = await fetch(`${APIKEY}/api/v1/order/create/`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(),
      });
      console.log(res);
      toast("Added successfully! 🥳", { type: "success" });
      return;
    } catch (err) {
      console.log(err);
      toast("Something went wrong 😓", { type: "warning" });
      return;
    }
  }
  console.log(params);

  return (
    <div className="mt-[90px] px-10">
      <h2 className="text-4xl font-bold">Quotes</h2>
      <div className="flex items-start justify-between mt-10">
        <div>
          <section>
            <div className="product flex items-start gap-10 mb-7">
              <div className="product-image">
                <div className="flex items-center gap-1">
                  <input type="checkbox" />
                  <p>Parts and specifications</p>
                </div>
                <div className="border relative w-[350px] border-gray-400 p-2">
                  {obj?.file !== "" ? (
                    <img className="w-[100%]" src={obj?.file} alt="" />
                  ) : (
                    <div className="relative image w-[100%] h-[200px] bg-gray-400 flex items-center justify-center">
                      image
                    </div>
                  )}

                  <p className="font-semibold mt-4">{obj?.name}</p>
                  <p className="mt-2 font-semibold">75.0*38.0*55*mm</p>
                  <p className="mt-2 font-semibold">75.0*38.</p>
                </div>
              </div>
              <div>
                <div>
                  <p>Specifications</p>
                  {/* <textarea
                    className="resize-none border border-gray-400 w-[400px] h-[200px] p-3"
                    onChange={(e) => setSpecifications(e.target.value)}
                    value={specifications}
                  ></textarea> */}
                </div>
                <div className="mt-3">
                  <p className="mb-2">Material</p>
                  <div className="flex items-start justify-between gap-[150px]">
                    <div>
                      <select
                        value={material}
                        onChange={handleSelectChange}
                        className="py-3 px-4 border border-black"
                      >
                        <option value="PLA">PLA</option>
                        <option value="PETG">PETG</option>
                        <option value="TPU">TPU</option>
                        <option value="ABS">ABS</option>
                      </select>
                    </div>
                    <div className="w-[600px] max-w-[100%]">
                      {material === "PLA" && (
                        <p>
                          PLA (полилактид): - Преимущества: PLA биоразлагаемый,
                          безопасен для использования и имеет низкую
                          токсичность, что делает его привлекательным для печати
                          предметов, которые будут использоваться вблизи людей,
                          включая игрушки и модели. - Проекты: красивые и
                          детализированные модели, украшения, игрушки или
                          предметы, которые не подвергаются сильным механическим
                          нагрузкам
                        </p>
                      )}
                      {material === "PETG" && (
                        <p>
                          PETG (полиэтилентерефталатгликоль): - Преимущества:
                          PETG обладает хорошей прочностью и устойчивостью к
                          ударам, при этом сохраняя прозрачность и легкость в
                          печати. Он также водостойкий и обладает хорошей
                          химической стойкостью. - Проекты: прочный и прозрачный
                          материал, подходящий для создания бутылок,
                          контейнеров, защитных щитков или деталей, которые
                          должны быть устойчивыми к воздействию воды и
                          химических веществ
                        </p>
                      )}
                      {material === "TPU" && (
                        <p>
                          TPU (термопластичный полиуретан): - Преимущества: TPU
                          гибкий и эластичный материал, который обладает высокой
                          стойкостью к истиранию. Он отлично сгибается и
                          восстанавливает свою форму, что делает его идеальным
                          для печати гибких деталей и упругих конструкций. -
                          Проекты: гибкие детали, такие как уплотнители,
                          ремешки, подошвы для обуви или другие предметы,
                          которые требуют устойчивости к деформации и истиранию
                        </p>
                      )}
                      {material === "ABS" && (
                        <p>
                          ABS (акрилонитрилбутадиенстирол): - Преимущества: ABS
                          известен своей прочностью и устойчивостью к ударам,
                          что делает его идеальным для функциональных прототипов
                          и деталей, которые подвергаются механическим
                          нагрузкам. - Проекты: прочные и долговечные детали,
                          такие как инженерные прототипы, детали для механизмов,
                          корпуса электроники или детали для использования
                          наружу
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-start gap-[100px]">
                  <div>
                    <p>Quantity</p>
                    <input
                      type="number"
                      className="border border-gray-400 w-[100px] h-[40px] p-2"
                      onChange={(e) => setQuantity(e.target.value)}
                      value={quantity}
                      accept=".stl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div>
          <div className="flex items-center justify-between w-[500px] mb-5">
            <p className="font-semibold">Expected date</p>
            <p className="font-semibold">Days</p>
          </div>
          <div className="flex items-center justify-between w-[500px] border-b border-gray-400 pb-3">
            <p className="font-semibold">Total</p>
            {/* <p className="font-semibold">USD ${ctotal * quantity}</p> */}
            <p className="font-semibold">
              USD ${Math.round(ctotal * quantity * 100) / 100}
            </p>
          </div>
          <h3 className="text-lg font-semibold mt-10">
            Your quote is approved. Please upload a screenshot <br /> with your
            payment
          </h3>
          <div className="h-[300px] bg-gray-400 mt-5 rounded-lg flex flex-col justify-center items-center">
            <label
              htmlFor="upload"
              className="cursor-pointer relative z-10 bg-white px-[50px] py-[15px] rounded-xl"
            >
              Upload a Screenshot
            </label>
            <p className="mt-2">{file == null ? "file name" : file?.name}</p>
            <input
              onChange={handleUpload}
              id="upload"
              type="file"
              className="absolute opacity-0"
            />
          </div>
          <button
            className="px-[35px] py-[15px] bg-gray-400 text-black mt-5 rounded-md"
            type="button"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
