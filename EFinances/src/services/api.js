import axios from 'axios';

export const handlerApi = axios.create({
	baseURL: `https://efinances.herokuapp.com`
	// baseURL: `http://localhost:3001`

});