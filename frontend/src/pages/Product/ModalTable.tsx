import { Button, Modal } from "antd";
import { Form, Input } from "antd";
import { notification } from "antd";
import axios from "axios";

export const ModalTable = ( {setIsModalOpen,isModalOpen,handleCancel } : any) => {
  return (
    <Modal
      title="Create New User"
      open={isModalOpen}
      onOk={setIsModalOpen}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary">
          Create
        </Button>,
      ]}
    >
      <Form
        //   form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
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
  );
};
