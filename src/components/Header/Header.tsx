import s from "./Header.module.css"
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import {useAppDispatch} from "../../store/hooks";
import {logOut} from "../../store/slices//auth/authSlice"
import { useNavigate } from "react-router-dom";
import { Endpoints } from "../../shared/constants"

export const Header = () => {
     const dispatch = useAppDispatch();
     const navigate = useNavigate();

     const handleLogout = () => {
    dispatch(logOut());
     navigate(Endpoints.Login);
}

  return (
    <header className={s.header}>
      <div>
        <span>Користувач, </span>
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
