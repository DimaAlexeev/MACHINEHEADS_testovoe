import { ReactNode } from 'react';
import { Button, Layout, Menu } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../store/auth/actions';

const AppLayout = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const selectedKey = '/' + location.pathname.split('/')[1];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Sider>
        <div style={{ color: '#fff', textAlign: 'center', padding: 16, fontWeight: 'bold' }}>
          Админ-панель
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={[
            { key: '/posts', label: <Link to="/posts">Посты</Link> },
            { key: '/authors', label: <Link to="/authors">Авторы</Link> },
            { key: '/tags', label: <Link to="/tags">Теги</Link> },
          ]}
        />
      </Layout.Sider>
      <Layout>
        <Layout.Header style={{ background: '#fff', textAlign: 'right', paddingRight: 16 }}>
          <Button icon={<LogoutOutlined />} onClick={() => dispatch(logout())}>
            Выйти
          </Button>
        </Layout.Header>
        <Layout.Content style={{ margin: 16 }}>{children}</Layout.Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
