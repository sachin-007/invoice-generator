import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

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