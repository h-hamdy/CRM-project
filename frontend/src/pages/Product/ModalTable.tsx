import { Button, Modal, Form, Input, Select, AutoComplete } from "antd";
import { useState } from "react";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";

import type { SearchProps } from "antd/es/input/Search";
import { CreateUserDrawer } from "../Clients/components/CreateUserDrawer";

interface ModalTableProps {
  _isModalOpen: boolean;
  _handleCancel: () => void;
  _handleOk: () => void;
  columns: { title: string; dataIndex: string; key: string }[];
}

const { Option } = Select;
const { Search } = Input;

const onSearch = (value: string) => {
  // Simulated data for demonstration
  const searchData = [
    "Client A",
    "Client B",
    "Client C",
    "Client A",
    "Client B",
    "Client C",
    "Client A",
    "Client B",
    "Client C",
    "Client A",
    "Client hg",
    "Client C",
    "Client A",
    "Client B",
    "Client C",
  ]; // Replace with your actual search logic

  // Implement your search logic here and update searchData with actual matched results

  // For demonstration, set the matched data to state or context
  // setMatchedData(searchData);
};

export const ModalTable = ({
  _isModalOpen,
  _handleCancel,
  _handleOk,
  columns,
}: ModalTableProps) => {
  const [options, setOptions] = useState<string[]>([]);

  const [showDrawerUser, setShowDrawer] = useState(false);

  const _showDrawer = () => {
    setShowDrawer(true);
  };

  const onCloseDrawer = () => {
    setShowDrawer(false);
  };

  return (
    <>
      {showDrawerUser && (
        <CreateUserDrawer open={showDrawerUser} onClose={onCloseDrawer} />
      )}
      <Modal
        title="Create Table Title Column"
        open={_isModalOpen}
        onOk={_handleOk}
        onCancel={_handleCancel}
        footer={[
          <Button key="back" onClick={_handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={_handleOk}>
            Create
          </Button>,
        ]}
      >
        <Form
          className="p-5"
          layout="vertical"
          initialValues={{ remember: true }}
          autoComplete="off"
          requiredMark={false}
        >
          {columns.map((column) => (
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
                    className="w-full h-[35px]"
                    options={[
                      { value: "Client A" },
                      { value: "Client B" },
                      { value: "Client C" },
                      { value: "Client C" },
                      { value: "Client C" },
                      { value: "Client C" },
                    ]} // Replace with your matched data
                    placeholder="Search Client Name"
                    onSearch={onSearch}
                  />

                  <button onClick={_showDrawer} className=" flex w-[35px] h-[35px] rounded-md bg-gray-100 items-center justify-center hover:border hover:text-blue-500 hover:border-blue-500">
                    <PlusCircleOutlined />
                  </button>
                </div>
              ) : (
                <Input
                  placeholder={`Enter ${column.title}`}
                  className="h-[35px]"
                />
              )}
            </Form.Item>
          ))}
        </Form>
      </Modal>
    </>
  );
};
