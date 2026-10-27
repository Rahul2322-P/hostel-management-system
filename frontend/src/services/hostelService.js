import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/api/hostels';

export const hostelService = {
  async getAllHostels() {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    } catch (error) {
      throw formatError(error);
    }
  },

  async getHostelById(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw formatError(error);
    }
  },

  async createHostel(hostelData) {
    try {
      const payload = {
        hostelName: hostelData.hostelName?.trim(),
        location: hostelData.location?.trim(),
        roomCount: parseInt(hostelData.roomCount, 10),
        wardenName: hostelData.wardenName?.trim(),
      };
      const response = await axios.post(API_BASE_URL, payload);
      return response.data;
    } catch (error) {
      throw formatError(error);
    }
  },

  async deleteHostel(id) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw formatError(error);
    }
  },
};

function formatError(error) {
  if (error.response) {
    const data = error.response.data;
    const status = error.response.status;

    if (data && typeof data === 'object') {
      if (data.errors && Array.isArray(data.errors)) {
        return new Error(data.errors.join(', '));
      }
      if (data.fieldErrors) {
        const details = Object.entries(data.fieldErrors)
          .map(([field, msg]) => `${field}: ${msg}`)
          .join(', ');
        return new Error(details);
      }
      if (data.message) {
        return new Error(data.message);
      }
    }

    if (status === 404) {
      return new Error('Hostel not found (Status 404).');
    }
    if (status === 400) {
      return new Error('Invalid request data (Status 400). Please check your inputs.');
    }
    return new Error(`Server error (${status}): ${error.response.statusText || 'Unknown error'}`);
  } else if (error.request) {
    return new Error(
      `Cannot connect to backend server at ${API_BASE_URL}. Please ensure the Spring Boot server is running on port 8081.`
    );
  } else {
    return new Error(error.message || 'An unexpected error occurred.');
  }
}

export default hostelService;
