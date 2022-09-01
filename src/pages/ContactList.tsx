import React, { useEffect, useState } from 'react'
import { Avatar, List } from 'antd';
import { Endpoints, CONTACTLIST_URL } from "../../src/shared/constants";

type ContactItem = {
  id: string,
  name: string,
  phone: string
}

export const ContactList = () => {
const [contactList, setContactList] = useState<ContactItem[]>([])
  useEffect(() => {
    fetch(CONTACTLIST_URL)
    .then(res=> res.json())
    .then(res=> setContactList(res))
  }, [])
  return (
    <List
    itemLayout="horizontal"
    dataSource={contactList}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title={item.name}
          description={item.phone}
        />
      </List.Item>
  )
}
