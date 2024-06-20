import { Button, Col, Drawer, Form, Input, Row, Select, Space } from 'antd';


const { Option } = Select;
export const CreateUserDrawer = ({onClose, open} : any) => {

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
            <Button onClick={onClose} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="FirstName"
                label="First Name"
                rules={[{ required: true, message: 'Please enter First Name' }]}
              >
                <Input placeholder="Please enter First Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
			<Form.Item
                name="LastName"
                label="Last Name"
                rules={[{ required: true, message: 'Please enter Last Name' }]}
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
                rules={[{ required: true, message: 'Please enter Email' }]}
              >
                <Input placeholder="Please enter Email" />
              </Form.Item>
            </Col>
            <Col span={12}>
			<Form.Item
                name="number"
                label="Number"
                rules={[{ required: true, message: 'Please enter Number' }]}
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
                rules={[{ required: true, message: 'Please choose the type' }]}
              >
                <Select placeholder="Please choose the type of the client">
                  <Option value="private">Client</Option>
                  <Option value="public">Company</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
			<Form.Item
                name="address"
                label="Address"
                rules={[{ required: true, message: 'Please enter Address' }]}
              >
                <Input placeholder="Please enter Address" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="note"
                label="Note"
                rules={[
                  {
                    required: true,
                    message: 'please enter url description',
                  },
                ]}
              >
                <Input.TextArea rows={4} placeholder="please enter url description" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
	</>
  )
}
