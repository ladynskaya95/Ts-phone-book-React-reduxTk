import s from "./Header.module.css"
import { Button } from "antd";

export const Header = () => {
  return (
    <header className={s.header}>
      <div>
        <span>Користувач, </span>
        <Button
          type="primary"
        //   icon={<LogoutOutlined />}
          size="small"
        //   onClick={handleLogout}
        >
          Вийти
        </Button>
      </div>
    </header>
  );
}
