import axios from 'axios';

export const handlerApi = axios.create({
	baseURL: `${import.meta.env.API_URL}`
});