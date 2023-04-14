import axios from 'axios';

const client = axios.create({
  baseURL: 'https://opensky-network.org/api',
});

export default client;
