import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import profile from "/src/assets/profile.jpeg";
import type { TableColumnsType } from "antd";
import { notification } from 'antd';
import {
  EnvironmentOutlined,
  PhoneOutlined,
  GlobalOutlined,
  MailOutlined,
  TeamOutlined,
  ShopOutlined,
  EditOutlined,
  PlusCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Space } from "antd";
import type { FormProps } from "antd";
import { Form, Input } from "antd";
import axios from "axios";

interface DataType {
//   key: React.Key;
  id: React.Key;
  firstName: string;
  lastName: string;
//   FullName: string;
  Email: string;
  Phone: string;
  PictureUrl: string;
}

interface CompanyInfo {
	address: string;
	email: string;
	phone: string;
	website: string;
  }
  

// const userColumns: TableColumnsType<DataType> = [
//   {
//     title: "Full Name",
//     dataIndex: "FullName",
//     render: (text: string, record: DataType) => (
//       <div className="flex items-center">
//         <img
//           src={profile}
//           alt={record.FullName}
//           className="w-[30px] h-[30px] rounded-full mr-2"
//         />
//         {text}
//       </div>
//     ),
//   },
//   {
//     title: "Email",
//     dataIndex: "Email",
//   },
//   {
//     title: "Phone",
//     dataIndex: "Phone",
//   },
// ];


type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};
// const onFinish = async (values: any) => {
//   try {
//     const response = await axios.post(
//       "http://localhost:3333/auth/create-user",
//       values
//     );
//     if (response.status === 200) {
//       console.log("User created successfully");
//     }
//   } catch (error) {
//     console.log("Error creating user");
//     console.log("Error creating user:", error);
//   }
// };

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

export const Administration = () => {
	const [_form] = Form.useForm();
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
	  notification.success({
        message: 'Success',
        description: 'User created successfully.',
      });
	  
      form.resetFields();
		fetchUsers(); // Re-fetch users after successfully creating a user
    } catch (error) {
      console.error("Error creating user:", error);
	  notification.error({
		message: 'Error',
		description: 'There was an error creating the user. Please try again.',
	  });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const tableTitle = () => (
    <div className="w-full p-2">
      <div className="flex justify-between items-center">
        <span className="flex text-base items-center pl-2 font-semibold">
          <TeamOutlined className="mr-2" />
          Contacts
        </span>
        <span className="pr-4 text-gray-400">
          Total users: <span className="text-black font-bold">{users.length}</span>
        </span>
      </div>
    </div>
  );
  
  const [users, setUsers] = useState<DataType[]>([]);

  const userColumns: TableColumnsType<DataType> = [
	{
	  title: <span className="pl-5">Full Name</span>,
	  dataIndex: "FullName",
	  render: (text: string, record: DataType) => (
		<div className="flex items-center pl-4">
		  <img
			src={record.PictureUrl || profile} // Use record.PictureUrl if available, otherwise fallback to profile image
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
	// {
	// 	title: <span className="pl-3">Actions</span>,
	// 	key: "actions",
	// 	width: 100,
	// 	render: (text: string, record: DataType) => (
	// 		<div className="flex items-center justify-center">

	// 	  <DeleteOutlined
	// 		style={{ color: 'red', cursor: 'pointer' }}
	// 		onClick={() => handleDelete()} // Assuming you have a function to handle deletion
	// 		/>
	// 		</div>
	// 	),
	//   },
  ];

  const handleDelete = () => {
	// Add your delete logic here
	console.log(`Deleting record with key`);
  };
  

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

  const handleModalClose = () => {
    setIsModalVisible(false);

};const handleFormSubmit = async () => {
	 try {
		const values = await _form.validateFields();
		await axios.post("http://localhost:3333/users/CompanyInfo", values, {withCredentials: true})
		fetchCompanyInfo();
		  _form.resetFields();
		setIsModalVisible(false);
		notification.success({
			message: 'Success',
			description: 'Company Info Set successfully.',
		  });
	 }
	 catch(error) {
		console.error("Error Updating Company Info:", error);
		notification.error({
			message: 'Error',
			description: 'There was an error Updating the Company Info. Please try again.',
		  });
	 }
};
const [isModalVisible, setIsModalVisible] = useState(false);
const handleIconClick = () => {
    setIsModalVisible(true);
  };

  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const fetchCompanyInfo = async () => {
    try {
      const response = await axios.get('http://localhost:3333/users/CompanyInfo', { withCredentials: true });
	  console.log(response.data)
      setCompanyInfo(response.data); // Assuming response.data is an object and placing it in an array for the table
    } catch (error) {
      console.error('Error fetching company info:', error);
    }
  };

  useEffect(() => {
    fetchCompanyInfo();
  }, []);

  const companyInfos = [
	{
	  key: "Address",
	  label: companyInfo?.address,
	  icon: <EnvironmentOutlined />,
	},
	{
	  key: "Email",
	  label: companyInfo?.email,
	  icon: <MailOutlined />,
	},
	{
	  key: "Phone",
	  label: companyInfo?.phone,
	  icon: <PhoneOutlined />,
	},
	{
	  key: "Website",
	  label: companyInfo?.website,
	  icon: <GlobalOutlined />,
	},
  ];
  
const column = [
  {
    title: (
		<Space className="flex justify-between">
			<div className="flex gap-2">

		<ShopOutlined />
		<span>Company Info</span>
			</div>
		<EditOutlined
		  onClick={handleIconClick}
		  style={{ cursor: "pointer", marginLeft: "auto" }}
		/>
	  </Space>
    ),
    dataIndex: "label",
    key: "label",
    render: (text: any, record: any) => (
		<Space className="">
		<div className="flex flex-col">
			<div className="flex items-center gap-2">
			<div>{record.icon}</div>
			<div className="font-light text-gray-500 text-xs">{record.key}</div>
			</div>
		  <div className="pl-5">{text}</div>
		</div>
	  </Space>
    ),
  },
];

  return (
    <>
	<Modal
        title="Edit Company Info"
        visible={isModalVisible}
        onOk={handleFormSubmit}
        onCancel={handleModalClose}
        footer={[
          <Button key="back" onClick={handleModalClose}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleFormSubmit}>
            Submit
          </Button>,
        ]}
      >
        <Form form={_form} requiredMark={false} layout="vertical">
          <Form.Item
            name="address"
            label="Address"
			className="pt-5"
          >
            <Input />
          </Form.Item>
		  <Form.Item
              name="email"
              label="Email"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input className="h-[35px]" />
            </Form.Item>
			<Form.Item
              name="phone"
              label="Phone"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input className="h-[35px]" />
            </Form.Item>
			<Form.Item
              name="website"
              label="Website"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input className="h-[35px]" />
            </Form.Item>
          {/* Add more form items as needed */}
        </Form>
      </Modal>
      <div className="flex justify-between pb-5">
        <Button
          icon={<PlusCircleOutlined />}
          className="h-[40px] w-[150px] rounded-lg"
          type="primary"
          onClick={showModal}
        >
          Add New User
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
            // onFinish={onFinish}
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
      <div className="flex flex-col xl:flex-row w-full gap-5 pt-5">
        <div className="xl:w-3/5 w-full">
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
        <div className="xl:w-2/5 w-full">
          <Table columns={column} dataSource={companyInfos} pagination={false} />
        </div>
      </div>
    </>
  );
};

export default Administration;
