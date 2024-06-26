import { Button, Modal, Form, Input, Select, AutoComplete } from "antd";
import { useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";

import type { DefaultOptionType } from 'antd/es/select';
import { CreateUserDrawer } from "../Clients/components/CreateUserDrawer";

interface ModalTableProps {
  _isModalOpen: boolean;
  _handleCancel: () => void;
  _handleOk: () => void;
  columns: { title: string; dataIndex: string; key: string }[];
}

export const ModalTable = ({
  _isModalOpen,
  _handleCancel,
  _handleOk,
  columns,
}: ModalTableProps) => {
	const [options, setOptions] = useState<DefaultOptionType[]>([]);

  const [showDrawerUser, setShowDrawer] = useState(false);

  const _showDrawer = () => {
    setShowDrawer(true);
  };

  const onCloseDrawer = () => {
    setShowDrawer(false);
  };

  const handleSearch = (value: string) => {
    setOptions(() => {
      if (!value || value.includes('@')) {
        return [];
      }
      return ['gmail.com', '163.com', 'qq.com'].map<DefaultOptionType>((domain) => ({
        label: `${value}@${domain}`,
        value: `${value}@${domain}`,
      }));
    });
  };

  return (
    <>
      {showDrawerUser && (
        <CreateUserDrawer open={showDrawerUser} onClose={onCloseDrawer} />
      )}
      <Modal
        title="Add a Product"
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
      onSearch={handleSearch}
      placeholder="input Search Name"
      options={options}
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
