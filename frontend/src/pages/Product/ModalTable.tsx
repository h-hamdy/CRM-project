import { useState } from "react";
import { Modal, Form, Input, AutoComplete, Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useClients } from "../../context/ClientsContext";
import { CreateUserDrawer } from "../Clients/components/CreateUserDrawer";

const ModalTable = ({
  _isModalOpen,
  _handleCancel,
  _handleOk,
  columns,
}: any) => {
  const [form] = Form.useForm();
  const { clients } = useClients();
  const [options, setOptions] = useState<{ value: string; id: number }[]>([]);
  const [selectedClient, setSelectedClient] = useState<any | null>(null);
  const [showdrawer, setShowDrawer] = useState(false);

  const handleSearch = (value: string) => {
    const filteredOptions = clients

	.filter((client) => {
		const fullName = `${client.firstName.toLowerCase()} ${client.lastName.toLowerCase()}`;
        return fullName.includes(value.toLowerCase());
      })
      .map((client) => ({
        value: `${client.firstName} ${client.lastName}`,
        id: client.id,
      }));
	  setOptions(filteredOptions);
  };

  const onSelect = (value: string, option: { value: string; id: number }) => {
	console.log(value)
    const client = clients.find((client) => client.id === option.id);
    if (client) {
      setSelectedClient(client);
      form.setFieldsValue({ Client: value }); // Update the form field with the selected client name
    }
  };

  const _showDrawer = (event: any) => {
    event.preventDefault();
    setShowDrawer(true);
  };

  const _closeDrawer = () => {
    setShowDrawer(false);
  };

  const generateFactureNumber = () => {
    const currentDate = new Date();
    const factureNumber = currentDate.getTime().toString().substr(-5); // Generate a 5-digit string based on current time
    return factureNumber;
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

	  values.Bill = selectedClient.id + generateFactureNumber();
      if (values.client) {
      values.Client = values.client;
      delete values.client;
    }

      _handleOk(values);
      form.resetFields();
      setSelectedClient(null);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <>
      <Modal
        title="Add New Product"
        open={_isModalOpen}
        onOk={handleSubmit}
        onCancel={_handleCancel}
        footer={[
          <Button key="back" onClick={_handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            Create
          </Button>,
        ]}
      >
        <Form
          form={form}
          className="p-5"
          layout="vertical"
          initialValues={{ remember: true }}
          autoComplete="off"
          requiredMark={false}
        >
          {columns.map((column: any) =>
            column.title === "Bill" ? null : (
              <Form.Item
                key={column.key}
                label={column.title}
                name={column.dataIndex}
                rules={[
                  { required: true, message: `${column.title} is required` },
                ]}
              >
                {column.title === "Client" ? (
                  <div className="flex gap-3">
                    <AutoComplete
                      className="h-[35px]"
                      onSearch={handleSearch}
                      onSelect={onSelect}
                      placeholder="Search Name"
                      options={options}
                      dropdownRender={(menu) =>
                        options.length > 5 ? (
                          <div
                            style={{
                              maxHeight: "100px",
                              overflowY: "auto",
                            }}
                          >
                            {menu}
                          </div>
                        ) : (
                          menu
                        )
                      }
                    />
                    <button
                      onClick={_showDrawer}
                      className="flex w-[35px] h-[35px] rounded-md bg-gray-100 items-center justify-center hover:border hover:text-blue-500 hover:border-blue-500"
                    >
                      <PlusCircleOutlined />
                    </button>
                    {showdrawer && (
                      <CreateUserDrawer
                        onClose={_closeDrawer}
                        open={() => setShowDrawer(true)}
                      />
                    )}
                  </div>
                ) : (
                  <Input
                    placeholder={`Enter ${column.title}`}
                    className="h-[35px]"
                  />
                )}
              </Form.Item>
            )
          )}
        </Form>
      </Modal>
    </>
  );
};

export default ModalTable;
