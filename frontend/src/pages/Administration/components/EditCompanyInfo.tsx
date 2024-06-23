import { Button, Modal } from "antd";
import { Form, Input } from "antd";
import axios from "axios";
import { notification } from "antd";

export const EditCompanyInfo = ({
  setIsModalVisible,
  isModalVisible,
  handleModalClose,
  fetchCompanyInfo,
}: any) => {
  const [form] = Form.useForm();

  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      await axios.post("http://localhost:3333/users/CompanyInfo", values, {
        withCredentials: true,
      });
      fetchCompanyInfo();
      form.resetFields();
      setIsModalVisible(false);
      notification.success({
        message: "Success",
        description: "Company Info Set successfully.",
      });
    } catch (error) {
      console.error("Error Updating Company Info:", error);
      notification.error({
        message: "Error",
        description:
          "There was an error Updating the Company Info. Please try again.",
      });
    }
  };

  return (
    <>
      <Modal
        title="Edit Company Info"
        open={isModalVisible}
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
        <Form form={form} requiredMark={false} layout="vertical">
          <Form.Item name="address" label="Address" className="pt-5">
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
        </Form>
      </Modal>
    </>
  );
};
