import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import Swal from 'sweetalert2';
import {Navigate} from 'react-router-dom';
export const AuthContext = createContext({});

export function AuthProvider(props) {
	const [user, setUser] = useState(null);

	async function signIn(email, password ) {
		try {
			const {data} = await api.post('users/authenticate', { email, password });
			const {user,token} = data;
			localStorage.setItem('@dolphin:token', token);
			api.defaults.headers.common.authorization = `Bearer ${token}`;
			setUser(user);
			return true;
		} catch({response}) {
			Swal.fire({
				title: 'Erro',
				text: `${response.data}`,
				icon: "error",
			});
			return false;
		}
	}

	async function signUp(name,email,password) {
		try {
	
			await api.post('users?delay=2500', { name, email, password}),
			await signIn(email, password);
			return true;
		} catch({response}) {
			Swal.fire({
				title: 'Erro',
				text: `${response.data}`,
				icon: "error",
			});
			return false;
		}
	}

	function signOut(){
		setUser(null);
		localStorage.removeItem('@dolphin:token');
	}

	function isAuthenticated(){
		const token = localStorage.getItem('@dolphin:token');
		if(!token) {
			return <Navigate  to = '/login'/>;
		}
	}
  
	async function fetchUser() {
		try {
			const {data} = await api.get('users');
		
			setUser(data);
		} catch(err) {
			signOut();
      
		}
	}

	useEffect(() => {
		const token = localStorage.getItem('@dolphin:token');
		if(!token) {
			signOut();
			return;
		}
		api.defaults.headers.common.authorization = `Bearer ${token}`;
		fetchUser();
	},[]);

	return (
		<AuthContext.Provider value = {{user,signOut, signIn, signUp, isAuthenticated}}>
			{props.children}  
		</AuthContext.Provider>
	);
}