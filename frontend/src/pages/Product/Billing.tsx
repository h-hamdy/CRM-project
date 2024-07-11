import React, { useState, useContext, useRef, useEffect } from "react";
import {
  Table,
  Input,
  InputNumber,
  Form,
  Button,
  InputRef,
  FormInstance,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  FilePdfOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import { useClients } from "../../context/ClientsContext";
import { ForOFor } from "../ForOFor";
import jsPDF from "jspdf";
import "jspdf-autotable";

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
	const { facture } = useParams<{ facture: string }>();
	const { clients } = useClients();
	
	const id = facture ? facture[0] : '';
	

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
    return dataSource
      .reduce((acc, item) => {
        const totalValue = parseFloat(item.Total.replace("$", "")) || 0;
        return acc + totalValue;
      }, 0)
      .toFixed(2);
  };

  const [totalValue, setTotalValue] = useState("0.00");

  const [salesTax, setSalesTax] = useState(20);
  useEffect(() => {
    const newTotalValue = calculateTotalValue();
    setTotalValue(newTotalValue);
  }, [dataSource, salesTax]);

  const calculateTotalValue = () => {
    const tarif_sum = dataSource.reduce((sum, item) => {
      const tarif = item.Tarif ? parseFloat(item.Tarif) : 0;
      const qte = item.Qte ? parseFloat(item.Qte) : 1;
      return sum + tarif * qte;
    }, 0);

    const totaltarifvalue = (tarif_sum * salesTax) / 100;
    const subtotal = Number(calculateSubtotal());

    // Ensure the final value is a number before calling toFixed
    const totalValue = Number(totaltarifvalue + subtotal);

    return totalValue.toFixed(2); // Ensure it returns a string with two decimal places
  };

  const handleSalesTaxChange = (value: any) => {
    setSalesTax(value);
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

  const calculateTotal = (
    qte: string,
    tarif: string | undefined,
    tarifN: string | undefined
  ) => {
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

//   const generateFactureNumber = () => {
//     const currentDate = new Date();
//     const factureNumber = currentDate.getTime().toString().substr(-5); // Generate a 5-digit string based on current time
//     return factureNumber;
//   };

  // Function to get the current date in a formatted string
  const getCurrentDate = () => {
    const currentDate = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    return currentDate.toLocaleDateString("en-US", options);
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(25);
    doc.setFont("helvetica", "bold");

    // Center the text horizontally
    const textWidth =
      (doc.getStringUnitWidth("Mapira") * 25) / doc.internal.scaleFactor;
    const pageWidth = doc.internal.pageSize.width;
    const xPosition = (pageWidth - textWidth) / 2;

    // Add the centered text
    doc.text("Mapira", xPosition, 22);

    const startX = 23;
    let startY = 40; // Initial startY position

    doc.setFontSize(11);

    doc.rect(startX, startY, 160, 20); // Outer rectangle

    doc.line(startX + 80, startY, startX + 80, startY + 20);

    // Facture N and its value (left side)
    doc.setFont("helvetica", "bold");
    doc.text("Facture N :", startX + 5, startY + 8);
    doc.setFont("helvetica", "light"); // Set font to Helvetica Light
    doc.text(facture ?? "", startX + 30, startY + 8); // Adjusted startX for value

    doc.setFont("helvetica", "bold"); // Set font back to Helvetica (normal)
    doc.text("Date :", startX + 5, startY + 15);
    doc.setFont("helvetica", "light"); // Set font to Helvetica Light
    doc.text(getCurrentDate(), startX + 30, startY + 15); // Adjusted startX for value

    doc.setFont("helvetica", "bold"); // Set font back to Helvetica (normal)
    doc.text("Client Name :", startX + 85, startY + 12);

    doc.setFont("helvetica", "light"); // Set font to Helvetica Light
    doc.text(
      (client?.firstName ?? "") + " " + (client?.lastName ?? ""),
      startX + 115,
      startY + 12
    );
    // Adjust startY for the main table (autoTable)
    startY = startY + 40; // Add spacing after the initial structured content

    // Define table column titles and rows
    const columns = [
      "QTE",
      "DÉSIGNATION",
      "Tarif Taxable",
      "Tarif Non Taxable",
      "Total",
    ];
    const rows = dataSource.map((item) => [
      item.Qte,
      item.Title,
      item.Tarif !== undefined ? item.Tarif : "-",
      item.TarifN !== undefined ? item.TarifN : "-",
      item.Total,
    ]);

    let tarif_sum = 0;

    // Calculate subtotal
    const Tarif_N_sum = dataSource.reduce((sum, item) => {
      const tarif = item.Tarif ? parseFloat(item.Tarif) : 0;
      const tarifN = item.TarifN ? parseFloat(item.TarifN) : 0;
      const qte = item.Qte ? parseFloat(item.Qte) : 1;
      tarif_sum += tarif * qte;
      return sum + tarifN * qte;
    }, 0);

    // Define tax and total
    const salesTax = 10; // Example tax rate (adjust as needed)
    const tax = (tarif_sum * salesTax) / 100;
    const total = Tarif_N_sum + tarif_sum + tax;
    const subtotal = Tarif_N_sum + tarif_sum;

    // Add main table with spacing
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: startY, // Adjust startY to add spacing
    });

    // Get the final Y position after the main table
    const finalY = (doc as any).lastAutoTable.finalY + 10;

    // Define summary table columns and rows
    const summaryColumns = ["", "Amount"];
    const summaryRows = [
      ["Subtotal:", `$${subtotal.toFixed(2)}`],
      ["TVA:", `$${tax.toFixed(2)}`],
      ["Total:", `$${total.toFixed(2)}`],
    ];

    // Add summary table
    doc.autoTable({
      head: [summaryColumns],
      body: summaryRows,
      startY: finalY + 20, // Add additional spacing after the main table
      theme: "plain",
      headStyles: { fontStyle: "bold" },
      bodyStyles: { fontSize: 12 },
      styles: { halign: "right" },
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
				<Link to="/Product">
              <Button
                icon={<FilePdfOutlined />}
                className="h-[40px] w-[160px] rounded-lg"
                type="primary"
                onClick={generatePDF}
				>
                <div>Convert to PDF</div>
              </Button>
				  </Link>
            </div>
          </div>
          <div className="w-full border-t-[2px] border-gray-200"></div>
          <div className="flex flex-col justify-end">
			<div className="flex justify-between">
            <div className="text-2xl font-light pt-10">Products / Services</div>
            <div className="text-2xl font-light pt-10">Products / Services</div>

			</div>
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
                  <span className="text-gray-600">$</span>
                  {calculateSubtotal()}
                </div>
              </div>
              <div className="flex justify-start gap-10">
                <div className="text-[17px]">Sales Tax</div>
                <Form.Item>
                  <InputNumber
                    className="w-[100px]"
                    addonAfter="%"
                    value={salesTax}
                    onChange={handleSalesTaxChange}
                  />
                </Form.Item>
              </div>
              <div className="flex justify-start gap-10">
                <div className="text-[17px]">Total value:</div>
                <div className="text-[15px]">
                  <span className="text-gray-600">$</span>
                  {totalValue}
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
