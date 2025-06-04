import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Select, DatePicker, Spin, Table, Divider } from 'antd';
import { UserOutlined, DollarOutlined, CalendarOutlined, TeamOutlined, RiseOutlined, FallOutlined } from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';
// import ReactECharts from 'echarts-for-react';

const { RangePicker } = DatePicker;
const { Option } = Select;

const ReportsPage = () => {
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState('month'); // 'today', 'week', 'month', 'quarter', 'year'
  const [customDateRange, setCustomDateRange] = useState([moment().subtract(30, 'days'), moment()]);
  const [reportData, setReportData] = useState({
    members: {
      total: 0,
      new: 0,
      active: 0,
      expired: 0,
      growth: 0
    },
    courses: {
      total: 0,
      scheduled: 0,
      completed: 0,
      attendance: 0
    },
    revenue: {
      total: 0,
      membership: 0,
      courses: 0,
      other: 0,
      growth: 0
    },
    popular: {
      courses: [],
      memberships: []
    }
  });

  // Fetch report data from API
  // const fetchReportData = async () => {
  //   setLoading(true);
  //   try {
  //     // Here we would call the real API
  //     // Example: const res = await axios.get('/api/admin/reports', { params: { timeRange, startDate, endDate } });
  //
  //     // For demo purposes we're setting a timeout and using placeholder data
  //     await new Promise(resolve => setTimeout(resolve, 1000));
  //
  //     // In a real application, this would be replaced with actual API data
  //     setReportData({
  //       members: {
  //         total: 0,
  //         new: 0,
  //         active: 0,
  //         expired: 0,
  //         growth: 0
  //       },
  //       courses: {
  //         total: 0,
  //         scheduled: 0,
  //         completed: 0,
  //         attendance: 0
  //       },
  //       revenue: {
  //         total: 0,
  //         membership: 0,
  //         courses: 0,
  //         other: 0,
  //         growth: 0
  //       },
  //       popular: {
  //         courses: [],
  //         memberships: []
  //       }
  //     });
  //   } catch (error) {
  //     // Handle error silently in demo
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // mock report data (English)
  const mockReportData = {
    members: {
      total: 120,
      new: 8,
      active: 95,
      expired: 10,
      growth: 5.2
    },
    courses: {
      total: 18,
      scheduled: 12,
      completed: 10,
      attendance: 87
    },
    revenue: {
      total: 12500,
      membership: 8000,
      courses: 4000,
      other: 500,
      growth: 3.8
    },
    popular: {
      courses: [
        { name: 'Yoga Basics', count: 40, revenue: 3000 },
        { name: 'HIIT Advanced', count: 28, revenue: 2100 },
        { name: 'Pilates Core', count: 22, revenue: 1700 }
      ],
      memberships: [
        { name: 'Premium Plan', count: 30, revenue: 6000 },
        { name: 'Basic Plan', count: 20, revenue: 2000 }
      ]
    }
  };

  // fetch report data using mock data
  const fetchReportData = async () => {
    setLoading(true);
    setTimeout(() => {
      setReportData({ ...mockReportData });
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    fetchReportData();
    // eslint-disable-next-line
  }, [timeRange, customDateRange]);

  // Handle time range change
  const handleTimeRangeChange = (value) => {
    setTimeRange(value);
    
    // Set corresponding date range
    const now = moment();
    let start;
    
    switch (value) {
      case 'today':
        start = now.clone().startOf('day');
        break;
      case 'week':
        start = now.clone().subtract(7, 'days');
        break;
      case 'month':
        start = now.clone().subtract(30, 'days');
        break;
      case 'quarter':
        start = now.clone().subtract(90, 'days');
        break;
      case 'year':
        start = now.clone().subtract(365, 'days');
        break;
      default:
        start = now.clone().subtract(30, 'days');
    }
    
    setCustomDateRange([start, now]);
  };

  // Handle custom date range change
  const handleDateRangeChange = (dates) => {
    if (dates && dates.length === 2) {
      setTimeRange('custom');
      setCustomDateRange(dates);
    }
  };

  // Course ranking table columns
  const courseColumns = [
    {
      title: 'Course Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Enrollments',
      dataIndex: 'count',
      key: 'count',
      sorter: (a, b) => a.count - b.count,
    },
    {
      title: 'Revenue',
      dataIndex: 'revenue',
      key: 'revenue',
      sorter: (a, b) => a.revenue - b.revenue,
      render: (value) => `$${value}`
    }
  ];

  // Membership plans ranking table columns
  const membershipColumns = [
    {
      title: 'Plan Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Sales Count',
      dataIndex: 'count',
      key: 'count',
      sorter: (a, b) => a.count - b.count,
    },
    {
      title: 'Revenue',
      dataIndex: 'revenue',
      key: 'revenue',
      sorter: (a, b) => a.revenue - b.revenue,
      render: (value) => `$${value}`
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 style={{ fontSize: 28, marginBottom: 0 }}>Reports</h1>
        
        <div className="flex items-center space-x-4">
          <Select 
            value={timeRange} 
            onChange={handleTimeRangeChange}
            style={{ width: 120 }}
          >
            <Option value="today">Today</Option>
            <Option value="week">This Week</Option>
            <Option value="month">This Month</Option>
            <Option value="quarter">This Quarter</Option>
            <Option value="year">This Year</Option>
          </Select>
          
          <RangePicker 
            value={customDateRange}
            onChange={handleDateRangeChange}
            allowClear={false}
          />
        </div>
      </div>
      
<Spin spinning={loading}>
  {/* Top statistics cards */}
  <Row gutter={16} className="mb-6">
    <Col span={6}>
      <Card>
        <Statistic
          title="Total Members"
          value={reportData.members.total}
          prefix={<UserOutlined />}
          suffix={
            <span className="text-xs ml-2" style={{ color: '#3f8600' }}>
              <RiseOutlined />
              {reportData.members.growth}%
            </span>
          }
        />
        <div className="mt-2 text-gray-500 text-sm">
          New: {reportData.members.new} | Active: {reportData.members.active}
        </div>
      </Card>
    </Col>

    <Col span={6}>
      <Card>
        <Statistic
          title="Courses"
          value={reportData.courses.total}
          prefix={<CalendarOutlined />}
        />
        <div className="mt-2 text-gray-500 text-sm">
          Scheduled: {reportData.courses.scheduled} | Completed: {reportData.courses.completed}
        </div>
      </Card>
    </Col>

    <Col span={6}>
      <Card>
        <Statistic
          title="Attendance Rate"
          value={reportData.courses.attendance}
          suffix="%"
        />
        <div className="mt-2 text-gray-500 text-sm">
          Based on completed courses
        </div>
      </Card>
    </Col>

    <Col span={6}>
      <Card>
        <Statistic
          title="Total Revenue"
          value={reportData.revenue.total}
          prefix={<DollarOutlined />}
          suffix={
            <span className="text-xs ml-2" style={{ color: '#3f8600' }}>
              <RiseOutlined />
              {reportData.revenue.growth}%
            </span>
          }
        />
        <div className="mt-2 text-gray-500 text-sm">
          Membership: ${reportData.revenue.membership} | Courses: ${reportData.revenue.courses}
        </div>
      </Card>
    </Col>
  </Row>

  {/* Revenue distribution */}
  <Row gutter={16} className="mb-6">
    <Col span={24}>
      <Card title="Revenue Distribution">
        <div className="flex items-center justify-center" style={{ height: 300 }}>
         {/*<ReactECharts*/}
         {/*  style={{ width: 400, height: 240 }}*/}
         {/*  option={{*/}
         {/*    tooltip: { trigger: 'item' },*/}
         {/*    legend: { top: 'bottom' },*/}
         {/*    series: [*/}
         {/*      {*/}
         {/*        name: 'Revenue',*/}
         {/*        type: 'pie',*/}
         {/*        radius: ['40%', '70%'],*/}
         {/*        avoidLabelOverlap: false,*/}
         {/*        label: { show: true, position: 'outside' },*/}
         {/*        labelLine: { show: true },*/}
         {/*        data: [*/}
         {/*          { value: 1000, name: 'Membership' },*/}
         {/*          { value: 5000, name: 'Courses' },*/}
         {/*          { value: 200, name: 'Other' }*/}
         {/*        ]*/}
         {/*      }*/}
         {/*    ]*/}
         {/*  }}*/}
         {/*/>*/}
        </div>
      </Card>
    </Col>
  </Row>

  {/* Popular courses and membership plans */}
  <Row gutter={16}>
    <Col span={12}>
      <Card title="Popular Courses">
        <Table
          dataSource={reportData.popular.courses}
          columns={courseColumns}
          rowKey="name"
          pagination={false}
          size="small"
        />
      </Card>
    </Col>

    <Col span={12}>
      <Card title="Popular Membership Plans">
        <Table
          dataSource={reportData.popular.memberships}
          columns={membershipColumns}
          rowKey="name"
          pagination={false}
          size="small"
        />
      </Card>
    </Col>
  </Row>
</Spin>    </div>
  );
};

export default ReportsPage; 