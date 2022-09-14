import { useEffect, useState} from 'react'
import { Input, Avatar, List, Typography, Button, Modal } from "antd";

import "./ContactList.css"
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { ContactItem, deleteContact, fetchContacts, selectContactList, selectContactStatus } from '../../store/slices/contact/contactSlice';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { AddForm } from './AddForm';
import { EditForm } from './EditForm';

const { Title } = Typography;
const { Search } = Input;
const { confirm } = Modal;

export const ContactList = () => {
   const [isAddFormVisible, setIsAddFormVisible] = useState(false);
   const [isEditFormVisible, setIsEditFormVisible] = useState(false);
   const [selectedContact, setSelectedContact] = useState<ContactItem | null>(
     null
   );

  const contactList = useAppSelector(selectContactList);
  const status = useAppSelector(selectContactStatus);
  const dispatch = useAppDispatch();

  const showAddForm = () => setIsAddFormVisible(true);
  const hideAddForm = () => setIsAddFormVisible(false);

  const showEditForm = (contactItem: ContactItem) => {
    setIsEditFormVisible(true);
    setSelectedContact(contactItem);
  };
  const hideEditForm = () => setIsEditFormVisible(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    console.log(event.target.value);

  useEffect(() => {
    dispatch(fetchContacts())
  }, [dispatch])

  const handleDeletion = (id: string) => {
    dispatch(deleteContact(id))
  };

  return (
    <div className="contactList">
      <Search
        placeholder="Знайти контакти"
        className="contactSearch"
        enterButton
        onChange={handleChange}
      />
      <Title>Список контактів</Title>
      <List
        bordered
        itemLayout="horizontal"
        dataSource={contactList}
        renderItem={(contact) => (
          <List.Item
            actions={[
              <Button onClick={() => showEditForm(contact)}
               key="list-loadmore-edit">змінити</Button>,
              <Button
                onClick={() => handleDeletion(contact.id)}
                key="list-loadmore-more"
                danger
              >
                видалити
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={contact.name}
              description={contact.phone}
            />
          </List.Item>
        )}
      />
      <Button onClick={showAddForm} className="add-btn" type="primary">
        Додати новий контакт
      </Button>
      {isAddFormVisible && (
        <AddForm
          isAddFormVisible={isAddFormVisible}
          hideAddForm={hideAddForm}
        />
      )}
      {isEditFormVisible && (
        <EditForm
          isEditFormVisible={isEditFormVisible}
          hideEditForm={hideEditForm}
          selectedContact={selectedContact}
        />
      )}
    </div>
  );
}
