import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Alert, Button, Card, Form, Input, Space, Spin, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { fetchAuthor, resetAuthorForm, saveAuthor } from '../store/authors/actions';
import { RootState } from '../store';

const AuthorFormPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id?: string }>();
  const authorId = id ? Number(id) : null;

  const { current, currentLoading, saving, saveError, validationErrors } = useSelector(
    (s: RootState) => s.authors,
  );

  const [form] = Form.useForm();

  useEffect(() => {
    if (authorId) {
      dispatch(fetchAuthor(authorId));
    }
    return () => {
      dispatch(resetAuthorForm());
    };
  }, [dispatch, authorId]);

  useEffect(() => {
    if (current) {
      form.setFieldsValue({
        lastName: current.lastName,
        name: current.name,
        secondName: current.secondName,
        shortDescription: current.shortDescription,
        description: current.description,
      });
    }
  }, [current, form]);

  useEffect(() => {
    if (validationErrors.length) {
      form.setFields(validationErrors.map((e) => ({ name: e.field, errors: [e.message] })));
    }
  }, [validationErrors, form]);

  const onFinish = (values: any) => {
    const fd = new FormData();
    fd.append('name', values.name || '');
    fd.append('lastName', values.lastName || '');
    fd.append('secondName', values.secondName || '');
    fd.append('shortDescription', values.shortDescription || '');
    fd.append('description', values.description || '');
    if (values.avatar?.[0]?.originFileObj) {
      fd.append('avatar', values.avatar[0].originFileObj);
    }
    dispatch(saveAuthor(authorId, fd));
  };

  if (currentLoading) {
    return <Spin />;
  }

  return (
    <Card
      title={authorId ? 'Редактирование автора' : 'Добавление автора'}
      style={{ maxWidth: 700 }}
    >
      {saveError && <Alert type="error" message={saveError} style={{ marginBottom: 16 }} />}
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="lastName" label="Фамилия">
          <Input />
        </Form.Item>
        <Form.Item name="name" label="Имя">
          <Input />
        </Form.Item>
        <Form.Item name="secondName" label="Отчество">
          <Input />
        </Form.Item>
        <Form.Item name="shortDescription" label="Краткое описание">
          <Input.TextArea rows={2} />
        </Form.Item>
        <Form.Item name="description" label="Описание">
          <Input.TextArea rows={4} />
        </Form.Item>
        {current?.avatar && (
          <div style={{ marginBottom: 16 }}>
            <img src={current.avatar.url} alt="" style={{ maxWidth: 120 }} />
          </div>
        )}
        <Form.Item
          name="avatar"
          label="Аватар"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
        >
          <Upload beforeUpload={() => false} maxCount={1} listType="picture">
            <Button icon={<UploadOutlined />}>Выбрать файл</Button>
          </Upload>
        </Form.Item>
        <Space>
          <Button type="primary" htmlType="submit" loading={saving}>
            Сохранить
          </Button>
          <Link to="/authors">
            <Button>Назад</Button>
          </Link>
        </Space>
      </Form>
    </Card>
  );
};

export default AuthorFormPage;
