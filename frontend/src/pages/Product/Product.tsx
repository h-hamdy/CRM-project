import { Button, notification, Modal, Form, Input, Table, Empty } from "antd";
import {
  PlusOutlined,
  MinusCircleOutlined,
  DiffOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
// import { useForm } from "antd/lib/form/Form";
import { Link } from "react-router-dom";
import axios from "axios";
import ModalTable from "./ModalTable";

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 32, offset: 0 },
    sm: { span: 24, offset: 0 },
  },
};

const locale = {
  emptyText: <Empty description="No Data" />,
};

export const Product = () => {
	const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [columns, setColumns] = useState<any[]>([]);
  const [tableData, setTableData] = useState<any[]>([]);
//   const [data, _setData] = useState<any[]>([]);

  const fetchColumnsData = async () => {
    try {
      const response = await axios.get('http://localhost:3333/product', { withCredentials: true });
      console.log(response.data);
      
      if (Array.isArray(response.data)) {
        const formattedColumns = response.data.map((col, index) => ({
          title: col,
          ...(col === "Bill" && {
            render: () => <IconButton />,
            width: 50,
          }),
          dataIndex: col,
          key: col.toLowerCase(),
        }));
        setColumns(formattedColumns);
      }
    } catch (error) {
      console.error('Error fetching columns:', error);
    }
  };

  // useEffect to fetch columns data on component mount
  useEffect(() => {
    fetchColumnsData();
  }, []);


  const IconButton = ({ onClick }: any) => (
    <Link to="/Product/Billing">
      <div
        className="inline-block w-6 h-6 border border-gray-300 rounded text-center leading-6 cursor-pointer transition-colors duration-300 hover:bg-gray-200"
        onClick={onClick}
      >
        <DiffOutlined />
      </div>
    </Link>
  );
  const handleOk = async () => {
	try {
	  const tableName = 'MyTable'; // Example table name or dynamically obtained
	  const values = await form.validateFields(); // Assuming form is defined
  
	  // Assuming values.names is an array of strings representing column names
	  const newColumns = values.names.map((title: string) => ({
		name: title, // Ensure the structure matches { name: string }
		...(title === 'Bill' && {
		  render: () => <IconButton />,
		  width: 50,
		}),
	  }));
  
	  console.log('Table Name:', tableName);
	  console.log('Columns:', newColumns);
  
	  const response = await axios.post(
		'http://localhost:3333/product/columns',
		{ tableName, columns: newColumns },
		{ withCredentials: true }
	  );
  
	  console.log('Success:', response.data);
	  fetchColumnsData();
	  setIsModalOpen(false);
  
	} catch (error) {
	  console.error('Error:', error);
	} finally {
	  _setIsModalOpen(false);
	}
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const openNotification = (pauseOnHover: boolean) => () => {
    api.info({
      message: "Notification Title",
      description:
        "Please create a product table column to proceed. Using the following Modal",
      showProgress: true,
      pauseOnHover,
      onClose: () => {
        setIsModalOpen(true);
      },
    });
  };

  const [_isModalOpen, _setIsModalOpen] = useState(false);
  const showModal = () => {
    _setIsModalOpen(true);
  };

  const _handleCancel = () => {
    _setIsModalOpen(false);
  };

  const handCreateTalble = () => {
    if (columns.length === 0) openNotification(true)();
    else showModal();
  };


  const fetchDataRows = async () => {
	try {
	  const response = await axios.get('http://localhost:3333/product/data-rows', {
		withCredentials: true,
	  });

	  console.log("daaaata", response.data)

	  const formattedData = response.data.map((item : any, index: any) => ({
		  ...item.data,
		  Client: item.data.Client.toLowerCase(),
		  key: `${index}`, // Use a unique identifier here based on your data structure
		}));

		setTableData(formattedData);

		
		} catch (error) {
	  console.error('Error fetching data rows:', error);
	}
  };

  useEffect(() => {
    fetchDataRows();
  }, []); 

  console.log("tableData", tableData)
  const handleSubmit = async (values: any) => {
	  try {
	  if (values) {
		console.log("values", values)
		_setIsModalOpen(false);

		const payload = {
			tableId: 1,
			data: values,
		  };
  
		// form.resetFields();
  
		await axios.post('http://localhost:3333/product/data', payload, {
		  withCredentials: true,
		}).then(() => fetchDataRows())
  
		console.log('Data posted successfully.');
	  }
	} catch (error) {
	  console.error('Failed to post data:', error);
	}
  };

  return (
    <>
      {contextHolder}
      <div className="flex">
        <Button
          icon={<PlusOutlined />}
          className="h-[40px] w-[190px] rounded-lg"
          type="primary"
          onClick={handCreateTalble}
        >
          {columns.length === 0 ? (
            <div> Create Table Columns</div>
          ) : (
            <div> Add New Product</div>
          )}
        </Button>
      </div>
      <Modal
        title="Create Table Title Column"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Create
          </Button>,
        ]}
      >
        <Form
          form={form}
          {...formItemLayoutWithOutLabel}
          onFinish={() => {}}
          className="w-full p-5 pt-5"
        >
          <Form.List name="names" initialValue={["Bill", "Client"]}>
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => {
                  const { key, ...restField } = field;

                  const isClientOrBill = index <= 1;

                  return (
                    <Form.Item
                      {...(index === 0 && formItemLayoutWithOutLabel)}
                      required={false}
                      key={key}
                      className="mb-3"
                      rules={[{ required: true, message: "Field is required" }]}
                    >
                      <div className="flex">
                        <Form.Item
                          {...restField}
                          validateTrigger={["onChange", "onBlur"]}
                          className="w-full"
                          rules={[
                            { required: true, message: "Field is required" },
                          ]}
                        >
                          <Input
                            placeholder={
                              isClientOrBill
                                ? String(field.name)
                                : "Table Title"
                            }
                            className="w-full h-[40px]"
                            disabled={isClientOrBill}
                          />
                        </Form.Item>
                        {isClientOrBill ? null : (
                          <MinusCircleOutlined
                            className="absolute right-5 pt-3"
                            onClick={() => remove(field.name)}
                          />
                        )}
                      </div>
                    </Form.Item>
                  );
                })}
                <Form.Item>
                  <Button
                    className="flex items-center w-full justify-center h-[40px]"
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    Add Table Column
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
      <ModalTable
        _isModalOpen={_isModalOpen}
        _handleCancel={_handleCancel}
        _handleOk={handleSubmit}
        columns={columns}
      />
      <div className="w-full overflow-x-auto">
        <Table
          className="pt-10"
          dataSource={tableData}
          columns={columns}
          locale={tableData.length === 0 ? locale : undefined}
          scroll={{ x: 100 }}
        />
      </div>
    </>
  );
};
