import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    const tokens = localStorage.getItem('tokens');
    if (tokens) {
      const { access } = JSON.parse(tokens);
      config.headers['Authorization'] = `Bearer ${access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const tokens = localStorage.getItem('tokens');
        if (!tokens) {
          return Promise.reject(error);
        }
        
        const { refresh } = JSON.parse(tokens);
        
        const response = await axios.post('/api/token/refresh/', { refresh });
        const { access } = response.data;
        
        const newTokens = { access, refresh };
        localStorage.setItem('tokens', JSON.stringify(newTokens));
        
        originalRequest.headers['Authorization'] = `Bearer ${access}`;
        
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('tokens');
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export const userApi = {
  getCurrentUser: () => api.get('/users/me/'),
  updateUser: (userId, data) => api.patch(`/users/${userId}/`, data),
  updateProfile: (userId, data) => api.patch(`/users/profile/${userId}/`, data),
  changePassword: (data) => api.post('/users/change-password/', data),
};

export const courseApi = {
  getCourses: (params) => api.get('/courses/', { params }),
  getCourseById: (id) => api.get(`/courses/${id}/`),
  getCourseCategories: () => api.get('/courses/categories/'),
  getCourseSchedules: (params) => api.get('/courses/schedules/', { params }),
  enrollCourse: (data) => api.post('/courses/enrollments/', data),
  getUserEnrollments: () => api.get('/courses/enrollments/'),
  cancelEnrollment: (id) => api.patch(`/courses/enrollments/${id}/`, { status: 'cancelled' }),
};

export const membershipApi = {
  getMembershipPlans: () => api.get('/orders/membership-plans/'),
  getMembershipPlanById: (id) => api.get(`/orders/membership-plans/${id}/`),
};

export const orderApi = {
  createOrder: (data) => api.post('/orders/', data),
  getOrders: (params) => api.get('/orders/', { params }),
  getOrderById: (id) => api.get(`/orders/${id}/`),
  updateOrder: (id, data) => api.patch(`/orders/${id}/`, data),
  cancelOrder: (id) => api.post(`/orders/${id}/cancel/`),
};

export default api; 