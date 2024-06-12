import React from "react";
import { Form, Input, Checkbox, Button } from "antd";
import { Link } from "react-router-dom";
type FieldType = {
  username?: string;
  password?: string;
  remember?: boolean;
};

export const Register = () => {
  const onFinish = (values: FieldType) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-whiteBackground">
        <div className="flex flex-col items-center justify-around bg-white w-[400px] h-[610px] drop-shadow-md rounded-lg p-10">
          <p className="text-primary leading-8 text-lg tracking-wide font-bold pb-5">
            Sign Up to your account
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
              label="First Name"
			  name="first name"
              rules={[
                { required: true, message: "Please input your Fisrt Name!" },
              ]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input className="h-[35px]" />
            </Form.Item>

            <Form.Item
              label="Last Name"
			  name="last name"
              rules={[
                { required: true, message: "Please input your last Name!" },
              ]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input className="h-[35px]" />
            </Form.Item>
            <Form.Item
              label="Email"
			  name="Email"
              rules={[{ required: true, message: "Please input your Email!" }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input className="h-[35px]" />
            </Form.Item>

            <Form.Item
              label="Password"
			  name="Password"
              rules={[
                { required: true, message: "Please input The Password!" },
              ]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              className="pb-5"
            >
              <Input.Password className="h-[35px]" />
            </Form.Item>

            <Form.Item>
              <Button
                className="w-full h-[38px]"
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </Form.Item>
            <div className="flex justify-center w-full text-[13px] font-light">
              You already have account?
			  	<Link to="/sign-in">
					<button className="text-primary ml-2">Sign in</button>
				</Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};
