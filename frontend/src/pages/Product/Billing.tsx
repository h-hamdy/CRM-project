import React, { useState, useContext, useRef } from "react";
import { Table, Input, InputNumber, Form, Button, InputRef, FormInstance } from "antd";
import { PlusOutlined, DeleteOutlined, FilePdfOutlined, LeftOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import { useClients } from "../../context/ClientsContext";
import { ForOFor } from "../ForOFor";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: React.Key;
  Title: string;
  Qte: string;
  Tarif: string;
  TarifN: string;
  Total: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  const save = async () => {
    try {
      const values = await form.validateFields();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    if (dataIndex === "Qte") {
      childNode = (
        <Form.Item style={{ margin: 0 }} name={dataIndex}>
          <InputNumber
            defaultValue={parseInt(record.Qte)}
            onPressEnter={save}
            onBlur={save}
          />
        </Form.Item>
      );
    } else if (dataIndex === "Tarif" || dataIndex === "TarifN") {
      childNode = (
        <Form.Item style={{ margin: 0 }} name={dataIndex}>
          <InputNumber
            addonAfter="$"
            defaultValue={0.0}
            onPressEnter={save}
            onBlur={save}
          />
        </Form.Item>
      );
    } else {
      childNode = (
        <Form.Item style={{ margin: 0 }} name={dataIndex}>
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      );
    }
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  key: React.Key;
  Title: string;
  Qte: string;
  Tarif: string;
  TarifN: string;
  Total: string;
}

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

export const Billing = () => {
  const { id } = useParams<{ id: string }>();
  const { clients } = useClients();

  const client = clients.find((client) => client.id === Number(id));

  const [dataSource, setDataSource] = useState<DataType[]>([
    {
      key: "0",
      Title: "",
      Qte: "0",
      Tarif: "",
      TarifN: "0",
      Total: "$0.00",
    },
  ]);

  const [count, setCount] = useState(2);

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: "Title",
      dataIndex: "Title",
      width: "30%",
      editable: true,
    },
    {
      title: "Qte",
      dataIndex: "Qte",
      editable: true,
    },
    {
      title: "Tarif Taxable",
      dataIndex: "Tarif",
      editable: true,
    },
    {
      title: "Tarif Non Taxable",
      dataIndex: "TarifN",
      editable: true,
    },
    {
      title: "Total",
      dataIndex: "Total",
    },
    {
      title: "Action",
      dataIndex: "operation",
      width: 50,
      align: "center",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <div className="flex items-center justify-center w-full h-full">
            <a
              onClick={() => handleDelete(record.key)}
              className="flex items-center justify-center w-7 h-7 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition-colors duration-300"
            >
              <DeleteOutlined className="text-lg" />
            </a>
          </div>
        ) : null,
    },
  ];

  const calculateSubtotal = () => {
	return dataSource.reduce((acc, item) => {
	  const totalValue = parseFloat(item.Total.replace("$", "")) || 0;
	  return acc + totalValue;
	}, 0).toFixed(2);
  };

  const handleAdd = () => {
    const newData: DataType = {
      key: count,
      Title: "",
      Qte: "0",
      Tarif: "",
      TarifN: "",
      Total: "0.00",
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const calculateTotal = (qte: string, tarif: string | undefined, tarifN: string | undefined) => {
	const qteNum = parseFloat(qte) || 0;
	const tarifNum = parseFloat(tarif || "0");
	const tarifNNum = parseFloat(tarifN || "0");
	const total = (qteNum * (tarifNum + tarifNNum)).toFixed(2);
	return `$${total}`;
  };
  
  const handleSave = (row: DataType) => {
	const newData = [...dataSource];
	const index = newData.findIndex((item) => row.key === item.key);
	const item = newData[index];
	newData.splice(index, 1, {
	  ...item,
	  ...row,
	  Total: calculateTotal(row.Qte, row.Tarif, row.TarifN), // Update the total
	});
	setDataSource(newData);
	console.log("Updated DataSource:", newData); // Log the updated dataSource array
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  const generatePDF = () => {
	const doc = new jsPDF();
  
	// Add title
	doc.setFontSize(18);
	doc.text("Mapira", 14, 22);
  
	// Define table column titles and rows
	const columns = ["Title", "Quantity", "Tarif", "TarifN", "Total"];
	const rows = dataSource.map((item : any) => [
	  item.Title,
	  item.Qte,
	  item.Tarif !== undefined ? item.Tarif : "-",
	  item.TarifN !== undefined ? item.TarifN : "-",
	  item.Total,
	]);
  
	// Add table
	doc.autoTable({
	  head: [columns],
	  body: rows,
	  startY: 30,
	});
  
	// Save the PDF
	doc.save("Mapira-Devis.pdf");
  };
  

  

  return (
    <div className="flex items-center justify-center">
      {client ? (
        <div className="w-full max-w-[1200px]">
          <div className="flex justify-between items-center pb-10">
            <Link to="/Product">
              <Button icon={<LeftOutlined />}>Products</Button>
            </Link>
            <div className="flex justify-end">
              <Button
                icon={<FilePdfOutlined />}
                className="h-[40px] w-[160px] rounded-lg"
                type="primary"
				onClick={generatePDF}
              >
                <div>Convert to PDF</div>
              </Button>
            </div>
          </div>
          <div className="w-full border-t-[2px] border-gray-200"></div>
          <div className="flex flex-col justify-end">
            <div className="text-2xl font-light pt-10">Products / Services</div>
            <Table
              className="pt-10"
              components={components}
              rowClassName={() => "editable-row"}
              bordered
              dataSource={dataSource}
              columns={columns as ColumnTypes}
              footer={() => (
                <Button icon={<PlusOutlined />} onClick={handleAdd}>
                  Add a row
                </Button>
              )}
            />
            <div className="flex flex-col">
			<div className="flex justify-start gap-10 pb-6">
  <div className="text-[17px]">Subtotal:</div>
  <div className="text-[15px] pl-[18px]">
    <span className="text-gray-600">$</span>{calculateSubtotal()}
  </div>
</div>
              <div className="flex justify-start gap-10">
                <div className="text-[17px]">Sales Tax</div>
                <Form.Item>
                  <InputNumber
                    className="w-[100px]"
                    addonAfter="%"
                    defaultValue={20}
                  />
                </Form.Item>
              </div>
              <div className="flex justify-start gap-10">
                <div className="text-[17px]">Total value:</div>
                <div className="text-[15px]">
                  <span className="text-gray-600">$</span>0.00
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ForOFor />
      )}
    </div>
  );
};
