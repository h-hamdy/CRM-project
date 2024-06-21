import { useState } from "react";
import {
  Table,
  Button,
  Drawer,
  Input,
  Card,
  Tag,
  Col,
  DatePicker,
  Popconfirm,
  Form,
  Row,
  Select,
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
    address: "adsfasdfasdfadsfsadf",
    notes:
      "adsfasdfasdfadsfsadfadfasdfaadsfasdfasdfadsfsadfadfsadfadfsadfadfdfdfasdfa",
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
  const [editRowKey, setEditRowKey] = useState(null);

  const showDrawer = (user: DataType) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const data = [
    { key: "Email", value: selectedUser?.email, icon: <MailOutlined /> },
    { key: "Phone", value: selectedUser?.phone, icon: <PhoneOutlined /> },
    { key: "Address", value: selectedUser?.address, icon: <GlobalOutlined /> },
    { key: "Type", value: selectedUser?.status, icon: <ShopOutlined /> },
  ];

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
              <div className="flex justify-end gap-3 pb-[24px]">
                <Button onClick={() => setEditRowKey(null)}>Cancel</Button>
                <Button type="primary">Submit</Button>
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
        onClose={onClose}
        visible={open} // Use `visible` instead of `open` for Ant Design's Drawer component
        width={600}
        style={{ backgroundColor: "#F2F2F2" }} // Set the background color using inline style
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
                {/* This div will ensure the table itself is rounded */}
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
                    // onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                  >
                    <Form.Item name="note" label="Note">
                      <Input.TextArea maxLength={75} />
                    </Form.Item>
                    <Form.Item>
                      <div className="flex justify-end gap-3">
                        <Button onClick={() => ShowEditnote(!EditNote)}>
                          Cancel
                        </Button>
                        <Button type="primary" htmlType="submit">
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
                    {selectedUser.notes}
                  </Card>
                </div>
              )}
			  <div className="w-full flex justify-end pt-8">

			  <Popconfirm
      title="Are you sure you want to delete this contact?"
    //   onConfirm={handleDelete}
      okText="Yes"
      cancelText="No"
	  placement="topLeft"
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
      {showDrawerUser && (
        <CreateUserDrawer open={showDrawerUser} onClose={onCloseDrawer} />
      )}
    </>
  );
};

export default Clients;
