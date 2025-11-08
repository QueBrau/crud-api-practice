import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const getAllAnimals = async () => {
  const response = await axios.get(`${API_BASE_URL}/animals`);
  return response.data;
};

export const getAnimalById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/animals/${id}`);
  return response.data;
};

export const searchAnimalsByName = async (name) => {
  const response = await axios.get(`${API_BASE_URL}/animals/name?name=${name}`);
  return response.data;
};

export const getAnimalsByDangerLevel = async (dangerLevel) => {
  const response = await axios.get(`${API_BASE_URL}/animals/danger/${dangerLevel}`);
  return response.data;
};

export const addAnimal = async (animal) => {
  const response = await axios.post(`${API_BASE_URL}/animals`, animal);
  return response.data;
};

export const updateAnimal = async (id, animal) => {
  const response = await axios.put(`${API_BASE_URL}/animals/${id}`, animal);
  return response.data;
};

export const deleteAnimal = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/animals/${id}`);
  return response.data;
};