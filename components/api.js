import axios from 'axios';

export const getDestinations = async () => {
  try {
    const response = await axios.get('http://10.13.168.8:8000/destinations');
    return response.data;
  } catch (error) {
    console.error('Error fetching destinations:', error);
    return [];
  }
};