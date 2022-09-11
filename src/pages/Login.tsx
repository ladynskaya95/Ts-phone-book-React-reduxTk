import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Alert, Button, Form, Input, Typography } from "antd";
import { Endpoints, CONTACTS_URL } from "../../src/shared/constants";
import "./Login.css"

import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logIn } from '../store/slices/auth/authSlice';
import { fetchUsers } from '../store/slices/user/userSlice';
import {
  selectUserError,
  selectUserStatus
} from "../store/slices/user/userSlice";


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

 export const Login = () => {
    const status = useAppSelector(selectUserStatus);
    const error = useAppSelector(selectUserError);

   const navigate = useNavigate()
   const dispatch = useAppDispatch()

   const onFinish = async ({ userName }: LoginValues) => {
     try{
        const isUserFound = await dispatch(fetchUsers(userName)).unwrap();

        if (isUserFound) {
          dispatch(logIn());
          navigate(Endpoints.Contacts)
        }
     } catch (err) {
        console.log(err)
     }
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
         <Button
           loading={status === "loading"}
           type="primary"
           htmlType="submit"
           className="login-form-button"
         >
           Увійти
         </Button>
       </Form.Item>
       {error && <Alert message={error} type="error" />}
     </Form>
   );
 };