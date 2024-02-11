import axios from 'axios';

const BASE_URL = 'https://localhost:8080/companyapplication/api';

export const fetchUsers = async () => {
  const response = await axios.get(`${BASE_URL}/users`);
  return response.data;
};

export const fetchClients = async () => {
  const response = await axios.get(`${BASE_URL}/clients`);
  return response.data;
};

export const fetchCompanies = async () => {
  const response = await axios.get(`${BASE_URL}/companies`);
  return response.data;
};
