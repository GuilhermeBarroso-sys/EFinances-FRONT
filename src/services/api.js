import axios from 'axios';
const isProduction = window.location.hostname !== 'localhost' ? true : false;
console.log(isProduction, isProduction ? `https://efinances.herokuapp.com` : `http://localhost:3001`);
export const api = axios.create({
	baseURL: isProduction ? `https://efinances.herokuapp.com` : `http://localhost:3001`

});