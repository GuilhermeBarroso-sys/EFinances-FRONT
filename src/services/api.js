import axios from 'axios';

export const api = axios.create({
	baseURL: !import.meta.env.VITE_DEVELOPMENT ? `https://efinances.herokuapp.com` : `http://localhost:3001`

});