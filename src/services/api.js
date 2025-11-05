// api.js
/*import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth APIs
export const login = (credentials) => api.post('/auth/login', credentials);
export const signup = (userData) => api.post('/auth/signup', userData);

// Dietitian APIs
export const getDietitianDashboard = (dietitianId) => 
  api.get(`/dietitian/${dietitianId}/dashboard`);

export const getAllPatients = (dietitianId) => 
  api.get(`/dietitian/patients`, { params: { dietitianId } });

export const getPatientProfile = (patientId) => 
  api.get(`/dietitian/patient/${patientId}`);

export const generateDietChart = (data) => 
  api.post('/dietitian/diet-chart/generate', data);

export const getUpcomingAppointments = (dietitianId) => 
  api.get(`/dietitian/${dietitianId}/appointments`);

export const updateAppointmentStatus = (appointmentId, status) => 
  api.put(`/dietitian/appointment/${appointmentId}/status`, null, { params: { status } });

// Patient APIs
export const getPatientDashboard = (patientId) => 
  api.get(`/patient/${patientId}/dashboard`);

export const addHealthParameter = (data) => 
  api.post('/patient/health-parameter', data);

export const getAllDietitians = () => 
  api.get('/patient/dietitians');

export const bookAppointment = (data) => 
  api.post('/patient/appointment', data);

export const getPatientDietCharts = (patientId) => 
  api.get(`/patient/${patientId}/diet-charts`);

// Food APIs
export const searchFood = (query) => 
  api.get('/food/search', { params: { query } });

export const getFoodNutrition = (foodId, quantity) => 
  api.get(`/food/${foodId}/nutrition`, { params: { quantity } });

export const getAllFoods = () => 
  api.get('/food/all');

export default api;*/
// api.js
/*import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ========================================
// AUTH APIs
// ========================================
export const login = (credentials) => api.post('/auth/login', credentials);
export const signup = (userData) => api.post('/auth/signup', userData);

// ========================================
// DIETITIAN APIs
// ========================================
export const getDietitianDashboard = (dietitianId) =>
  api.get(`/dietitian/${dietitianId}/dashboard`);

export const getAllPatients = (dietitianId) =>
  api.get(`/dietitian/patients`, { params: { dietitianId } });

export const getPatientProfile = (patientId) =>
  api.get(`/dietitian/patient/${patientId}`);

export const generateDietChart = (data) =>
  api.post('/dietitian/diet-chart/generate', data);

export const getUpcomingAppointments = (dietitianId) =>
  api.get(`/dietitian/${dietitianId}/appointments`);

export const updateAppointmentStatus = (appointmentId, status) =>
  api.put(`/dietitian/appointment/${appointmentId}/status`, null, { params: { status } });

// ========================================
// DIETITIAN - DIET CHART VIEWING & EDITING (NEW)
// ========================================

// Get full diet chart details for viewing/editing
export const getDietChartDetails = (dietChartId) =>
  api.get(`/dietitian/diet-chart/${dietChartId}/details`);

// Get all diet charts for a specific patient
export const getDietitianDietCharts = (patientId) =>
  api.get(`/dietitian/patient/${patientId}/diet-charts`);

// Update an entire meal with new food items
export const updateMeal = (dietChartId, mealId, mealData) => {
  const dietitianId = localStorage.getItem('userId');
  return api.put(
    `/dietitian/diet-chart/${dietChartId}/meal/${mealId}`,
    mealData,
    { params: { dietitianId } }
  );
};

// Add a single food item to a meal
export const addFoodToMeal = (dietChartId, mealId, foodData) => {
  const dietitianId = localStorage.getItem('userId');
  return api.post(
    `/dietitian/diet-chart/${dietChartId}/meal/${mealId}/food`,
    foodData,
    { params: { dietitianId } }
  );
};

// Remove a food item from a meal
export const deleteMealFood = (dietChartId, mealId, mealFoodId) => {
  const dietitianId = localStorage.getItem('userId');
  return api.delete(
    `/dietitian/diet-chart/${dietChartId}/meal/${mealId}/food/${mealFoodId}`,
    { params: { dietitianId } }
  );
};

// Update quantity of a food item in a meal
export const updateFoodQuantity = (dietChartId, mealId, mealFoodId, quantity) => {
  const dietitianId = localStorage.getItem('userId');
  return api.patch(
    `/dietitian/diet-chart/${dietChartId}/meal/${mealId}/food/${mealFoodId}`,
    { quantity },
    { params: { dietitianId } }
  );
};

// Get all foods from database (with optional filters)
export const getAllFoodsFromDatabase = (category = null, dosha = null) => {
  const params = {};
  if (category) params.category = category;
  if (dosha) params.dosha = dosha;
  return api.get('/dietitian/foods', { params });
};

// Search foods by name
export const searchFoodsInDatabase = (query) =>
  api.get('/dietitian/foods/search', { params: { query } });

// ========================================
// PATIENT APIs
// ========================================
export const getPatientDashboard = (patientId) =>
  api.get(`/patient/${patientId}/dashboard`);

export const addHealthParameter = (data) =>
  api.post('/patient/health-parameter', data);

export const getAllDietitians = () =>
  api.get('/patient/dietitians');

export const bookAppointment = (data) =>
  api.post('/patient/appointment', data);

export const getPatientDietCharts = (patientId) =>
  api.get(`/patient/${patientId}/diet-charts`);

// ========================================
// FOOD APIs (General)
// ========================================
export const searchFood = (query) =>
  api.get('/food/search', { params: { query } });

export const getFoodNutrition = (foodId, quantity) =>
  api.get(`/food/${foodId}/nutrition`, { params: { quantity } });

export const getAllFoods = () =>
  api.get('/food/all');

export default api;*/
// api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper function to get dietitian ID
const getDietitianId = () => {
  // Try multiple sources
  const userId = localStorage.getItem('userId');
  if (userId) return userId;
  
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      return user.profileId || user.id;
    } catch (e) {
      console.error('Error parsing user from localStorage:', e);
    }
  }
  
  return null;
};

