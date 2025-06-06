import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Space, Popconfirm, message, Modal, Form, DatePicker, TimePicker, InputNumber, Select } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined, PlusOutlined, CalendarOutlined } from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';

const { Option } = Select;
const { RangePicker } = DatePicker;

const ScheduleManagementPage = () => {
  const [schedules, setSchedules] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [form] = Form.useForm();
  

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);

  // // 获取排期列表
  // const fetchSchedules = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await axios.get('/api/courses/schedules/', { params: { search } });
  //     const schedulesData = Array.isArray(res.data) ? res.data :
  //                          (res.data.results ? res.data.results : []);
  //
  //     // 添加日志以检查返回的数据
  //     console.log('课程排期数据:', schedulesData);
  //
  //     setSchedules(schedulesData);
  //   } catch (e) {
  //     console.error('Failed to get course schedules:', e);
  //     message.error('Failed to get course schedule list');
  //   }
  //   setLoading(false);
  // };
  //
  // // 获取课程列表
  // const fetchCourses = async () => {
  //   try {
  //     const res = await axios.get('/api/courses/');
  //     const coursesData = Array.isArray(res.data) ? res.data :
  //                        (res.data.results ? res.data.results : []);
  //
  //     // 添加日志以检查返回的课程数据
  //     console.log('课程数据:', coursesData);
  //
  //     setCourses(coursesData);
  //   } catch (e) {
  //     console.error('Failed to get course list:', e);
  //     message.error('Failed to get course list');
  //   }
  // };

  // mock course data (English)
  const mockCourses = [
    {
      id: 1,
      name: 'Yoga Basics',
      instructor_name: 'Michael',
      capacity: 20,
    },
    {
      id: 2,
      name: 'HIIT Advanced',
      instructor_name: 'Susan',
      capacity: 15,
    },
  ];

// mock schedule data (English)
  const mockSchedules = [
    {
      id: 1,
      course: { id: 1 },
      course_name: 'Yoga Basics',
      course_instructor: 'Michael',
      start_time: '2024-07-01T09:00:00',
      end_time: '2024-07-01T10:00:00',
      current_capacity: 10,
      location: 'Room 101',
      notes: 'Bring your own mat',
    },
    {
      id: 2,
      course: { id: 2 },
      course_name: 'HIIT Advanced',
      course_instructor: 'Susan',
      start_time: '2024-07-02T14:00:00',
      end_time: '2024-07-02T15:00:00',
      current_capacity: 8,
      location: 'Room 202',
      notes: '',
    },
  ];

// fetchCourses uses mock data
  const fetchCourses = async () => {
    setCourses([...mockCourses]);
  };

