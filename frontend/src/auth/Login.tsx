import React from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import { Link } from 'react-router-dom';

type FieldType = {
  username?: string;
  password?: string;
  remember?: boolean;
};

export const Login = () => {
  const onFinish = (values: FieldType) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-whiteBackground">
        <div className="flex flex-col items-center justify-around bg-white w-[400px] h-[450px] drop-shadow-md rounded-lg p-10">
          <p className="text-primary leading-8 text-lg tracking-wide font-bold pb-5">
            Sign in to your account
          </p>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className="w-full"
			requiredMark={false}
          >
        
		<Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: 'Please input your Email!' }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input className="h-[35px]" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input.Password className="h-[35px]" />
            </Form.Item>

            <div className="flex justify-between items-center pb-5">
              <Form.Item<FieldType>
                name="remember"
                className="m-0"
                valuePropName="checked"
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <button type="button">
                <div className="text-primary text-sm">Forget password?</div>
              </button>
            </div>

            <Form.Item>
				<Button className='w-full h-[38px]' type="primary" htmlType="submit">
					Submit
				</Button>
				</Form.Item>
				<div className="flex justify-center w-full text-[13px] font-light">
              You don't have an account
			  	<Link to="/sign-up">
					<button className="text-primary ml-2">Sign Up</button>
				</Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};
