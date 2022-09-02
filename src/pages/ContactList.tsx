import { useEffect, useState } from 'react'
import { Input, Avatar, List, Typography, Button } from "antd";
import { Endpoints, CONTACTLIST_URL } from "../../src/shared/constants";
import "./ContactList.css"

const { Title } = Typography;
const { Search } = Input;

type ContactItem = {
  id: string,
  name: string,
  phone: string
}

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => console.log(event.target.value);

export const ContactList = () => {
const [contactList, setContactList] = useState<ContactItem[]>([])
  useEffect(() => {
    fetch(CONTACTLIST_URL)
    .then(res=> res.json())
    .then(res=> setContactList(res))
  }, [])
  return (
    <div className="contactList">
      <Search placeholder="Знайти контакти" className="contactSearch"  enterButton
      onChange={handleChange} />
      <Title>Список контактів</Title>
      <List
        bordered
        itemLayout="horizontal"
        dataSource={contactList}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button key="list-loadmore-edit">змінити</Button>,
              <Button key="list-loadmore-more">видалити</Button>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={item.name}
              description={item.phone}
            />
          </List.Item>
        )}
      />
      <Button className="add-btn" type="primary">
        Додати новий контакт
      </Button>
    </div>
  );
}
