import { useState, useEffect } from "react";
import { notification } from "antd";
import {
  Table,
  Button,
  Drawer,
  Input,
  Card,
  Tag,
  Popconfirm,
  Form,
  Space,
} from "antd";
import {
  DeleteOutlined,
  MailOutlined,
  EyeOutlined,
  EditOutlined,
  CloseOutlined,
  PhoneOutlined,
  PlusOutlined,
  GlobalOutlined,
  ShopOutlined,
  AlignLeftOutlined,
} from "@ant-design/icons";
import profile from "/src/assets/profile.jpeg";
import { CreateUserDrawer } from "./CreateUserDrawer";
import axios from "axios";
import { useForm } from "antd/es/form/Form";

interface DataType {
  id: number;
  firstName: string;
  lastName: string;
  type: string;
  email: string;
  phone: string;
  address: string;
  note: string;
}

const ClientColumns = (showDrawer: (user: DataType) => void) => [
  {
    title: <span className="pl-5">Full Name</span>,
    dataIndex: "FullName",
    render: (text: string, record: DataType) => (
      <div className="flex items-center pl-4">
        <img
          src={profile} // Use record.PictureUrl if available, otherwise fallback to default profile image
          className="w-[30px] h-[30px] rounded-full mr-2"
          alt="Profile"
        />
        <div>
          <div className="">{`${record.firstName} ${record.lastName}`}</div>
        </div>
      </div>
    ),
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
  },
  {
    title: "Status",
    dataIndex: "type",
    key: "type",
    render: (text: string) => (
      <Tag color={text.toLocaleLowerCase() ===  "client" ? "blue" : "green"}>{text}</Tag>
    ),
  },
  {
    title: <span className="pl-3">Actions</span>,
    key: "actions",
    width: 100,
    render: (text: string, record: DataType) => (
      <div className="pl-5">
        <button
          onClick={() => showDrawer(record)}
          className="flex w-[25px] h-[25px] rounded-md bg-gray-100 items-center justify-center hover:border hover:text-blue-500 hover:border-blue-500"
        >
          <EyeOutlined className="hover:text-blue-500" />
        </button>
      </div>
    ),
  },
];

