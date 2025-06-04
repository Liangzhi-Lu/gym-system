import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { UserOutlined, TeamOutlined, DollarOutlined, CalendarOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const AdminDashboardPage = () => {
  const { t } = useTranslation();
  const stats = {
    users: 128,
    members: 86,
    orders: 245,
    courses: 18,
  };
  return (
    <div>
      <h1 style={{ fontSize: 28, marginBottom: 24 }}>{t('admin.dashboard.title')}</h1>
      <Row gutter={24}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic title={t('admin.dashboard.totalUsers')} value={stats.users} prefix={<UserOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic title={t('admin.dashboard.members')} value={stats.members} prefix={<TeamOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic title={t('admin.dashboard.orders')} value={stats.orders} prefix={<DollarOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic title={t('admin.dashboard.courses')} value={stats.courses} prefix={<CalendarOutlined />} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboardPage; 