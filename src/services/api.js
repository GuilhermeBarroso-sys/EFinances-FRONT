import axios from 'axios';

export const api = axios.create({
	baseURL: `https://efinances.herokuapp.com`
	// baseURL: `http://localhost:3001`

});