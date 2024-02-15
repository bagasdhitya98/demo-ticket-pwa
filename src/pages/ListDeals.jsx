import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Layout from "../components/Layout";
import SearchBar from "../components/SearchBar";

const ListDeals = () => {
  const navigate = useNavigate();
  const [deal, setDeal] = useState([]);
  const [filteredDeal, setFilteredDeal] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("Newest Date");

  const getAllDeals = async () => {
    try {
      const response = await axios.get("api/deals");
      setDeal(response?.data?.data?.results);
      setFilteredDeal(response?.data?.data?.results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);

    if (!keyword) {
      setFilteredDeal(deal);
    } else {
      const filtered = deal.filter(
        (item) =>
          item.properties.dealname
            .toLowerCase()
            .includes(keyword.toLowerCase()) ||
          item.properties.dealstage
            .toLowerCase()
            .includes(keyword.toLowerCase())
      );
      setFilteredDeal(filtered);
    }
  };

  const handleClearSearch = () => {
    setSearchKeyword("");
  };

  const handleSortOrderChange = (selectedSortOrder) => {
    setSortOrder(selectedSortOrder);

    const sortedDeals = [...filteredDeal].sort((a, b) => {
      const dateA = new Date(a.properties.closedate);
      const dateB = new Date(b.properties.closedate);

      return selectedSortOrder === "Newest Date"
        ? dateB - dateA
        : dateA - dateB;
    });

    setFilteredDeal(sortedDeals);
  };

  useEffect(() => {
    getAllDeals();
  }, []);

  useEffect(() => {
    if (!searchKeyword) {
      setFilteredDeal(deal);
    }
  }, [searchKeyword, deal]);

  return (
    <Layout>
      <div className="">
        <div className="flex items-center flex-wrap justify-between gap-x-10 my-16">
          <div className="flex w-full md:w-auto">
            <SearchBar onSearch={handleSearch} onClear={handleClearSearch} />
          </div>
          <div className="flex items-center space-x-4">
            <span>Sort by:</span>
            <select
              className="p-2 border rounded-md font-semibold text-white bg-blue-900 focus:outline-none"
              value={sortOrder}
              onChange={(e) => handleSortOrderChange(e.target.value)}
            >
              <option value="Newest Date">Newest Date</option>
              <option value="Oldest Date">Oldest Date</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-blue-900">Deal Name</th>
                <th className="py-2 px-4 border-b text-blue-900">Deal Stage</th>
                <th className="py-2 px-4 border-b text-blue-900">Amount</th>
                <th className="py-2 px-4 border-b text-blue-900">Close Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredDeal.length > 0 ? (
                filteredDeal.map((deal, index) => (
                  <tr
                    key={deal.id}
                    className={index % 2 === 0 ? "bg-blue-100" : "bg-white"}
                  >
                    <td className="py-2 px-4 border-b text-center">
                      {deal.properties?.dealname}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {deal.properties?.dealstage}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {deal.properties?.amount}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {deal.properties?.closedate}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-4 text-center text-gray-500">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default ListDeals;
