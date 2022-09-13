import { useEffect} from 'react'
import { Input, Avatar, List, Typography, Button } from "antd";

import "./ContactList.css"
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchContacts, selectContactList } from '../store/slices/contact/contactSlice';

const { Title } = Typography;
const { Search } = Input;

export const ContactList = () => {
  const contactList = useAppSelector(selectContactList)
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    console.log(event.target.value);

  useEffect(() => {
    dispatch(fetchContacts())
  }, [dispatch])

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
