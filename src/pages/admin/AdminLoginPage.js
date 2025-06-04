import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post('/api/auth/admin-login/', values);
      localStorage.setItem('adminToken', res.data.token);
      message.success(t('admin.login.success'));
      navigate('/admin');
    } catch (e) {
      message.error(t('admin.login.error'));
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f2f5' }}>
      <Card style={{ width: 350 }}>
        <h2 style={{ textAlign: 'center', marginBottom: 24 }}>{t('admin.login.title')}</h2>
        <Form name="admin_login" onFinish={onFinish}>
          <Form.Item name="username" rules={[{ required: true, message: t('admin.login.usernameRequired') }]}> 
            <Input prefix={<UserOutlined />} placeholder={t('admin.login.username')} />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: t('admin.login.passwordRequired') }]}> 
            <Input.Password prefix={<LockOutlined />} placeholder={t('admin.login.password')} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              {t('admin.login.submit')}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AdminLoginPage; 