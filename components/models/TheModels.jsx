import React from "react";
import { TheModelItem } from "./TheModelItem";

export const TheModels = ({ models }) => {
  debugger;
  return (
    <>
      Models List
      <TheModelItem />
      {models &&
        models.map((model, i) => <TheModelItem key={i} model={model} />)}

      {/* <div className="md:container md:mx-auto px-10"> */}
      {/* <h2 className="text-2xl text-gray-900 mb-5">Our Work</h2>
      <div className="flex justify-around"> */}
      {/* {models && models.map((model, i) => (
          <TheModelItem key={i} model={model} />
        ))} */}
      {/* </div> */}
      {/* </div> */}
    </>
  );
};
