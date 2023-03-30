import axios from 'axios';

const endpoint = 'https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=e5d55877d7ef290e791dd048dfd1bbaa';

export const api = axios.create({
  baseURL: endpoint
});