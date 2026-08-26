import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Alert, Avatar, Button, Popconfirm, Space, Table } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { deleteAuthor, fetchAuthors } from '../store/authors/actions';
import { RootState } from '../store';
import { Author } from '../types';

const AuthorsListPage = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((s: RootState) => s.authors);

  useEffect(() => {
    dispatch(fetchAuthors());
  }, [dispatch]);

  const columns = [
    { title: 'ID', dataIndex: 'id', width: 60 },
    {
      title: 'Аватар',
      dataIndex: 'avatar',
      width: 80,
      render: (avatar: Author['avatar']) => <Avatar src={avatar?.url} icon={<UserOutlined />} />,
    },
    {
      title: 'ФИО',
      key: 'fio',
      render: (_: any, a: Author) => `${a.lastName} ${a.name} ${a.secondName}`,
    },
    {
      title: 'Обновлен',
      dataIndex: 'updatedAt',
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: '',
      key: 'actions',
      width: 100,
      render: (_: any, record: Author) => (
        <Space>
          <Link to={`/authors/${record.id}/edit`}>
            <Button size="small" icon={<EditOutlined />} />
          </Link>
          <Popconfirm title="Удалить автора?" onConfirm={() => dispatch(deleteAuthor(record.id))}>
            <Button size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>Авторы</h2>
        <Link to="/authors/add">
          <Button type="primary" icon={<PlusOutlined />}>
            Добавить
          </Button>
        </Link>
      </div>
      {error && <Alert type="error" message={error} style={{ marginBottom: 16 }} />}
      <Table
        rowKey="id"
        columns={columns}
        dataSource={items}
        loading={loading}
        pagination={false}
      />
    </div>
  );
};

export default AuthorsListPage;
