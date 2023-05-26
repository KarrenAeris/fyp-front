import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

export const Search = () => {
  const [query, setQuery] = useState("");
  return (
    <div className="relative">
      <input
        className="border border-gray-300 h-10 w-[500px] px-2 text-sm rounded-md placeholder:text-sm"
        type="text"
        placeholder="Hee"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <FiSearch
        color="gray"
        className="absolute top-[50%] right-5 -translate-y-1/2"
      />
    </div>
  );
};
