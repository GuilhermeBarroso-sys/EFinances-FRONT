import axios from 'axios';

export const handlerApi = axios.create({
	baseURL: `localhost:3001`
});