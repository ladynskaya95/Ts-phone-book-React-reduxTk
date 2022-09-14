import { PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Modal, Input, Button, Alert } from "antd";
import { useState } from "react";
import {
  ContactItem,
  editContact,
  selectContactStatus,
} from "../../store/slices/contact/contactSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

type EditFormValues = {
  name: string;
  phone: string;
};

type Props = {
  isEditFormVisible: boolean;
  hideEditForm: () => void;
  selectedContact: ContactItem | null;
};

export const EditForm = ({
  isEditFormVisible,
  hideEditForm,
  selectedContact,
}: Props) => {
  const [error, setError] = useState("");
  const status = useAppSelector(selectContactStatus);
  const dispatch = useAppDispatch();

  const onFinish = async ({ name, phone }: EditFormValues) => {
    if (!selectedContact) return;

    await dispatch(editContact({ ...selectedContact, name, phone }))
      .unwrap()
      .then(hideEditForm)
      .catch((err) => setError(err));
  };

  return (
    <Modal
      title="Додавання контакту"
      visible={isEditFormVisible}
      onCancel={hideEditForm}
      width={400}
      centered
      footer={null}
    >
      <Form
        initialValues={{
          name: "selectedContact?.name",
          phone: "selectedContact?.phone",
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          rules={[
            { required: true, message: "Будь ласка, введіть ім'я контакту" },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Назва контакту"
          />
        </Form.Item>

        <Form.Item
          name="phone"
          rules={[
            { required: true, message: "Будь ласка, введіть номер телефону" },
          ]}
        >
          <Input
            prefix={<PhoneOutlined className="site-form-item-icon" />}
            placeholder="Номер телефону"
          />
        </Form.Item>

        <Form.Item>
          <Button
            loading={status === "loading"}
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
          >
            Зберегти
          </Button>
        </Form.Item>
      </Form>
      {error && <Alert message={error} type="error" />}
    </Modal>
  );
};
