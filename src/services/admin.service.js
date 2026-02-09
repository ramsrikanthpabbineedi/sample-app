import apiClient from './api.service';

export const getAllClients = () => {
  return apiClient.get('/admin/clients');
};

export const getClientMeals = (userId, date) => {
  return apiClient.get(`/admin/clients/${userId}/meals?date=${date}`);
};

export const getMealsSummary = (date) => {
  return apiClient.get(`/admin/meals/summary?date=${date}`);
};

export const addFeedback = (clientUserId, feedbackText) => {
  return apiClient.post('/admin/feedback', {
    client_user_id: clientUserId,
    feedback_text: feedbackText
  });
};