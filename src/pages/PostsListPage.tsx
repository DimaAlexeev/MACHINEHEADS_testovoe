import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Alert, Button, Popconfirm, Space, Table } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { deletePost, fetchPosts } from '../store/posts/actions';
import { RootState } from '../store';
import { Post } from '../types';

const PostsListPage = () => {
  const dispatch = useDispatch();
  const { items, loading, error, page, perPage, total } = useSelector((s: RootState) => s.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const columns = [
    { title: 'ID', dataIndex: 'id', width: 60 },
    {
      title: 'Превью',
      dataIndex: 'previewPicture',
      width: 90,
      render: (pic: Post['previewPicture']) =>
        pic ? <img src={pic.url} alt="" width={60} /> : null,
    },
    { title: 'Заголовок', dataIndex: 'title' },
    { title: 'Код', dataIndex: 'code' },
    { title: 'Автор', dataIndex: 'authorName' },
    {
      title: 'Теги',
      dataIndex: 'tagNames',
      render: (tags: string[]) => tags.join(', '),
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
      render: (_: any, record: Post) => (
        <Space>
          <Link to={`/posts/${record.id}/edit`}>
            <Button size="small" icon={<EditOutlined />} />
          </Link>
          <Popconfirm title="Удалить пост?" onConfirm={() => dispatch(deletePost(record.id))}>
            <Button size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>Посты</h2>
        <Link to="/posts/add">
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
        pagination={{
          current: page,
          pageSize: perPage,
          total,
          showSizeChanger: false,
          onChange: (p) => dispatch(fetchPosts(p)),
        }}
      />
    </div>
  );
};

export default PostsListPage;
