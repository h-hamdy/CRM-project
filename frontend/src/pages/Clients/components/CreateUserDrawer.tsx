import { Button, Col, Drawer, Form, Input, Row, Select, Space } from "antd";
import axios from "axios";
import { notification } from "antd";


const { Option } = Select;
export const CreateUserDrawer = ({ onClose, open, fetchClients }: any) => {
  const [form] = Form.useForm();

  const CreateClient = async () => {
    try {
      const values = await form.validateFields();
      await axios.post("http://localhost:3333/clients/create", values, {
        withCredentials: true,
      });
      onClose();
	  fetchClients();
	  notification.success({
        message: "Success",
        description: "Client created successfully.",
      });

    } catch (error) {
      console.error("Error creating client:", error);
	  notification.error({
        message: "Error",
        description: "There was an error creating the Client. Please try again.",
      });
    }
  };

  return (
    <>
      <Drawer
        title="Create a new Client"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={CreateClient} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form form={form} layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[{ required: true, message: "Please enter First Name" }]}
              >
                <Input placeholder="Please enter First Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{ required: true, message: "Please enter Last Name" }]}
              >
                <Input placeholder="Please enter Last Name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: "Please enter Email" }]}
              >
                <Input placeholder="Please enter Email" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="Number"
                rules={[{ required: true, message: "Please enter Number" }]}
              >
                <Input placeholder="Please enter Your Number" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Type"
                rules={[{ required: true, message: "Please choose the type" }]}
              >
                <Select placeholder="Please choose the type of the client">
                  <Option value="Client">Client</Option>
                  <Option value="Company">Company</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="address" label="Address">
                <Input placeholder="Please enter Address" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="note" label="Note">
                <Input.TextArea
                  rows={4}
                  placeholder="please enter url description"
				  maxLength={75}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
