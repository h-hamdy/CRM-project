// import React from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

type FieldType = {
  username?: string;
  password?: string;
  remember?: boolean;
};

export const Login = () => {
	const navigate = useNavigate();
	const onFinish = async (values: FieldType) => {
		try {
		  const response = await axios.post('http://localhost:3333/auth/signin',  values, {withCredentials: true});
		  navigate('/');
		} catch (error) {
		  console.error('Failed:', error);
		}
	  };

  const onFinishFailed = (errorInfo: any) => {
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
              rules={[{ required: true, message: "Please input your Email!" },
				{ type: 'email', message: "Please enter a valid Email!" },]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input className="h-[35px]" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
				{
					validator: (_, value) => {
					  if (!value) {
						return Promise.reject(new Error('Please input the Password!'));
					  }
					  if (value.length < 8) {
						return Promise.reject(new Error('Password must be at least 8 characters long!'));
					  }
					  if (!/[A-Z]/.test(value)) {
						return Promise.reject(new Error('Password must contain at least one uppercase letter!'));
					  }
					  if (!/[a-z]/.test(value)) {
						return Promise.reject(new Error('Password must contain at least one lowercase letter!'));
					  }
					  if (!/[0-9]/.test(value)) {
						return Promise.reject(new Error('Password must contain at least one digit!'));
					  }
					  if (!/[!@#$%^&*]/.test(value)) {
						return Promise.reject(new Error('Password must contain at least one special character!'));
					  }
					  return Promise.resolve();
					}},
				]}
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

