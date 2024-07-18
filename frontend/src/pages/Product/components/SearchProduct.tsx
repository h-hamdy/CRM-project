import React, { useState } from 'react'
import { Input } from "antd";
import axios from 'axios';

const { Search } = Input;


export const SearchProduct = ({setTableData, fetchDataRows}: any) => {
	const [searchValue, setSearchValue] = useState("");
	const onSearch = (value: string) => search(value);

	const search = async (value: string) => {
		if (!value.trim()) {
		  return;
		}
		try {
			console.log(value)
		  const response = await axios.post(
			"http://localhost:3333/product/data-rows-by-client",
			{ client: value },
			{ withCredentials: true }
		  );

		  const formattedData = response.data.map((item: any, index: any) => ({
			...item.data,
			Client: item.data.Client.toLowerCase(),
			key: `${index}`, // Use a unique identifier here based on your data structure
		  }));
		  setTableData(formattedData);
		} catch (error) {
		  console.error("Error searching clients:", error);
		}
	  };



	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearchValue(value);
	
		if (!value.trim()) {
		  fetchDataRows();
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
}