export const Clients = () => {
  const { Search } = Input;
  const [open, setOpen] = useState(false);
  const [showDrawerUser, setShowDrawer] = useState(false); // State to manage visibility of CreateUserDrawer
  
  const onSearch = (value: string) => search(value);
  const search = async (value: string) => {
	if (!value.trim()) {
		return;
	  }
	try {
		const response = await axios.post('http://localhost:3333/clients/search', {username: value}, {withCredentials: true})
		setClients(response.data);
	}
	catch(error) {
	}
  }
  const [searchValue, setSearchValue] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    if (!value.trim()) {
		fetchClients();
	  }
  };

  const _showDrawer = () => {
    setShowDrawer(true);
  };

  const onCloseDrawer = () => {
    setShowDrawer(false);
  };
  const [selectedUser, setSelectedUser] = useState<DataType | null>(null);
  const [editRowKey, setEditRowKey] = useState(null);

  const showDrawer = (user: DataType) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const data = [
    { key: "email", value: selectedUser?.email, icon: <MailOutlined /> },
    { key: "phone", value: selectedUser?.phone, icon: <PhoneOutlined /> },
    { key: "address", value: selectedUser?.address, icon: <GlobalOutlined /> },
    { key: "type", value: selectedUser?.type, icon: <ShopOutlined /> },
  ];

  const [form] = useForm();

  const updateEmail = async () => {
    try {
      const values = await form.validateFields();
      const requestData = {
        ...values,
        id: String(selectedUser?.id),
      };

      await axios.put(
        "http://localhost:3333/clients/updateEmail",
        requestData,
        { withCredentials: true }
      );
      notification.success({
        message: "Success",
        description: "Email Updated successfully.",
      });
    } catch (error) {
      notification.error({
        message: "Error",
        description:
          "There was an error Updting the Client Email. Please try again.",
      });
    }
  };

  const updatePhone = async () => {
    try {
      const values = await form.validateFields();
      const requestData = {
        ...values,
        id: String(selectedUser?.id),
      };
      await axios.put(
        "http://localhost:3333/clients/updatePhone",
        requestData,
        { withCredentials: true }
      );
      notification.success({
        message: "Success",
        description: "Phone Updated successfully.",
      });
    } catch (error) {
      notification.error({
        message: "Error",
        description:
          "There was an error Updting the Client Phone. Please try again.",
      });
    }
  };

  const updateType = async () => {
    try {
      const values = await form.validateFields();
      const requestData = {
        ...values,
        id: String(selectedUser?.id),
      };
      await axios.put("http://localhost:3333/clients/updateType", requestData, {
        withCredentials: true,
      });
      notification.success({
        message: "Success",
        description: "Type Updated successfully.",
      });
    } catch (error) {
      notification.error({
        message: "Error",
        description:
          "There was an error Updting the Client Type. The type should be (Client or Company)",
      });
    }
  };

  const updateAddress = async () => {
    try {
      const values = await form.validateFields();
      const requestData = {
        ...values,
        id: String(selectedUser?.id),
      };
      await axios.put(
        "http://localhost:3333/clients/updateAddress",
        requestData,
        { withCredentials: true }
      );
      notification.success({
        message: "Success",
        description: "Address Updated successfully.",
      });
    } catch (error) {
      console.error("Error updating client Address:", error);
      notification.error({
        message: "Error",
        description:
          "There was an error Updating the Client Address. Please try again.",
      });
    }
  };

  const updateNote = async () => {
    try {
      const values = await form.validateFields();
      const requestData = {
        ...values,
        id: String(selectedUser?.id),
      };
      await axios.put("http://localhost:3333/clients/updateNote", requestData, {
        withCredentials: true,
      });
      ShowEditnote(!EditNote);
      onClose();
      fetchClients();
      notification.success({
        message: "Success",
        description: "Note Updated successfully.",
      });
    } catch (error) {
      notification.error({
        message: "Error",
        description:
          "There was an error Updating the Client Note. Please try again.",
      });
    }
  };

  const handleSubmit = async () => {
    if (editRowKey === "email") {
      await updateEmail();
    } else if (editRowKey === "phone") {
      await updatePhone();
    } else if (editRowKey === "type") {
      await updateType();
    } else if (editRowKey === "address") {
      await updateAddress();
    }
    fetchClients();
    setEditRowKey(null);
    onClose();
  };

  const columns = [
    {
      dataIndex: "value",
      key: "value",
      render: (text: any, record: any) => (
        <div
          className={`flex flex-col justify-between pl-5 ${
            editRowKey === record.key ? "h-[60px]" : "h-[55px]"
          }`}
        >
          <div className="flex flex-col">
            <div className="flex gap-4 text-gray-600">
              <div>{record.icon}</div>
              <div>{record.key}</div>
            </div>
          </div>
          {editRowKey === record.key ? (
            <Space className="flex items-center justify-between pt-[5px] px-6">
              <Form form={form}>
                <Form.Item
                  name={record.key}
                  rules={[
                    { required: true, message: `Please enter ${record.key}` },
                  ]}
                  initialValue={record.value}
                >
                  <Input
                    className="w-[280px]"
                    placeholder={`Please enter ${record.key}`}
                  />
                </Form.Item>
              </Form>
              <div className="flex justify-end gap-3 pb-[24px]">
                <Button onClick={() => setEditRowKey(null)}>Cancel</Button>
                <Button onClick={handleSubmit} type="primary">
                  Submit
                </Button>
              </div>
            </Space>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center h-[30px]">
                <span className="pl-7">{record.value}</span>
              </div>
              <button
                onClick={() => setEditRowKey(record.key)}
                className="flex absolute right-6 top-5 items-center justify-center bg-gray-100 hover:bg-gray-200 w-[30px] h-[30px] border-gray-400 rounded-md ml-4"
              >
                <EditOutlined className="cursor-pointer" />
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];

  const [EditNote, ShowEditnote] = useState(false);

  const [clients, setClients] = useState<DataType[]>([]);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get("http://localhost:3333/clients", {
        withCredentials: true,
      });
      setClients(response.data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const deleteClients = async () => {
    try {
      await axios.delete(`http://localhost:3333/clients/deleteClient`, {
        data: { id: selectedUser?.id },
        withCredentials: true,
      });
      fetchClients();
      onClose();
      notification.success({
        message: "Success",
        description: "Client deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting client:", error);
      notification.error({
        message: "Error",
        description:
          "There was an error deleting the Client. Please try again.",
      });
    }
  };

  const handleCloseDrawer = () => {
    onClose(); // Close the drawer
    ShowEditnote(false); // Set editNote state to false
    setEditRowKey(null); // Set editRow state to false
  };

  return (
    <>
      <Drawer
        title={
          <div className="flex justify-end items-cente w-full">
            <Button
              type="text"
              onClick={onClose}
              icon={<CloseOutlined />}
              className="text-gray-600 w-full hover:text-gray-900"
            />
          </div>
        }
        placement="right"
        closable={false}
        onClose={handleCloseDrawer}
        open={open}
        width={600}
        style={{ backgroundColor: "#F2F2F2" }}
      >
        {selectedUser && (
          <section className="flex items-center justify-center w-full">
            <div className="flex flex-col w-full items-center justify-center gap-5">
              <img
                className="rounded-full w-[90px]"
                src={profile}
                alt="Profile"
              />
              <div>
                <h2 className="text-2xl font-semibold">
                  {selectedUser.firstName} {selectedUser.lastName}
                </h2>
              </div>
              <div className="rounded-2xl overflow-hidden w-full">
                {" "}
                <Table
                  columns={columns}
                  dataSource={data}
                  showHeader={false}
                  bordered
                  pagination={false}
                  style={{ marginTop: "0", borderTop: "none" }}
                  size="small"
                  className="rounded-2xl w-full"
                />
              </div>
              {EditNote ? (
                <div className="w-full">
                  <Form
                    requiredMark={false}
                    layout="vertical"
                    form={form}
                    initialValues={{ note: "" }} // Ensure to provide an object with 'note' as the key
                  >
                    <Form.Item name="note" label="Note">
                      <Input.TextArea maxLength={40} />
                    </Form.Item>
                    <Form.Item>
                      <div className="flex justify-end gap-3">
                        <Button onClick={() => ShowEditnote(!EditNote)}>
                          Cancel
                        </Button>
                        <Button
                          onClick={updateNote}
                          type="primary"
                          htmlType="submit"
                        >
                          Submit
                        </Button>
                      </div>
                    </Form.Item>
                  </Form>
                </div>
              ) : (
                <div className="w-full flex justify-center">
                  <Card
                    type="inner"
                    title={
                      <Space>
                        <AlignLeftOutlined className="w-[12px]" />
                        <h1 className="tracking-wide">Note</h1>
                      </Space>
                    }
                    extra={
                      <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => ShowEditnote(!EditNote)}
                        className="text-gray-600"
                      />
                    }
                    style={{ width: "100%" }}
                    className="whitespace-pre-line"
                  >
                    {selectedUser.note}
                  </Card>
                </div>
              )}
              <div className="w-full flex justify-end pt-8">
                <Popconfirm
                  title="Are you sure you want to delete this contact?"
                  okText="Yes"
                  cancelText="No"
                  placement="topLeft"
                  onConfirm={deleteClients}
                >
                  <Button
                    type="primary"
                    danger
                    icon={<DeleteOutlined />}
                    className="flex items-center"
                  >
                    Delete Contact
                  </Button>
                </Popconfirm>
              </div>
            </div>
          </section>
        )}
      </Drawer>
      <div className="flex justify-between">
        <Button
          icon={<PlusOutlined />}
          className="h-[40px] w-[170px] rounded-lg"
          type="primary"
          onClick={_showDrawer}
        >
          Add New Client
        </Button>
        <Search
      placeholder="input search Client Name"
      allowClear
      enterButton="Search"
      size="large"
      onSearch={onSearch}
      onChange={handleChange}
      value={searchValue}
      className="w-[340px] h-[40px]"
    />
      </div>
      <section className="pt-10">
        <Table
          columns={ClientColumns(showDrawer)}
          dataSource={clients.map((user, index) => ({
            ...user,
            key: user.id || index,
          }))}
          size="middle"
        />
      </section>
      {showDrawerUser && (
        <CreateUserDrawer
          open={showDrawerUser}
          onClose={onCloseDrawer}
          fetchClients={fetchClients}
        />
      )}
    </>
  );
};

export default Clients;
