import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { LeftOutlined, FilePdfOutlined } from "@ant-design/icons";
import axios from "axios";

const Columns = [
  {
    title: "Title",
    dataIndex: "Title",
    width: "30%",
  },
  {
    title: "Qte",
    dataIndex: "Qte",
  },
  {
    title: "Tarif Taxable",
    dataIndex: "Tarif",
  },
  {
    title: "Tarif Non Taxable",
    dataIndex: "TarifN",
  },
  {
    title: "Total",
    dataIndex: "Total",
  },
];

export const BillTable = () => {
  const [dataSource, setDataSource] = useState([]);
  const { facture } = useParams();

  useEffect(() => {
    // Function to fetch data from API
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3333/bills/fetch-by-facture-number",
          {
            factureNumber: facture,
          }
        );

        // Assuming response.data contains the fetched data structure you provided
        const { items } = response.data;

        // Map the items to match your dataSource structure
        const formattedDataSource = items.map((item: any, index: any) => ({
          key: index.toString(), // Ensure each row has a unique key
          Title: item.Title,
          Qte: item.Qte,
          Tarif: item.Tarif || 0, // Handle null or undefined values if necessary
          TarifN: item.TarifN || 0, // Handle null or undefined values if necessary
          Total: item.Total,
        }));

        setDataSource(formattedDataSource);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error fetching data
      }
    };

    // Call the fetchData function when component mounts
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center pb-10">
        <Link to="/Product">
          <Button icon={<LeftOutlined />}>Products</Button>
        </Link>
        <div className="flex justify-end">
          <Button
            icon={<FilePdfOutlined />}
            className="h-[40px] w-[160px] rounded-lg"
            type="primary"
            // onClick={generatePDF}
          >
            <div>Convert to PDF</div>
          </Button>
        </div>
      </div>
      <div className="w-full border-t-[2px] border-gray-200 pb-10"></div>

      <div className="h-[80px] flex items-center justify-between rounded-2xl shadow-sm bg-white p-5">
        <div className="font-bold">Client :</div>
        <div className="font-bold">Facture N:</div>
        <div className="font-bold">Date :</div>
      </div>
      <div className="text-2xl font-light pt-5">Products / Services</div>

      <Table
        className="pt-10"
        bordered
        dataSource={dataSource}
        columns={Columns}
      />

      <div className="flex flex-col">
        <div className="flex justify-start gap-10 ">
          <div className="text-[15px]">Subtotal:</div>
          <div className="text-[15px] pl-[18px]">
            <span className="text-gray-600">$</span>
            {/* {calculateSubtotal()} */}
          </div>
        </div>
        <div className="flex justify-start gap-10">
          <div className="text-[15px]">Sales Tax:</div>
          <div>asdf</div>
          {/* <Form.Item>
                  <InputNumber
                    className="w-[100px]"
                    addonAfter="%"
                    value={salesTax}
                    onChange={handleSalesTaxChange}
                  />
                </Form.Item> */}
        </div>
        <div className="flex justify-start gap-10">
          <div className="text-[15px]">Total value:</div>
          <div className="text-[15px]">
            <span className="text-gray-600">$</span>
            {/* {totalValue} */}
          </div>
        </div>
      </div>
    </div>
  );
};
