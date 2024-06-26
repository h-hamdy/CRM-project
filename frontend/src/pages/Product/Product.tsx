import { Button, notification, Modal, Form, Input } from 'antd'
import { PlusOutlined, MinusCircleOutlined  } from "@ant-design/icons";
import { useState } from 'react';

  
const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 32, offset: 0 },
      sm: { span: 24, offset: 0 },
    },
  };
  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
  };

export const Product = () => {
	const [api, contextHolder] = notification.useNotification();
	const [isModalOpen, setIsModalOpen] = useState(false);


	const handleOk = () => {
		setIsModalOpen(false);
	  };
	
	  const handleCancel = () => {
		setIsModalOpen(false);
	  };
	

	const openNotification = (pauseOnHover: boolean) => () => {
		api.info({
		  message: 'Notification Title',
		  description:
			'Please create a product table column to proceed. Using the following Modal',
		  showProgress: true,
		  pauseOnHover,
		  onClose: () => {
			setIsModalOpen(true);
		  },
		});
	  };
  return (
	<>
	{contextHolder}
		<div className='flex'>
		<Button
          icon={<PlusOutlined />}
          className="h-[40px] w-[190px] rounded-lg"
          type="primary"
          onClick={openNotification(true)}
        >
          Add New Product
        </Button>
		</div>
		<Modal
        title="Create Table Title Column"
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
          {...formItemLayoutWithOutLabel}
          onFinish={onFinish}
          className='w-full p-5 pt-5'
        >
          <Form.List name="names">
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    {...(index === 0 && formItemLayoutWithOutLabel)}
                    required={false}
                    key={field.key}
                    className="mb-3"
                  >
                    <Form.Item
                      {...field}
                      validateTrigger={['onChange', 'onBlur']}
                    >
                      <Input placeholder="Table Title" className='w-full h-[40px]' />
                    </Form.Item>
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button
                    className='flex items-center w-full justify-center h-[40px]'
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    Add Table Column
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
	</>
  )
}
