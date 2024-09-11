import axios from 'axios';

const API_URL = 'http://localhost:5000/api';


const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
});

export const login = (data) => api.post('/api/auth/login', data);

export const createClient = (data) => api.post('/api/clients', data);

export const createInvoice = (data) => api.post('/api/invoices', data);


export const generateInvoice = async (invoiceData) => {
  try {
    const response = await axios.post(`${API_URL}/generate-invoice`, invoiceData, {
      responseType: 'arraybuffer',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/pdf'
      }
    });
    return response;
  } catch (error) {
    console.error('Error generating invoice:', error);
    throw error;
  }
};