import dynamic from "next/dynamic";
import React from "react";
import { TheQuotes } from "../components/TheQuotes";
// const TheQuotes = dynamic(() => import('../components/TheQuotes'), { ssr: false,  });

const quotes = () => {
  return (
    <div className="min-h mt-16">
      <TheQuotes />
    </div>
  );
};

export default quotes;
