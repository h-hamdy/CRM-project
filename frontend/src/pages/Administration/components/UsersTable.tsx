import { Button, Table } from "antd";
import { TeamOutlined, PlusCircleOutlined } from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import profile from "/src/assets/profile.jpeg";
import { useEffect, useState } from "react";
import axios from "axios";
import { CreateUserModal } from "./CreateUserModal";

interface DataType {
  id: React.Key;
  firstName: string;
  lastName: string;
  Email: string;
  Phone: string;
  PictureUrl: string;
}
export const UsersTable = () => {
  const [users, setUsers] = useState<DataType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [users]);

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

  const tableTitle = () => (
    <div className="w-full p-2">
      <div className="flex justify-between items-center">
        <span className="flex text-base items-center pl-2 font-semibold">
          <TeamOutlined className="mr-2" />
          Contacts
        </span>
        <span className="pr-4 text-gray-400">
          Total users:{" "}
          <span className="text-black font-bold">{users.length}</span>
        </span>
      </div>
    </div>
  );

  
const userColumns: TableColumnsType<DataType> = [
	{
	  title: <span className="pl-5">Full Name</span>,
	  dataIndex: "FullName",
	  render: (_text: string, record: DataType) => (
		<div className="flex items-center pl-4">
		  <img
			src={record.PictureUrl || profile}
			className="w-[30px] h-[30px] rounded-full mr-2"
			alt="profile"
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
	  dataIndex: "number",
	},
  ];
  return (
    <>
      {isModalOpen && (
        <CreateUserModal
          setIsModalOpen={setIsModalOpen}
          fetchUsers={fetchUsers}
          isModalOpen={isModalOpen}
          handleCancel={handleCancel}
        />
      )}
      <div className="xl:w-3/5 w-full">
        <div className="flex flex-col gap-10">
          <Button
            icon={<PlusCircleOutlined />}
            className="h-[40px] w-[150px] rounded-lg"
            type="primary"
            onClick={showModal}
          >
            Add New User
          </Button>
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
      </div>
    </>
  );
};
