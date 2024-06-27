import { Button, notification, Modal, Form, Input, Table, Empty } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useForm } from "antd/lib/form/Form";
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
  const [api, contextHolder] = notification.useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = useForm();
  const [columns, setColumns] = useState([]);
  const [tableData, setTableData] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      _setIsModalOpen(false);

      setTableData(data);
      const newColumns = values.names.map((title: string, index: number) => ({
        title,
        dataIndex: title, // Example for dataIndex, adjust as per your data structure
        key: title, // Example for key, adjust as per your data structure
      }));

      setColumns(newColumns);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const setTableDataFromValues = (values: any) => {
	console.log("from set table", values)
	const newData = {
		key: (tableData.length + 1).toString(), // Generate a unique key
		...columns.reduce((acc : any, column: any) => {
		  if (column.dataIndex === 'Client') {
			if (values.Client) {
			  acc['Client'] = `${values.Client.firstName} ${values.Client.lastName}`;
			}
		  } else {
			if (column.dataIndex in values) {
			  acc[column.dataIndex] = values[column.dataIndex];
			}
		  }
		  return acc;
		}, {}),
	  };
  
	  setTableData([...tableData, newData]);
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
  const handleSubmit = async (values: any) => {
    try {
      if (values) {
		setTableDataFromValues(values)
		_setIsModalOpen(false);
      }
      form.resetFields();
    } catch (error) {
      console.error("Validation failed:", error);
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
                    >
                      <div className="flex">
                        <Form.Item
                          {...restField}
                          validateTrigger={["onChange", "onBlur"]}
                          className="w-full"
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
      <Table
        className="pt-10"
        dataSource={tableData}
        columns={columns}
        locale={tableData.length === 0 ? locale : undefined}
      />
    </>
  );
};
