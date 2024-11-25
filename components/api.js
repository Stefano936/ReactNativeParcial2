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

export const addDestination = async (destination) => {
  try {
    const response = await axios.post('http://10.13.168.8:8000/destinations', destination);
    return response.data;
  } catch (error) {
    console.error('Error adding destination:', error);
  }
};

export const editDestination = async (id, destination) => {
  try {
    const response = await axios.put(`http://10.13.168.8:8000/destinations/${id}`, destination);
    return response.data;
  } catch (error) {
    console.error('Error editing destination:', error);
  }
};