// ========================================
// AUTH APIs
// ========================================
export const login = (credentials) => api.post('/auth/login', credentials);
export const signup = (userData) => api.post('/auth/signup', userData);

// ========================================
// DIETITIAN APIs
// ========================================
export const getDietitianDashboard = (dietitianId) =>
  api.get(`/dietitian/${dietitianId}/dashboard`);

export const getAllPatients = (dietitianId) =>
  api.get(`/dietitian/patients`, { params: { dietitianId } });

export const getPatientProfile = (patientId) =>
  api.get(`/dietitian/patient/${patientId}`);

export const generateDietChart = (data) =>
  api.post('/dietitian/diet-chart/generate', data);

export const getUpcomingAppointments = (dietitianId) =>
  api.get(`/dietitian/${dietitianId}/appointments`);

export const updateAppointmentStatus = (appointmentId, status) =>
  api.put(`/dietitian/appointment/${appointmentId}/status`, null, { params: { status } });

// ========================================
// DIETITIAN - DIET CHART VIEWING & EDITING (NEW)
// ========================================

// Get full diet chart details for viewing/editing
export const getDietChartDetails = (dietChartId) =>
  api.get(`/dietitian/diet-chart/${dietChartId}/details`);

// Get all diet charts for a specific patient
export const getDietitianDietCharts = (patientId) =>
  api.get(`/dietitian/patient/${patientId}/diet-charts`);

// Update an entire meal with new food items
export const updateMeal = (dietChartId, mealId, mealData) => {
  const dietitianId = getDietitianId();
  if (!dietitianId) {
    return Promise.reject(new Error('Dietitian ID not found. Please log in again.'));
  }
  return api.put(
    `/dietitian/diet-chart/${dietChartId}/meal/${mealId}`,
    mealData,
    { params: { dietitianId } }
  );
};

// Add a single food item to a meal
export const addFoodToMeal = (dietChartId, mealId, foodData) => {
  const dietitianId = getDietitianId();
  
  if (!dietitianId) {
    console.error('No dietitian ID found in localStorage');
    return Promise.reject(new Error('Dietitian ID not found. Please log in again.'));
  }
  
  console.log('Adding food with dietitianId:', dietitianId);
  console.log('DietChartId:', dietChartId, 'MealId:', mealId);
  console.log('Food data:', foodData);
  
  return api.post(
    `/dietitian/diet-chart/${dietChartId}/meal/${mealId}/food`,
    foodData,
    { params: { dietitianId } }
  );
};

// Remove a food item from a meal
export const deleteMealFood = (dietChartId, mealId, mealFoodId) => {
  const dietitianId = getDietitianId();
  if (!dietitianId) {
    return Promise.reject(new Error('Dietitian ID not found. Please log in again.'));
  }
  
  console.log('Deleting food with dietitianId:', dietitianId);
  console.log('DietChartId:', dietChartId, 'MealId:', mealId, 'MealFoodId:', mealFoodId);
  
  return api.delete(
    `/dietitian/diet-chart/${dietChartId}/meal/${mealId}/food/${mealFoodId}`,
    { params: { dietitianId } }
  );
};

// Update quantity of a food item in a meal
export const updateFoodQuantity = (dietChartId, mealId, mealFoodId, quantity) => {
  const dietitianId = getDietitianId();
  if (!dietitianId) {
    return Promise.reject(new Error('Dietitian ID not found. Please log in again.'));
  }
  
  console.log('Updating quantity with dietitianId:', dietitianId);
  console.log('DietChartId:', dietChartId, 'MealId:', mealId, 'MealFoodId:', mealFoodId);
  console.log('New quantity:', quantity);
  
  return api.patch(
    `/dietitian/diet-chart/${dietChartId}/meal/${mealId}/food/${mealFoodId}`,
    { quantity },
    { params: { dietitianId } }
  );
};

// Get all foods from database (with optional filters)
export const getAllFoodsFromDatabase = (category = null, dosha = null) => {
  const params = {};
  if (category) params.category = category;
  if (dosha) params.dosha = dosha;
  return api.get('/dietitian/foods', { params });
};

// Search foods by name
export const searchFoodsInDatabase = (query) =>
  api.get('/dietitian/foods/search', { params: { query } });

// ========================================
// PATIENT APIs
// ========================================
export const getPatientDashboard = (patientId) =>
  api.get(`/patient/${patientId}/dashboard`);

export const addHealthParameter = (data) =>
  api.post('/patient/health-parameter', data);

export const getAllDietitians = () =>
  api.get('/patient/dietitians');

export const bookAppointment = (data) =>
  api.post('/patient/appointment', data);

export const getPatientDietCharts = (patientId) =>
  api.get(`/patient/${patientId}/diet-charts`);

// ========================================
// FOOD APIs (General)
// ========================================
export const searchFood = (query) =>
  api.get('/food/search', { params: { query } });

export const getFoodNutrition = (foodId, quantity) =>
  api.get(`/food/${foodId}/nutrition`, { params: { quantity } });

export const getAllFoods = () =>
  api.get('/food/all');

export default api;
