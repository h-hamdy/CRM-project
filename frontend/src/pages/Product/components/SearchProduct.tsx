import React, { useState } from 'react'
import { Input } from "antd";
import axios from 'axios';

const { Search } = Input;


export const SearchProduct = () => {
	const [searchValue, setSearchValue] = useState("");
	const onSearch = (value: string) => search(value);

	const search = async (value: string) => {
		if (!value.trim()) {
		  return;
		}
		try {
			console.log(value)
		//   const response = await axios.post(
		// 	"http://localhost:3333/clients/search",
		// 	{ username: value },
		// 	{ withCredentials: true }
		//   );
		//   setClients(response.data);
		} catch (error) {
		  console.error("Error searching clients:", error);
		}
	  };



	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearchValue(value);
	
		if (!value.trim()) {
		//   fetchClients();
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
