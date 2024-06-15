import React from 'react'
import { Divider, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import profile from "/src/assets/profile.jpg"

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
	  Email: 'New York No. 1 Lake Park',
	  PictureUrl: profile
	},
	{
	  key: '2',
	  FullName: 'Jim Green',
	  Phone: "+212 770403023",
	  Email: 'London No. 1 Lake Park',
	  PictureUrl: profile

	},
	{
		key: '3',
		FullName: 'Joe Black',
		Phone: "+212 770403023",
		Email: 'Sydney No. 1 Lake Park',
		PictureUrl: profile

	  },
	  {
		key: '4',
		FullName: 'Joe Black',
		Phone: "+212 770403023",
		Email: 'Sydney No. 1 Lake Park',
		PictureUrl: profile

	  },
  ];

  const columns: TableColumnsType<DataType> = [
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


export const Administration = () => {
  return (
	<>
    <Table columns={columns} dataSource={data} size="middle" />
	</>
  )
}
