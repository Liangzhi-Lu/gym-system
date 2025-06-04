import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Space, Popconfirm, message } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const AdminUserPage = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/users/', { params: { search } });
      setUsers(res.data.results || res.data); 
    } catch (e) {
      message.error(t('admin.user.fetchError'));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, [search]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/users/${id}/`);
      message.success(t('admin.user.deleteSuccess'));
      fetchUsers();
    } catch {
      message.error(t('admin.user.deleteError'));
    }
  };

  const columns = [
    {
      title: t('admin.user.username'),
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: t('admin.user.email'),
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: t('admin.user.role'),
      dataIndex: 'role',
      key: 'role',
      render: (role) => role || t('admin.user.member'),
    },
    {
      title: t('admin.user.actions'),
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} size="small" type="primary" ghost>
            {t('admin.user.edit')}
          </Button>
          <Popconfirm
            title={t('admin.user.confirmDelete')}
            onConfirm={() => handleDelete(record.id)}
          >
            <Button icon={<DeleteOutlined />} size="small" danger>
              {t('admin.user.delete')}
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1 style={{ fontSize: 28, marginBottom: 24 }}>{t('admin.user.title')}</h1>
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder={t('admin.user.searchPlaceholder')}
          prefix={<SearchOutlined />}
          value={search}
          onChange={e => setSearch(e.target.value)}
          allowClear
        />
        <Button type="primary" icon={<PlusOutlined />}>
          {t('admin.user.add')}
        </Button>
      </Space>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={users}
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default AdminUserPage; 