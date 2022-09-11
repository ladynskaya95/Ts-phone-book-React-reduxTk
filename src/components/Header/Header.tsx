import s from "./Header.module.css"
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {logOut} from "../../store/slices//auth/authSlice"
import { useNavigate } from "react-router-dom";
import { Endpoints } from "../../shared/constants"
import { selectUserData } from "../../store/slices/user/userSlice";

export const Header = () => {
     const dispatch = useAppDispatch();
     const navigate = useNavigate();

     const userData = useAppSelector(selectUserData);

     const handleLogout = () => {
      dispatch(logOut());
      navigate(Endpoints.Login);
}

  return (
    <header className={s.header}>
      <div>
        <span>{userData?.username}, </span>
        <Button
          type="primary"
          icon={<LogoutOutlined />}
          size="small"
          onClick={handleLogout}
        >
          Вийти
        </Button>
      </div>
    </header>
  );
}
