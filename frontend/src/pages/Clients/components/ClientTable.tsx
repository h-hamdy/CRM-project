import { Table, Tag } from 'antd'
import profile from "/src/assets/profile.jpeg";
import { EyeOutlined } from "@ant-design/icons";
import { useEffect, useState } from 'react';
import { ClientsInfoDrawer } from './ClientsInfoDrawer';
import { CreateUserDrawer } from './CreateUserDrawer';
import { useClients } from '../../../context/ClientsContext';

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
  

export const ClientTable = ( {showDrawerUser, onCloseDrawer } : any ) => {
	const [selectedUser, setSelectedUser] = useState<DataType | null>(null);
	const [open, setOpen] = useState(false);
	const { clients, fetchClients } = useClients();

	useEffect(() => {
		fetchClients();
	  }, []);

	  const showDrawer = (user: DataType) => {
		setSelectedUser(user);
		setOpen(true);
	  };

	const ClientColumns = (showDrawer: (user: DataType) => void) => [
		{
		  title: <span className="pl-5">Full Name</span>,
		  dataIndex: "FullName",
		  render: (_text: string, record: DataType) => (
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
			<Tag color={text.toLocaleLowerCase() === "client" ? "blue" : "green"}>
			  {text}
			</Tag>
		  ),
		},
		{
		  title: <span className="pl-3">Actions</span>,
		  key: "actions",
		  width: 100,
		  render: (_text: string, record: DataType) => (
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
  return (
	<>
	{showDrawerUser && (
        <CreateUserDrawer
          open={showDrawerUser}
          onClose={onCloseDrawer}
          fetchClients={fetchClients}
        />
      )}
	<ClientsInfoDrawer
        fetchClients={fetchClients}
        selectedUser={selectedUser}
        open={open}
        setOpen={setOpen}
      />
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
		</>
  )
}
