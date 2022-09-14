import { PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Modal, Input, Button, Alert } from "antd";
import { useState } from "react";
import { addContact, selectContactStatus } from "../../store/slices/contact/contactSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

type AddFormValues = {
  name: string;
  phone: string;
};

type Props = {
  isAddFormVisible: boolean;
  hideAddForm: () => void;
};

export const AddForm = ({ isAddFormVisible, hideAddForm }: Props) => {
    const [error, setError] = useState("");
    const status = useAppSelector(selectContactStatus);
    const dispatch = useAppDispatch();

    const onFinish = async ({ name, phone }: AddFormValues) => {
      await dispatch(addContact({ name, phone }))
        .unwrap()
        .then(hideAddForm)
        .catch((err) => setError(err));
    };

  return (
    <Modal
      title="Додавання контакту"
        visible={isAddFormVisible}
        onCancel={hideAddForm}
      width={400}
      centered
      footer={null}
    >
      <Form
        initialValues={{ name: "", phone: "" }}
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
            Додати
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
