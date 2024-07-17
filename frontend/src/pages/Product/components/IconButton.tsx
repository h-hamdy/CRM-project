import axios from 'axios';
import {
	DiffOutlined,
  } from "@ant-design/icons";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const checkBilling = async (id: any) => {

	const factureNumber = {factureNumber : String(id)};
	try {
		const response = await axios.post("http://localhost:3333/bills/exists", factureNumber, {withCredentials: true})
		console.log(" ewww", response.data)
		return response.data.exists;
	}
	catch (error) {
		console.error('Error checking Bill:', error);
		return false;
	}
  }


export const IconButton = ({ id }: any) => {
	const [billExists, setBillExists] = useState<boolean | null>(null);

	useEffect(() => {
	  const fetchBillingStatus = async () => {
		const exists = await checkBilling(id);
		setBillExists(exists);
	  };
  
	  fetchBillingStatus();
	}, [id]);
  
	return billExists ? (
		<Link to={`/Product/${id}`}>
		<div
		  className="inline-block w-6 h-6 border border-gray-300 rounded text-center leading-6 cursor-pointer transition-colors duration-300 hover:bg-gray-200"
		>
		  <DiffOutlined />
		</div>
	  </Link>
	) : (

		<Link to={`/Product/Billing/${id}`}>
		<div
		  className="inline-block w-6 h-6 border border-gray-300 rounded text-center leading-6 cursor-pointer transition-colors duration-300 hover:bg-gray-200"
		>
		  <DiffOutlined />
		</div>
	  </Link>


		
	);
  };
