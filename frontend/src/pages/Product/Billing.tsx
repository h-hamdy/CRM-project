import { Link, useParams } from "react-router-dom";
import { useClients } from "../../context/ClientsContext";
import { ForOFor } from "../ForOFor";
import { Button, Form, Input, Table } from "antd";
import {
  FilePdfOutlined,
  LeftOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import React, { useContext, useEffect, useRef, useState } from "react";
import type { GetRef, InputRef } from "antd";

type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
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
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
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
      Title: "Edward King 0",
      Qte: "32",
      Tarif: "London, Park Lane no. 0",
      TarifN: "London, Park Lane no. 0",
      Total: "Lon",
    },
    {
      key: "1",
      Title: "Edward King 1",
      Qte: "32",
      Tarif: "London, Park Lane no. 1",
      TarifN: "London, Park Lane no. 0",
      Total: "Lon",
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
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <a
            onClick={() => handleDelete(record.key)}
            className="flex items-center justify-center w-7 h-7 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition-colors duration-300"
          >
            <DeleteOutlined className="text-lg" />
          </a>
        ) : null,
    },
  ];

  const handleAdd = () => {
    const newData: DataType = {
      key: count,
      Title: `Edward King ${count}`,
      Qte: "32",
      Tarif: "32",
      TarifN: "32",
      Total: "32",
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
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

  return (
    <div className="flex items-center justify-center">
      {client ? (
        <div className="w-full max-w-[1200px]">
          <div className="flex flex-col">
            <div className="pb-10">
              <Link to="/Product">
                <Button icon={<LeftOutlined />}>Products</Button>
              </Link>
            </div>
            <div className="w-full border-t-[2px] border-gray-200"></div>
            <div className="flex justify-end pt-10 pr-10">
              <Button
                icon={<FilePdfOutlined />}
                className="h-[40px] w-[160px] rounded-lg"
                type="primary"
              >
                <div>Convert to PDF</div>
              </Button>
            </div>
          </div>
          <div>
			<div className="text-2xl font-light pt-10">Products / Services
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
          </div>
          <div className="flex flex-col pt-10">
            <div className="flex justify-end gap-10">
              <div className="text-[17px]">Subtotal</div>
              <div className="text-[15px]">$</div>
            </div>
            <div className="flex justify-end gap-10">
              <div className="text-[17px]">Sales Tax</div>
              <div className="text-[15px]">$</div>
            </div>
            <div className="flex justify-end gap-10">
              <div className="text-[17px]">Total value</div>
              <div className="text-[15px]">$</div>
            </div>
          </div>
        </div>
      ) : (
        <ForOFor />
      )}
    </div>
  );
};
