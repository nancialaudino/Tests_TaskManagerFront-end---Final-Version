import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/', // O proxy do Vite redireciona /tasks → http://localhost:8080
  headers: {
    'Content-Type': 'application/json',
  },
});

// Log das requisições
apiClient.interceptors.request.use(request => {
  console.log('Starting Request', request);
  return request;
});

export const api = {
  getHello() {
    return apiClient.get('tasks/hello');
  },
  getTasks() {
    return apiClient.get('tasks');
  },
  addTask(description) {
    return apiClient.post('tasks', { description });
  },
  completeTask(id) {
    return apiClient.put(`tasks/${id}/complete`);
  },
  deleteTask(id) {
    return apiClient.delete(`tasks/${id}`);
  }
};
