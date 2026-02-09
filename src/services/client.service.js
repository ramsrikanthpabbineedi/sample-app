import apiClient from './api.service';

export const validateClientCode = (code, codeType = 'client') => {
  return apiClient.post('/validate-code', {
    code: code,
    code_type: codeType
  });
};

export const getProfile = () => {
  return apiClient.get('/client/profile');
};

export const updateProfile = (profileData) => {
  return apiClient.put('/client/profile', profileData);
};

export const getMeals = (date) => {
  return apiClient.get(`/client/meals?date=${date}`);
};

export const updateMeals = (mealData) => {
  return apiClient.post('/client/meals', mealData);
};

export const getFeedback = () => {
  return apiClient.get('/client/feedback');
};