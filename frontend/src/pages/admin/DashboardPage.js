import React, { useState, useEffect } from 'react';
import { Users, Dumbbell, ShoppingCart, CreditCard, TrendingUp, Calendar, BookOpen } from 'lucide-react';
import axios from 'axios';

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white rounded-lg shadow-sm p-6 flex items-center">
    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div className="ml-4">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  </div>
);

const RecentActivity = ({ activities }) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-start">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.color}`}>
            <activity.icon className="w-4 h-4 text-white" />
          </div>
          <div className="ml-3">
            <p className="text-sm">{activity.content}</p>
            <p className="text-xs text-gray-500">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Chart = () => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <h2 className="text-lg font-semibold mb-4">Monthly Statistics</h2>
    <div className="h-64 flex items-center justify-center border border-gray-200 rounded-lg">
      <p className="text-gray-500">Chart component (ECharts or Recharts can be integrated here)</p>
    </div>
  </div>
);

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalMembers: 0,
    totalCourses: 0,
    totalRevenue: 0,
    schedules: 0
  });
  
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // const response = await axios.get('/api/admin/dashboard/stats');
        // setStats(response.data);
        
        setStats({
          totalMembers: 245,
          totalCourses: 18,
          totalRevenue: 42650,
          schedules: 42
        });
        
        setActivities([
          { 
            icon: Users, 
            color: 'bg-blue-500', 
            content: 'New user Zhang San joined the gym', 
            time: '5 minutes ago' 
          },
          { 
            icon: Dumbbell, 
            color: 'bg-purple-500', 
            content: 'Coach Li created a new course "Advanced Yoga"', 
            time: '30 minutes ago' 
          },
          { 
            icon: ShoppingCart, 
            color: 'bg-green-500', 
            content: 'Wang Wu purchased a quarterly membership package', 
            time: '1 hour ago' 
          },
          { 
            icon: Calendar, 
            color: 'bg-orange-500', 
            content: 'System scheduled 5 new course times', 
            time: '2 hours ago' 
          },
          { 
            icon: Users, 
            color: 'bg-red-500', 
            content: 'Zhao Liu registered for the "Strength Training" course', 
            time: '3 hours ago' 
          }
        ]);
      } catch (error) {
        console.error('Failed to get statistics data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Control Panel</h1>
        <p className="text-gray-600">Welcome back, view the latest data and dynamics of the gym</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-6">
        <StatCard title="Total Users" value={stats.users} icon={Users} color="bg-blue-500" />
        <StatCard title="Current Courses" value={stats.courses} icon={Dumbbell} color="bg-purple-500" />
        <StatCard title="Current Orders" value={stats.orders} icon={ShoppingCart} color="bg-green-500" />
        <StatCard title="Current Revenue" value={`¥${stats.revenue}`} icon={CreditCard} color="bg-yellow-500" />
        <StatCard title="Course Schedules" value={stats.schedules} icon={Calendar} color="bg-red-500" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <Chart />
        </div>
        <div>
          <RecentActivity activities={activities} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Popular Courses</h2>
          <div className="space-y-2">
            {[
              { name: 'Aerobic Exercise', enrollment: 32, instructor: 'Coach Li' },
              { name: 'Strength Training', enrollment: 28, instructor: 'Coach Wang' },
              { name: 'Yoga Beginner', enrollment: 24, instructor: 'Coach Zhao' },
              { name: 'Pilates', enrollment: 20, instructor: 'Coach Zhang' },
              { name: 'Boxing Training', enrollment: 18, instructor: 'Coach Liu' }
            ].map((course, index) => (
              <div key={index} className="flex items-center justify-between p-3 border-b border-gray-100">
                <div>
                  <p className="font-medium">{course.name}</p>
                  <p className="text-sm text-gray-500">教练: {course.instructor}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{course.enrollment}</p>
                  <p className="text-xs text-gray-500">Enrollment</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">To-Do List</h2>
          <div className="space-y-3">
            {[
              { task: 'Review new coach applications', priority: 'high', due: 'Today' },
              { task: 'Update membership plan prices', priority: 'medium', due: 'Tomorrow' },
              { task: 'Reply to user feedback', priority: 'medium', due: 'Tomorrow' },
              { task: 'Arrange next week\'s courses', priority: 'medium', due: 'The day after Tomorrow' },
              { task: 'Annual equipment inspection', priority: 'low', due: 'Friday' }
            ].map((todo, index) => (
              <div key={index} className="flex items-center p-3 border-b border-gray-100">
                <input type="checkbox" className="mr-3 form-checkbox rounded text-primary focus:ring-primary" />
                <div className="flex-1">
                  <p className="font-medium">{todo.task}</p>
                  <p className="text-xs text-gray-500">Due: {todo.due}</p>
                </div>
                <div className={`
                  px-2 py-1 rounded-full text-xs font-medium 
                  ${todo.priority === 'high' ? 'bg-red-100 text-red-700' : 
                    todo.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' : 
                    'bg-green-100 text-green-700'}
                `}>
                  {todo.priority === 'high' ? 'High' : todo.priority === 'medium' ? 'Medium' : 'Low'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 