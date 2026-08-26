import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Alert, Button, Card, Form, Input, Select, Space, Spin, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { fetchPost, resetPostForm, savePost } from '../store/posts/actions';
import { fetchAuthors } from '../store/authors/actions';
import { fetchTags } from '../store/tags/actions';
import { RootState } from '../store';

const PostFormPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id?: string }>();
  const postId = id ? Number(id) : null;

  const { current, currentLoading, saving, saveError, validationErrors } = useSelector(
    (s: RootState) => s.posts,
  );
  const authors = useSelector((s: RootState) => s.authors.items);
  const tags = useSelector((s: RootState) => s.tags.items);

  const [form] = Form.useForm();

  useEffect(() => {
    if (postId) {
      dispatch(fetchPost(postId));
    }
    dispatch(fetchAuthors());
    dispatch(fetchTags());
    return () => {
      dispatch(resetPostForm());
    };
  }, [dispatch, postId]);

  useEffect(() => {
    if (current) {
      form.setFieldsValue({
        title: current.title,
        code: current.code,
        authorId: current.author?.id,
        tagIds: current.tags.map((t) => t.id),
        text: current.text,
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
    fd.append('title', values.title || '');
    fd.append('code', values.code || '');
    if (values.authorId) {
      fd.append('authorId', String(values.authorId));
    }
    (values.tagIds || []).forEach((tagId: number) => fd.append('tagIds[]', String(tagId)));
    fd.append('text', values.text || '');
    if (values.previewPicture?.[0]?.originFileObj) {
      fd.append('previewPicture', values.previewPicture[0].originFileObj);
    }
    dispatch(savePost(postId, fd));
  };

  if (currentLoading) {
    return <Spin />;
  }

  return (
    <Card title={postId ? 'Редактирование поста' : 'Добавление поста'} style={{ maxWidth: 700 }}>
      {saveError && <Alert type="error" message={saveError} style={{ marginBottom: 16 }} />}
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="title" label="Заголовок">
          <Input />
        </Form.Item>
        <Form.Item name="code" label="Код">
          <Input />
        </Form.Item>
        <Form.Item name="authorId" label="Автор">
          <Select
            allowClear
            placeholder="Выберите автора"
            options={authors.map((a) => ({
              value: a.id,
              label: `${a.lastName} ${a.name} ${a.secondName}`,
            }))}
          />
        </Form.Item>
        <Form.Item name="tagIds" label="Теги">
          <Select
            mode="multiple"
            allowClear
            placeholder="Выберите теги"
            options={tags.map((t) => ({ value: t.id, label: t.name }))}
          />
        </Form.Item>
        <Form.Item name="text" label="Текст">
          <Input.TextArea rows={6} />
        </Form.Item>
        {current?.previewPicture && (
          <div style={{ marginBottom: 16 }}>
            <img src={current.previewPicture.url} alt="" style={{ maxWidth: 200 }} />
          </div>
        )}
        <Form.Item
          name="previewPicture"
          label="Превью"
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
          <Link to="/posts">
            <Button>Назад</Button>
          </Link>
        </Space>
      </Form>
    </Card>
  );
};

export default PostFormPage;
