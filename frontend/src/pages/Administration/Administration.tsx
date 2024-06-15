import React, { useState } from 'react';
import { Table, Button, Modal } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import profile from "/src/assets/profile.jpg";
import type { TableColumnsType } from 'antd';
import { EnvironmentOutlined, PhoneOutlined, GlobalOutlined, MailOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import type { FormProps } from 'antd';
import { Checkbox, Form, Input } from 'antd'

interface DataType {
  key: React.Key;
  FullName: string;
  Email: string;
  Phone: string;
  PictureUrl: string;
}

const data: DataType[] = [
  {
    key: '1',
    FullName: 'John Brown',
    Phone: "+212 770403023",
    Email: 'john.brown@example.com',
    PictureUrl: profile
  },
  {
    key: '2',
    FullName: 'Jim Green',
    Phone: "+212 770403023",
    Email: 'jim.green@example.com',
    PictureUrl: profile
  },
  {
    key: '3',
    FullName: 'Joe Black',
    Phone: "+212 770403023",
    Email: 'joe.black@example.com',
    PictureUrl: profile
  },
  {
    key: '4',
    FullName: 'Jack White',
    Phone: "+212 770403023",
    Email: 'jack.white@example.com',
    PictureUrl: profile
  },
];


const userColumns: TableColumnsType<DataType> = [
  {
    title: 'Full Name',
    dataIndex: 'FullName',
    render: (text: string, record: DataType) => (
      <div className="flex items-center">
        <img
          src={record.PictureUrl}
          alt={record.FullName}
          className="w-[30px] h-[30px] rounded-full mr-2"
        />
        {text}
      </div>
    ),
  },
  {
    title: 'Email',
    dataIndex: 'Email',
  },
  {
    title: 'Phone',
    dataIndex: 'Phone',
  },
];

const companyInfo = [
	{
	  key: 'address',
	  label: '2158 Mount Tabor, Westbury, New York, USA 11590',
	  icon: <EnvironmentOutlined />,
	},
	{
	  key: 'email',
	  label: 'houssamhamdy223@gmail.com',
	  icon: <MailOutlined />,
	},
	{
	  key: 'phone',
	  label: '+212 770403023',
	  icon: <PhoneOutlined />,
	},
	{
	  key: 'website',
	  label: 'https://example.com',
	  icon: <GlobalOutlined />,
	},
  ];
  
  const column = [
	{
	  title: 'Company Info',
	  dataIndex: 'label',
	  key: 'label',
	  render: (text: string, record: any) => (
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
  
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
	console.log('Success:', values);
  };
  
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
	console.log('Failed:', errorInfo);
  };
  

export const Administration = () => {
//   const totalUsers = data.length;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className='flex justify-between pb-5'>
        <Button
          icon={<UserAddOutlined />}
          className='h-[40px] w-[150px] rounded-lg'
          type="primary"
          onClick={showModal}
        >
          Create a User
        </Button>
        <Modal
          title="Create a User"
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
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item<FieldType>
      label="Username"
      name="username"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>
	<Form.Item<FieldType>
      label="Username"
      name="username"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>

	<Form.Item<FieldType>
      label="Email"
      name="username"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>

  </Form>
        </Modal>
      </div>
      <div className='flex flex-col lg:flex-row w-full gap-5'>
        <div className='lg:w-3/5 w-full'>
          <Table columns={userColumns} dataSource={data} size="middle" />
          {/* <div className="mb-4 text-lg flex justify-start font-semibold">
            Total Users: {totalUsers}
          </div> */}
        </div>
        <div className='lg:w-2/5 :w-full'> 
		<Table
      columns={column}
      dataSource={companyInfo}
      pagination={false} // Disable pagination if you want only one row
    />
        </div>
      </div>
    </>
  );
}

export default Administration;

