import axios from 'axios';

export const handlerApi = axios.create({
	baseURL: `http://localhost:3001`
});