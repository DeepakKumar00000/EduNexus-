import axios from 'axios';

const apiConnector = axios.create({
  // baseURL: 'http://localhost:5000/api/v1',
  baseURL: 'https://edunexus-backend-x9ar.onrender.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiConnector;
