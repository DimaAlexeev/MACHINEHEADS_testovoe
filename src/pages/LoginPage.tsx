import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Alert, Button, Card, Form, Input } from 'antd';
import { login } from '../store/auth/actions';
import { RootState } from '../store';

const LoginPage = () => {
  const dispatch = useDispatch();
  const { isAuth, loading, error, validationErrors } = useSelector((s: RootState) => s.auth);
  const [form] = Form.useForm();

  // раскладываем ошибки с сервера по полям
  useEffect(() => {
    if (validationErrors.length) {
      form.setFields(validationErrors.map((e) => ({ name: e.field, errors: [e.message] })));
    }
  }, [validationErrors, form]);

  if (isAuth) {
    return <Redirect to="/posts" />;
  }

  const onFinish = (values: { email: string; password: string }) => {
    dispatch(login(values.email, values.password));
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f0f2f5',
      }}
    >
      <Card title="Вход в админ-панель" style={{ width: 400 }}>
        {error && <Alert type="error" message={error} style={{ marginBottom: 16 }} />}
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          // чтобы не вводить руками при проверке
          initialValues={{ email: 'test@test.ru', password: 'khro2ij3n2730' }}
        >
          <Form.Item
            name="email"
            label="E-mail"
            rules={[{ required: true, message: 'Введите e-mail' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Пароль"
            rules={[{ required: true, message: 'Введите пароль' }]}
          >
            <Input.Password />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Войти
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