// fetchSchedules uses mock data
  const fetchSchedules = async () => {
    setLoading(true);
    setTimeout(() => {
      let filtered = mockSchedules.filter(
          s =>
              !search ||
              mockCourses.find(c => c.id === s.course.id)?.name.toLowerCase().includes(search.toString().toLowerCase())
      );
      setSchedules(filtered);
      setLoading(false);
    }, 300);
  };

  useEffect(() => {
    fetchSchedules();
    fetchCourses();
    // eslint-disable-next-line
  }, [search]);

  // 删除排期
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/courses/schedules/${id}/`);
      message.success('Schedule deleted successfully');
      fetchSchedules();
    } catch (error) {
      console.error('Delete schedule failed:', error);
      message.error('Delete schedule failed');
    }
  };
  
  const showCreateModal = () => {
    setModalTitle('Add Course Schedule');
    setEditingSchedule(null);
    form.resetFields();
    setIsModalVisible(true);
  };
  
  const showEditModal = (schedule) => {
    setModalTitle('Edit Course Schedule');
    setEditingSchedule(schedule);
    
    const courseCapacity = courses.find(c => c.id === schedule.course?.id)?.capacity || 0;
    
    form.setFieldsValue({
      course: schedule.course?.id,
      capacity: courseCapacity, 
      start_time: schedule.start_time ? moment(schedule.start_time) : null,
      end_time: schedule.end_time ? moment(schedule.end_time) : null,
      location: schedule.location || '',
      notes: schedule.notes || '',
    });
    
    setIsModalVisible(true);
  };
  
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setConfirmLoading(true);
      
      if (values.start_time) {
        values.start_time = values.start_time.format('YYYY-MM-DDTHH:mm:ss');
      }
      if (values.end_time) {
        values.end_time = values.end_time.format('YYYY-MM-DDTHH:mm:ss');
      }
      
      delete values.capacity;
      
      console.log('Submitted form data:', values);
      
      if (editingSchedule) {
        await axios.put(`/api/courses/schedules/${editingSchedule.id}/`, values);
        message.success('Course schedule updated successfully');
      } else {
        await axios.post('/api/courses/schedules/', values);
        message.success('Course schedule created successfully');
      }
      
      setIsModalVisible(false);
      fetchSchedules();
    } catch (error) {
      console.error('Submit form failed:', error);
      message.error(error.response?.data?.error || 'Operation failed');
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleCourseChange = (courseId) => {
    const selectedCourse = courses.find(course => course.id === courseId);
    if (selectedCourse) {
      form.setFieldsValue({
        capacity: selectedCourse.capacity
      });
    }
  };

  const columns = [
    {
      title: 'Course Name',
      dataIndex: 'course_name',
      key: 'course_name',
      render: (text, record) => {
        const course = courses.find(c => c.id === record.course?.id);
        return course ? course.name : (record.course_name || '-');
      }
    },
    {
      title: 'Instructor',
      dataIndex: 'course_instructor',
      key: 'course_instructor',
      render: (text, record) => {
        const course = courses.find(c => c.id === record.course?.id);
        return course ? course.instructor_name : (record.course_instructor || '-');
      }
    },
    {
      title: 'Start Time',
      dataIndex: 'start_time',
      key: 'start_time',
      render: (time) => time ? moment(time).format('YYYY-MM-DD HH:mm') : '-'
    },
    {
      title: 'End Time',
      dataIndex: 'end_time',
      key: 'end_time',
      render: (time) => time ? moment(time).format('YYYY-MM-DD HH:mm') : '-'
    },
    {
      title: 'Capacity',
      key: 'capacity',
      render: (_, record) => {
        const course = courses.find(c => c.id === record.course?.id);
        const capacity = course ? course.capacity : 0;
        return `${record.current_capacity || 0}/${capacity}`;
      }
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      ellipsis: true,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            icon={<EditOutlined />} 
            size="small" 
            type="primary" 
            ghost
            onClick={() => showEditModal(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this schedule?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button icon={<DeleteOutlined />} size="small" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1 style={{ fontSize: 28, marginBottom: 24 }}>Course Schedule Management</h1>
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search schedules..."
          prefix={<SearchOutlined />}
          value={search}
          onChange={e => setSearch(e.target.value)}
          allowClear
          style={{ width: 200 }}
        />
        <Select
          placeholder="Select Course"
          style={{ width: 200 }}
          allowClear
          onChange={(value) => setSearch(value || '')}
        >
          {courses.map(course => (
            <Option key={course.id} value={course.id}>{course.name}</Option>
          ))}
        </Select>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={showCreateModal}
        >
          Add Schedule
        </Button>
      </Space>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={schedules}
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
      
      <Modal
        title={modalTitle}
        open={isModalVisible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          name="schedule_form"
        >
          <Form.Item
            name="course"
            label="Select Course"
            rules={[
              { required: true, message: 'Please select a course' }
            ]}
          >
            <Select 
              className="text-gray-900"
              onChange={handleCourseChange}
            >
              {courses.map(course => (
                <Option key={course.id} value={course.id}>{course.name}</Option>
              ))}
            </Select>
          </Form.Item>
          
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="start_time"
              label="Start Time"
              rules={[
                { required: true, message: 'Please select start time' }
              ]}
            >
              <DatePicker 
                showTime 
                format="YYYY-MM-DD HH:mm"
                className="w-full text-gray-900"
              />
            </Form.Item>
            
            <Form.Item
              name="end_time"
              label="End Time"
              rules={[
                { required: true, message: 'Please select end time' }
              ]}
            >
              <DatePicker 
                showTime 
                format="YYYY-MM-DD HH:mm"
                className="w-full text-gray-900"
              />
            </Form.Item>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="capacity"
              label="Capacity"
              tooltip="This is a read-only value showing the course capacity"
            >
              <InputNumber 
                className="w-full text-gray-900" 
                min={1}
                disabled
              />
            </Form.Item>
            
            <Form.Item
              name="location"
              label="Location"
              rules={[
                { required: true, message: 'Please enter class location' }
              ]}
            >
              <Input className="text-gray-900" />
            </Form.Item>
          </div>
          
          <Form.Item
            name="notes"
            label="Notes"
          >
            <Input.TextArea rows={3} className="text-gray-900" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ScheduleManagementPage; 