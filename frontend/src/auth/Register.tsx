import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

type FieldType = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
};

export const Register = () => {
  const navigate = useNavigate();
  const onFinish = async (values: FieldType) => {
    try {
      await axios.post("http://localhost:3333/auth/signup", values);
      navigate("/sign-in");
    } catch (error) {
      console.error("Failed:", error);
    }
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
            className="w-full"
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
              label="Email"
              name="email"
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
              label="Password"
              name="password"
              rules={[
                {
                  validator: (_, value) => {
                    if (!value) {
                      return Promise.reject(
                        new Error("Please input the Password!")
                      );
                    }
                    if (value.length < 8) {
                      return Promise.reject(
                        new Error(
                          "Password must be at least 8 characters long!"
                        )
                      );
                    }
                    if (!/[A-Z]/.test(value)) {
                      return Promise.reject(
                        new Error(
                          "Password must contain at least one uppercase letter!"
                        )
                      );
                    }
                    if (!/[a-z]/.test(value)) {
                      return Promise.reject(
                        new Error(
                          "Password must contain at least one lowercase letter!"
                        )
                      );
                    }
                    if (!/[0-9]/.test(value)) {
                      return Promise.reject(
                        new Error("Password must contain at least one digit!")
                      );
                    }
                    if (!/[!@#$%^&*]/.test(value)) {
                      return Promise.reject(
                        new Error(
                          "Password must contain at least one special character!"
                        )
                      );
                    }
                    return Promise.resolve();
                  },
                },
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
