// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Replace with your actual API URL

// 1. Generate Random Compliance Documents
export const getRandomDocuments = async () => {
  try {
    const response = await axios.get(`${API_URL}/generate-documents`);
    return response.data;
  } catch (error) {
    console.error('Error fetching random documents:', error);
    throw error;
  }
};

// 2. Validate a Document
export const validateDocument = async (documentData) => {
  try {
    const response = await axios.post(`${API_URL}/validate-document`, documentData, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error('Error validating document:', error);
    if (error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

// 3. Generate Synthetic Document Data
export const generateSyntheticData = async (documentType) => {
  try {
    const response = await axios.get(`${API_URL}/generate-synthetic-data`, {
      params: { document_type: documentType },
    });
    return response.data;
  } catch (error) {
    console.error('Error generating synthetic data:', error);
    if (error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

// 4. Upload a Document
export const uploadDocument = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${API_URL}/upload-document`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error uploading document:', error);
    if (error.response) {
      throw error.response.data;
    }
    throw error;
  }
};
