import  { useState } from "react";
import { Table, Button, Drawer, Input, Tag, Col, DatePicker, Form, Row, Select, Space  } from "antd";
import { PlusCircleOutlined, EyeOutlined, CloseOutlined, PlusOutlined } from "@ant-design/icons";
import profile from "/src/assets/profile.jpeg";
import { CreateUserDrawer } from "./CreateUserDrawer";


interface DataType {
  id: number;
  firstName: string;
  lastName: string;
  status: string;
  email: string;
  phone: string;
  PictureUrl: string;
  address: string;
  notes: string;
}

const users: DataType[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    status: "Client",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    PictureUrl: "",
    address: "",
    notes: "",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    status: "Company",
    email: "jane.smith@example.com",
    phone: "098-765-4321",
    PictureUrl: "",
    address: "",
    notes: "",
  },
];

const ClientColumns = (showDrawer: (user: DataType) => void) => [
  {
    title: <span className="pl-5">Full Name</span>,
    dataIndex: "FullName",
    render: (text: string, record: DataType) => (
      <div className="flex items-center pl-4">
        <img
          src={profile}// Use record.PictureUrl if available, otherwise fallback to default profile image
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
    dataIndex: "status",
    key: "status",
    render: (text: string) => (
      <Tag color={text === "Client" ? "blue" : "green"}>{text}</Tag>
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
  const onSearch = (value: string) => console.log(value);
  const [open, setOpen] = useState(false);
  const [showDrawerUser, setShowDrawer] = useState(false); // State to manage visibility of CreateUserDrawer

  const _showDrawer = () => {
    setShowDrawer(true);
  };

  const onCloseDrawer = () => {
    setShowDrawer(false);
  };
  const [selectedUser, setSelectedUser] = useState<DataType | null>(null);

  const showDrawer = (user: DataType) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };


  return (
    <>
      <Drawer
	  title={
        <div className="flex justify-end items-center">
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
  onClose={onClose}
  visible={open} // Use `visible` instead of `open` for Ant Design's Drawer component
  width={500}
  style={{ backgroundColor: '#FBFBFB' }} // Set the background color using inline style
>
  {selectedUser && (
    <section className="flex items-center justify-center w-full">
      <div className="flex flex-col items-center justify-center gap-5">
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
          placeholder="input search Client"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
          className="w-[340px] h-[40px]"
        />
      </div>
      <section className="pt-10">
        <Table
          columns={ClientColumns(showDrawer)}
          dataSource={users.map((user, index) => ({
            ...user,
            key: user.id || index,
          }))}
          size="middle"
        />
      </section>
	  {showDrawerUser && <CreateUserDrawer open={showDrawerUser} onClose={onCloseDrawer} />}
    </>
  );
};

export default Clients;
