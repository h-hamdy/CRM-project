// src/components/SearchClient.tsx
import React, { useState } from "react";
import { Input } from "antd";
import axios from "axios";
import { useClients } from "../../../context/ClientsContext";

const { Search } = Input;

export const SearchClient: React.FC = () => {
  const { setClients, fetchClients } = useClients(); // Use the context
  const [searchValue, setSearchValue] = useState("");

  const onSearch = (value: string) => search(value);

  const search = async (value: string) => {
    if (!value.trim()) {
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3333/clients/search",
        { username: value },
        { withCredentials: true }
      );
      setClients(response.data);
    } catch (error) {
      console.error("Error searching clients:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    if (!value.trim()) {
      fetchClients();
    }
  };

  return (
    <div>
      <Search
        placeholder="input search Client Name"
        allowClear
        // enterButton="Search"
        size="large"
        onSearch={onSearch}
        onChange={handleChange}
        value={searchValue}
        className="w-[300px] h-[40px]"
      />
    </div>
  );
};
