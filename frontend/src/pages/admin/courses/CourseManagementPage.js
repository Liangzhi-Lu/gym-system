import React, { useState, useEffect } from 'react';
import { 
  Plus, Search, Filter, Edit, Trash2, Eye, Calendar, Clock, Users, Upload as UploadIcon
} from 'lucide-react';
import axios from 'axios';
import { message } from 'antd';
import { Upload } from 'antd';

const generateTempId = () => {
  return -Math.floor(Math.random() * 1000000) - 1;
};

const TableHeader = ({ onAddCourse, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(searchQuery);
    }
  };
  
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 space-y-4 md:space-y-0">
      <h1 className="text-2xl font-bold">Course Management</h1>
      
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full md:w-64"
            value={searchQuery}
            onChange={handleSearch}
            onKeyPress={handleKeyPress}
          />
        </div>
        
        <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </button>
        
        <button
          onClick={onAddCourse}
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Course
        </button>
      </div>
    </div>
  );
};

const CourseTable = ({ courses, onEdit, onView, onDelete, onManageSchedule, loading }) => {
  if (loading) {
    return (
      <div className="bg-white shadow-sm rounded-lg p-8 text-center">
        <p className="text-lg text-gray-500">Loading...</p>
      </div>
    );
  }
  
  if (courses.length === 0) {
    return (
      <div className="bg-white shadow-sm rounded-lg p-8 text-center">
        <p className="text-lg text-gray-500">No course data found</p>
      </div>
    );
  }
  
  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Course Information
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category/Coach
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price/Capacity
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courses.map((course) => (
              <tr key={course.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-16 w-16">
                      {course.image ? (
                        <img className="h-16 w-16 rounded object-cover" src={course.image} alt="" />
                      ) : (
                        <div className="h-16 w-16 rounded bg-primary flex items-center justify-center text-white font-bold">
                          {course.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{course.name}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {course.duration} minutes
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {course.category_name}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">{course.instructor_name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">¥{course.price}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    <div className="flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      Capacity: {course.capacity} people
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${course.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {course.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onView(course)}
                      className="text-indigo-600 hover:text-indigo-900"
                      title="View Details"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onEdit(course)}
                      className="text-blue-600 hover:text-blue-900"
                      title="Edit Course"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onManageSchedule(course)}
                      className="text-green-600 hover:text-green-900"
                      title="Manage Schedule"
                    >
                      <Calendar className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onDelete(course)}
                      className="text-red-600 hover:text-red-900"
                      title="Delete Course"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
        <div className="flex-1 flex justify-between sm:hidden">
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </button>
          <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of <span className="font-medium">{courses.length}</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Previous
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                1
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                2
              </button>
              <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

const CourseFormModal = ({ isOpen, onClose, course, mode, categories, instructors, onSubmit }) => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: '',
    instructor: '',
    price: '',
    capacity: '',
    duration: '',
    difficulty: 'beginner',
    is_active: true
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [courseImage, setCourseImage] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [tempId, setTempId] = useState(0);
  useEffect(() => {
    if (course && (mode === 'edit' || mode === 'view')) {
      console.log('Course object:', course);
      
      setForm({
        name: course.name || '',
        description: course.description || '',
        category: course.category || '',
        instructor: course.instructor || '',
        price: course.price || '',
        capacity: course.capacity || '',
        duration: course.duration || '',
        difficulty: course.difficulty || 'beginner',
        is_active: course.is_active !== undefined ? course.is_active : true
      });
      
      if (course.image) {
        setCourseImage(course.image);
        setFileList([
          {
            uid: '-1',
            name: 'course-image.jpg',
            status: 'done',
            url: course.image
          }
        ]);
      } else {
        setCourseImage(null);
        setFileList([]);
      }
      
      setTempId(0);
    } else {
      setForm({
        name: '',
        description: '',
        category: '',
        instructor: '',
        price: '',
        capacity: '',
        duration: '',
        difficulty: 'beginner',
        is_active: true
      });
      setCourseImage(null);
      setFileList([]);
      
      const newTempId = generateTempId();
      setTempId(newTempId);
    }
    setErrors({});
  }, [course, mode, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.name.trim()) newErrors.name = 'Course name cannot be empty';
    if (!form.description.trim()) newErrors.description = 'Course description cannot be empty';
    if (!form.category) newErrors.category = 'Please select a course category';
    if (!form.instructor) newErrors.instructor = 'Please select a coach';
    
    if (!form.price) {
      newErrors.price = 'Price cannot be empty';
    } else if (isNaN(form.price) || Number(form.price) < 0) {
      newErrors.price = 'Price must be a number greater than or equal to 0';
    }
    
    if (!form.capacity) {
      newErrors.capacity = 'Capacity cannot be empty';
    } else if (isNaN(form.capacity) || Number(form.capacity) < 1) {
      newErrors.capacity = 'Capacity must be a number greater than 0';
    }
    
    if (!form.duration) {
      newErrors.duration = 'Course duration cannot be empty';
    } else if (isNaN(form.duration) || Number(form.duration) < 1) {
      newErrors.duration = 'Course duration must be a number greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (mode === 'view') {
      onClose();
      return;
    }
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      await onSubmit(form, fileList, tempId);
      onClose();
    } catch (error) {
      console.error('Submission failed:', error);
      if (error.response?.data) {
        setErrors(error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };
  
  const handleImageChange = (info) => {
    setFileList(info.fileList);
    
    if (info.file.status === 'uploading') {
      setUploading(true);
      return;
    }
    
    if (info.file.status === 'done') {
      setUploading(false);
      if (info.file.response && info.file.response.file_url) {
        setCourseImage(info.file.response.file_url);
      } else if (info.file.response) {
        console.log('Upload response:', info.file.response);
        if (info.file.response.id) {
          const imageUrl = `/api/uploads/images/${info.file.response.id}/preview/`;
          setCourseImage(imageUrl);
        }
      }
    } else if (info.file.status === 'error') {
      setUploading(false);
      message.error('Image upload failed');
    }
  };
  
  const customUpload = async ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('business_type', 'course');
    const businessId = course ? course.id : tempId;
    formData.append('business_id', businessId);
    
    try {
      console.log('Starting image upload, business ID:', businessId);
      const res = await axios.post('/api/uploads/images/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log('Upload successful, response:', res.data);
      const responseWithStatus = {
        ...res.data,
        status: 'done'
      };
      onSuccess(responseWithStatus, file);
    } catch (error) {
      console.error('Image upload failed:', error);
      onError(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {mode === 'add' ? 'Add Course' : mode === 'edit' ? 'Edit Course' : 'Course Details'}
                </h3>
                <div className="mt-2">
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Course Image</label>
                      <div className="mt-2 flex items-center">
                        {courseImage && (
                          <div className="relative mr-4">
                            <img 
                              src={courseImage} 
                              alt="Course Image" 
                              className="w-32 h-24 object-cover rounded-md"
                            />
                            {mode !== 'view' && (
                              <button
                                type="button"
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs"
                                onClick={() => {
                                  setCourseImage(null);
                                  setFileList([]);
                                }}
                              >
                                ×
                              </button>
                            )}
                          </div>
                        )}
                        
                        {mode !== 'view' && (
                          <Upload
                            name="image"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            fileList={fileList}
                            onChange={handleImageChange}
                            customRequest={customUpload}
                            disabled={uploading}
                          >
                            {!courseImage && (
                              <div>
                                {uploading ? "Uploading..." : (
                                  <>
                                    <UploadIcon style={{ fontSize: 20 }} />
                                    <div className="mt-2">Upload Image</div>
                                  </>
                                )}
                              </div>
                            )}
                          </Upload>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Course Name</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        disabled={mode === 'view'}
                        className={`mt-1 block w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary text-gray-900`}
                      />
                      {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Course Description</label>
                      <textarea
                        rows="3"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        disabled={mode === 'view'}
                        className={`mt-1 block w-full border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary text-gray-900`}
                      />
                      {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Course Category</label>
                        <select
                          name="category"
                          value={form.category}
                          onChange={handleChange}
                          disabled={mode === 'view'}
                          className={`mt-1 block w-full border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary text-gray-900`}
                        >
                          <option value="">Select Category</option>
                          {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                          ))}
                        </select>
                        {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Coach</label>
                        <select
                          name="instructor"
                          value={form.instructor}
                          onChange={handleChange}
                          disabled={mode === 'view'}
                          className={`mt-1 block w-full border ${errors.instructor ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary text-gray-900`}
                        >
                          <option value="">Select Coach</option>
                          {instructors.map(instructor => (
                            <option key={instructor.id} value={instructor.id}>{instructor.username}</option>
                          ))}
                        </select>
                        {errors.instructor && <p className="mt-1 text-sm text-red-500">{errors.instructor}</p>}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Price (¥)</label>
                        <input
                          type="number"
                          name="price"
                          min="0"
                          step="0.01"
                          value={form.price}
                          onChange={handleChange}
                          disabled={mode === 'view'}
                          className={`mt-1 block w-full border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary text-gray-900`}
                        />
                        {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Capacity (people)</label>
                        <input
                          type="number"
                          name="capacity"
                          min="1"
                          value={form.capacity}
                          onChange={handleChange}
                          disabled={mode === 'view'}
                          className={`mt-1 block w-full border ${errors.capacity ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary text-gray-900`}
                        />
                        {errors.capacity && <p className="mt-1 text-sm text-red-500">{errors.capacity}</p>}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
                        <input
                          type="number"
                          name="duration"
                          min="1"
                          value={form.duration}
                          onChange={handleChange}
                          disabled={mode === 'view'}
                          className={`mt-1 block w-full border ${errors.duration ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary text-gray-900`}
                        />
                        {errors.duration && <p className="mt-1 text-sm text-red-500">{errors.duration}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Difficulty Level</label>
                        <select
                          name="difficulty"
                          value={form.difficulty}
                          onChange={handleChange}
                          disabled={mode === 'view'}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary text-gray-900"
                        >
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <div className="mt-1">
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            name="is_active"
                            checked={form.is_active}
                            onChange={handleChange}
                            disabled={mode === 'view'}
                            className="rounded text-primary focus:ring-primary h-4 w-4"
                          />
                          <span className="ml-2 text-sm text-gray-700">Course Active</span>
                        </label>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            {mode !== 'view' && (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ${loading ? 'bg-gray-300' : 'bg-primary'} text-base font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm`}
              >
                {loading ? 'Submitting...' : mode === 'add' ? 'Add' : 'Save'}
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              {mode === 'view' ? 'Close' : 'Cancel'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CourseManagementPage = () => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modalMode, setModalMode] = useState('add'); // 'add', 'edit', 'view'
  const [searchQuery, setSearchQuery] = useState('');


  // const fetchCourses = async (query = '') => {
  //   setIsLoading(true);
  //   try {
  //     console.log('Requesting course list, parameters:', { search: query });
  //     const response = await axios.get('/api/courses/', {
  //       params: { search: query }
  //     });
  //     console.log('Course list response:', response.data);
  //
  //     const coursesData = Array.isArray(response.data) ? response.data :
  //                        (response.data.results ? response.data.results : []);
  //
  //     const coursesWithImages = await Promise.all(
  //       coursesData.map(async (course) => {
  //         try {
  //           console.log(`Attempting to get image for course ${course.id}`);
  //           try {
  //             const imageRes = await axios.get(`/api/uploads/images/business/course/${course.id}/`);
  //             console.log('Got course image:', imageRes.data);
  //             return {
  //               ...course,
  //               image: imageRes.data.file_url
  //             };
  //           } catch (e) {
  //             console.log('Failed to get image using business type API, falling back to list API');
  //             const imagesRes = await axios.get('/api/uploads/images/', {
  //               params: {
  //                 business_type: 'course',
  //                 business_id: course.id
  //               }
  //             });
  //
  //             const images = Array.isArray(imagesRes.data) ? imagesRes.data :
  //                           (imagesRes.data.results ? imagesRes.data.results : []);
  //
  //             if (images.length > 0) {
  //               console.log('Got image using list API:', images[0]);
  //               return {
  //                 ...course,
  //                 image: images[0].file_url
  //               };
  //             }
  //             return course;
  //           }
  //         } catch (error) {
  //           console.log(`Failed to get image for course ${course.id}:`, error);
  //           return course;
  //         }
  //       })
  //     );
  //
  //     setCourses(coursesWithImages);
  //   } catch (error) {
  //     console.error('Failed to get courses:', error);
  //     console.error('Error details:', error.response?.data);
  //     message.error('Failed to get course list');
  //     setCourses([]);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  //
  // const fetchCategories = async () => {
  //   try {
  //     console.log('Requesting course category list');
  //     const response = await axios.get('/api/courses/categories/');
  //     console.log('Course category response:', response.data);
  //
  //     const categoriesData = Array.isArray(response.data) ? response.data :
  //                           (response.data.results ? response.data.results : []);
  //     setCategories(categoriesData);
  //   } catch (error) {
  //     console.error('Failed to get course categories:', error);
  //     console.error('Error details:', error.response?.data);
  //     message.error('Failed to get course categories');
  //     setCategories([]);
  //   }
  // };
  //
  // const fetchInstructors = async () => {
  //   try {
  //     console.log('Requesting coach list, parameters:', { role: 'staff' });
  //     const response = await axios.get('/api/users/', {
  //       params: { role: 'staff' }
  //     });
  //     console.log('Coach list response:', response.data);
  //
  //     const instructorsData = Array.isArray(response.data) ? response.data :
  //                            (response.data.results ? response.data.results : []);
  //     setInstructors(instructorsData);
  //   } catch (error) {
  //     console.error('Failed to get coach list:', error);
  //     console.error('Error details:', error.response?.data);
  //     message.error('Failed to get coach list');
  //     setInstructors([]);
  //   }
  // };
  // mock course data (English)
  const mockCourses = [
    {
      id: 1,
      name: 'Yoga Basics',
      description: 'An introduction to yoga for beginners.',
      category: 2,
      category_name: 'Yoga',
      instructor: 1,
      instructor_name: 'Michael',
      price: 99,
      capacity: 20,
      duration: 60,
      difficulty: 'beginner',
      is_active: true,
      image: '',
    },
    {
      id: 2,
      name: 'HIIT Advanced',
      description: 'High intensity interval training for advanced students.',
      category: 1,
      category_name: 'Fitness',
      instructor: 2,
      instructor_name: 'Susan',
      price: 120,
      capacity: 15,
      duration: 45,
      difficulty: 'advanced',
      is_active: false,
      image: '',
    },
  ];

  const mockCategories = [
    { id: 1, name: 'Fitness', description: 'Courses related to fitness and health' },
    { id: 2, name: 'Yoga', description: 'Yoga classes for all levels' },
    { id: 3, name: 'Dance', description: 'Dance courses including ballet, hip-hop, and more' },
  ];

  const mockInstructors = [
    { id: 1, username: 'Michael', email: 'michael@example.com' },
    { id: 2, username: 'Susan', email: 'susan@example.com' },
  ];

// 替换为 mock 数据的 fetch 方法
  const fetchCourses = async (query = '') => {
    setIsLoading(true);
    setTimeout(() => {
      let filtered = mockCourses.filter(
          c =>
              !query ||
              c.name.toLowerCase().includes(query.toLowerCase()) ||
              c.description.toLowerCase().includes(query.toLowerCase())
      );
      setCourses(filtered);
      setIsLoading(false);
    }, 300);
  };

  const fetchCategories = async () => {
    setCategories(mockCategories);
  };

  const fetchInstructors = async () => {
    setInstructors(mockInstructors);
  };

  useEffect(() => {
    const initData = async () => {
      await Promise.all([
        fetchCourses(),
        fetchCategories(),
        fetchInstructors()
      ]);
    };

    initData();
  }, []);

  const handleAddCourse = () => {
    setSelectedCourse(null);
    setModalMode('add');
    setModalOpen(true);
  };

  const handleEditCourse = (course) => {
    setSelectedCourse(course);
    setModalMode('edit');
    setModalOpen(true);
  };

  const handleViewCourse = (course) => {
    setSelectedCourse(course);
    setModalMode('view');
    setModalOpen(true);
  };

  const handleDeleteCourse = async (course) => {
    if (window.confirm(`Are you sure you want to delete course "${course.name}"?`)) {
      try {
        await axios.delete(`/api/courses/${course.id}/`);
        message.success('Course deleted successfully');
        fetchCourses(searchQuery);
      } catch (error) {
        console.error('Failed to delete course:', error);
        message.error('Failed to delete course');
      }
    }
  };

  const handleManageSchedule = (course) => {
    message.info(`Jump to schedule management page for course "${course.name}"`);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    fetchCourses(query);
  };

  const handleSubmitCourse = async (formData, uploadedFiles, tempId) => {
    try {
      const courseFormData = new FormData();
      
      courseFormData.append('name', formData.name);
      courseFormData.append('description', formData.description);
      courseFormData.append('category', parseInt(formData.category, 10));
      courseFormData.append('instructor', parseInt(formData.instructor, 10));
      courseFormData.append('price', parseFloat(formData.price));
      courseFormData.append('capacity', parseInt(formData.capacity, 10));
      courseFormData.append('duration', parseInt(formData.duration, 10));
      courseFormData.append('difficulty', formData.difficulty);
      courseFormData.append('is_active', formData.is_active ? 'true' : 'false');
      
      if (uploadedFiles && uploadedFiles.length > 0 && uploadedFiles[0].response) {
        const imageUrl = uploadedFiles[0].response.file_url;
        if (imageUrl) {
          console.log('Adding image URL to form:', imageUrl);
          courseFormData.append('image', imageUrl);
        }
      }
      
      console.log('Submitting course data:', Object.fromEntries(courseFormData));
      
      let courseId;
      let courseResponse;
      
      if (modalMode === 'add') {
        courseResponse = await axios.post('/api/courses/', courseFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Create course response:', courseResponse.data);
        courseId = courseResponse.data.id;
        message.success('Course created successfully');
      } else if (modalMode === 'edit' && selectedCourse) {

        courseResponse = await axios.put(`/api/courses/${selectedCourse.id}/`, courseFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Update course response:', courseResponse.data);
        courseId = selectedCourse.id;
        message.success('Course updated successfully');
      }
      

      fetchCourses(searchQuery);
      return true;
    } catch (error) {
      console.error('Failed to submit course:', error);
      console.error('Error details:', error.response?.data);
      message.error('Operation failed: ' + (error.response?.data?.error || 'Unknown error'));
      throw error;
    }
  };

  return (
    <div>
      <TableHeader 
        onAddCourse={handleAddCourse} 
        onSearch={handleSearch}
      />
      <CourseTable 
        courses={courses}
        onEdit={handleEditCourse}
        onView={handleViewCourse}
        onDelete={handleDeleteCourse}
        onManageSchedule={handleManageSchedule}
        loading={isLoading}
      />
      <CourseFormModal 
        isOpen={modalOpen}
        onClose={handleCloseModal}
        course={selectedCourse}
        mode={modalMode}
        categories={categories}
        instructors={instructors}
        onSubmit={handleSubmitCourse}
      />
    </div>
  );
};

export default CourseManagementPage; 