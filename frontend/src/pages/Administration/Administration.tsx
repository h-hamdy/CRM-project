import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import profile from "/src/assets/profile.jpeg";
import type { TableColumnsType } from "antd";
import {
  EnvironmentOutlined,
  PhoneOutlined,
  GlobalOutlined,
  MailOutlined,
  TeamOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { Space } from "antd";
import type { FormProps } from "antd";
import { Form, Input } from "antd";
import axios from "axios";

interface DataType {
  key: React.Key;
  id: React.Key;
  firstName: string;
  lastName: string;
  FullName: string;
  Email: string;
  Phone: string;
  PictureUrl: string;
}

const userColumns: TableColumnsType<DataType> = [
  {
    title: "Full Name",
    dataIndex: "FullName",
    render: (text: string, record: DataType) => (
      <div className="flex items-center">
        <img
          src={profile}
          alt={record.FullName}
          className="w-[30px] h-[30px] rounded-full mr-2"
        />
        {text}
      </div>
    ),
  },
  {
    title: "Email",
    dataIndex: "Email",
  },
  {
    title: "Phone",
    dataIndex: "Phone",
  },
];

const companyInfo = [
  {
    key: "address",
    label: "2158 Mount Tabor, Westbury, New York, USA 11590",
    icon: <EnvironmentOutlined />,
  },
  {
    key: "email",
    label: "houssamhamdy223@gmail.com",
    icon: <MailOutlined />,
  },
  {
    key: "phone",
    label: "+212 770403023",
    icon: <PhoneOutlined />,
  },
  {
    key: "website",
    label: "https://example.com",
    icon: <GlobalOutlined />,
  },
];

const column = [
  {
    title: (
      <Space>
        <ShopOutlined />
        <span>Company Info</span>
      </Space>
    ),
    dataIndex: "label",
    key: "label",
    render: (text: any, record: any) => (
      <Space>
        {record.icon}
        <span>{text}</span>
      </Space>
    ),
  },
];

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};
const onFinish = async (values: any) => {
  try {
    const response = await axios.post(
      "http://localhost:3333/auth/create-user",
      values
    );
    if (response.status === 200) {
      console.log("User created successfully");
    }
  } catch (error) {
    console.log("Error creating user");
    console.log("Error creating user:", error);
  }
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

export const Administration = () => {
  const [form] = Form.useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await axios.post("http://localhost:3333/auth/create-user", values, {
        withCredentials: true,
      });
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const tableTitle = () => (
    <div className="w-full p-2">
      <div className="flex justify-between items-center">
        <span className="flex items-center font-semibold">
          <TeamOutlined className="mr-2" />
          Contacts
        </span>
        <span className="pr-4">
          Total users: <span className="font-bold">{users.length}</span>
        </span>
      </div>
    </div>
  );
  
  const [users, setUsers] = useState<DataType[]>([]);

  const userColumns: TableColumnsType<DataType> = [
	{
	  title: "Full Name",
	  dataIndex: "FullName",
	  render: (text: string, record: DataType) => (
		<div className="flex items-center">
		  <img
			src={record.PictureUrl || profile} // Use record.PictureUrl if available, otherwise fallback to profile image
			alt={record.FullName}
			className="w-[30px] h-[30px] rounded-full mr-2"
		  />
		  <div>
			{/* <div>{text}</div>  */}
			<div className="">{`${record.firstName} ${record.lastName}`}</div> {/* Display first name and last name */}
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
	  dataIndex: "number",
	},
  ];
  

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3333/users/users", {
        withCredentials: true,
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {}, [users]);

  console.log(users);

  return (
    <>
      <div className="flex justify-between pb-5">
        <Button
          icon={<UserAddOutlined />}
          className="h-[40px] w-[150px] rounded-lg"
          type="primary"
          onClick={showModal}
        >
          Create User
        </Button>
        <Modal
          title="Create New User"
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
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            requiredMark={false}
          >
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[
                { required: true, message: "Please input your First Name!" },
                {
                  min: 4,
                  message: "First Name must be at least 4 characters long",
                },
                { max: 10, message: "First Name must not exceed 7 characters" },
              ]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              className="pt-5"
            >
              <Input className="h-[35px]" />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[
                { required: true, message: "Please input your Last Name!" },
                {
                  min: 4,
                  message: "Last Name must be at least 4 characters long",
                },
                { max: 10, message: "Last Name must not exceed 7 characters" },
              ]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input className="h-[35px]" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please input your Email!" },
                { type: "email", message: "Please enter a valid Email!" },
              ]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input className="h-[35px]" />
            </Form.Item>
            <Form.Item
              name="number"
              label="Phone"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              className="pb-5"
            >
              <Input className="h-[35px]" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <div className="flex flex-col lg:flex-row w-full gap-5">
        <div className="lg:w-3/5 w-full">
          <Table
            columns={userColumns}
            dataSource={users.map((user, index) => ({
              ...user,
              key: user.id || index,
            }))}
            size="middle"
            title={tableTitle}
          />
        </div>
        <div className="lg:w-2/5 :w-full">
          <Table columns={column} dataSource={companyInfo} pagination={false} />
        </div>
      </div>
    </>
  );
};

export default Administration;
