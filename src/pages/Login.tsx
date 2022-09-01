import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Alert, Button, Form, Input, Typography } from "antd";
import { Endpoints, CONTACTS_URL } from "../../src/shared/constants";
import "./Login.css"
import React, { useState} from 'react';

type LoginValues = {
    userName: string
}

const { Title } = Typography;

type UserItem = {
  id: string,
  username: string,
  email: string,
  phone: string,
  
}

 export const Login  = () => {
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

      const onFinish = async ({userName}: LoginValues) => {
        setIsLoading(true)

        const response = await fetch(CONTACTS_URL);
        const userList: UserItem[] = await response.json()
        const foundUser = userList.find((user) => user.username === userName)
        console.log(userList);

        if(!foundUser) {
          setError("Такого користувача не існує")
          
        } else {
          setError("")
        }
        setIsLoading(false);
      };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ userName: "", password: "" }}
      onFinish={onFinish}
    >
      <Title>Авторизація</Title>
      <Form.Item
        name="userName"
        rules={[{ required: true, message: "Please input your Username!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Користувач"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Пароль"
        />
      </Form.Item>

      <Form.Item>
        <Button loading={isLoading} type="primary" htmlType="submit" className="login-form-button">
          Увійти
        </Button>
      </Form.Item>
      {error && <Alert message={error} type="error" />}
    </Form>
  );
 }