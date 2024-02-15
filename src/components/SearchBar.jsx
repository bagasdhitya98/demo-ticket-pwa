import React, { useState } from "react";

const SearchBar = ({ onSearch, onClear }) => {
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    onSearch(keyword);
  };

  const handleChange = (e) => {
    setKeyword(e.target.value);

    if (e.target.value === "") {
      onClear();
    }
  };

  return (
    <div className="flex gap-x-3">
      <input
        type="text"
        placeholder="Search by deal name or deal stage..."
        value={keyword}
        onChange={handleChange}
        className="border rounded-md p-2 w-96 bg-white"
      />
      <button
        onClick={handleSearch}
        className="ml-2 bg-orange-600 focus:outline-none border-none font-semibold rounded-md text-white p-2"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
