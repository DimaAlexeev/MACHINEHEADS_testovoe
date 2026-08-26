import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Form, Input, InputNumber, Modal, Popconfirm, Space, Table } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { deleteTag, fetchTags, resetTagForm, saveTag } from '../store/tags/actions';
import { RootState } from '../store';
import { Tag } from '../types';

const TagsListPage = () => {
  const dispatch = useDispatch();
  const { items, loading, error, saving, saveError, validationErrors } = useSelector(
    (s: RootState) => s.tags,
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  useEffect(() => {
    if (validationErrors.length) {
      form.setFields(validationErrors.map((e) => ({ name: e.field, errors: [e.message] })));
    }
  }, [validationErrors, form]);

  const openAdd = () => {
    setEditingId(null);
    form.resetFields();
    dispatch(resetTagForm());
    setModalOpen(true);
  };

  const openEdit = (tag: Tag) => {
    setEditingId(tag.id);
    form.setFieldsValue({ name: tag.name, code: tag.code, sort: tag.sort });
    dispatch(resetTagForm());
    setModalOpen(true);
  };

  const onFinish = (values: any) => {
    const fd = new FormData();
    fd.append('name', values.name || '');
    fd.append('code', values.code || '');
    fd.append('sort', String(values.sort ?? 0));
    dispatch(saveTag(editingId, fd, () => setModalOpen(false)));
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', width: 60 },
    { title: 'Название', dataIndex: 'name' },
    { title: 'Код', dataIndex: 'code' },
    { title: 'Сортировка', dataIndex: 'sort', width: 110 },
    {
      title: 'Обновлен',
      dataIndex: 'updatedAt',
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: '',
      key: 'actions',
      width: 100,
      render: (_: any, record: Tag) => (
        <Space>
          <Button size="small" icon={<EditOutlined />} onClick={() => openEdit(record)} />
          <Popconfirm title="Удалить тег?" onConfirm={() => dispatch(deleteTag(record.id))}>
            <Button size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>Теги</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={openAdd}>
          Добавить
        </Button>
      </div>
      {error && <Alert type="error" message={error} style={{ marginBottom: 16 }} />}
      <Table
        rowKey="id"
        columns={columns}
        dataSource={items}
        loading={loading}
        pagination={false}
      />

      <Modal
        title={editingId ? 'Редактирование тега' : 'Добавление тега'}
        open={modalOpen}
        onOk={() => form.submit()}
        onCancel={() => setModalOpen(false)}
        confirmLoading={saving}
        okText="Сохранить"
        cancelText="Отмена"
      >
        {saveError && <Alert type="error" message={saveError} style={{ marginBottom: 16 }} />}
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="name" label="Название">
            <Input />
          </Form.Item>
          <Form.Item name="code" label="Код">
            <Input />
          </Form.Item>
          <Form.Item name="sort" label="Сортировка">
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TagsListPage;
