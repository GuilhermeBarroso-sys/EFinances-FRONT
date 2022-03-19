import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import Swal from 'sweetalert2';
export const AuthContext = createContext({});
export function AuthProvider(props) {
	const [user, setUser] = useState(null);
	console.log(user);
	async function signIn(email, password ) {
		try {
			const {data} = await api.post('users/authenticate', { email, password });
			const {user,token} = data;
			localStorage.setItem('@dolphin:token', token);
			api.defaults.headers.common.authorization = `Bearer ${token}`;
			setUser(user);
			console.log(user);
			return true;
		} catch({response}) {
			Swal.fire({
				title: 'Erro',
				text: "Por favor, verifique os campos!",
				icon: "error",
			});
			return false;
		}
	}

	async function signUp(name,email,password) {
		try {
	
			await api.post('users', { name, email, password}),
			await signIn(email, password);
			await api.post('accounts');
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
			return false;
		}
		api.defaults.headers.common.authorization = `Bearer ${token}`;
		return true;
	}

	useEffect(() => {
		const token = localStorage.getItem('@dolphin:token');
		if(token) {
			api.defaults.headers.common.authorization = `Bearer ${token}`;
		}
	},[]);

	return (
		<AuthContext.Provider value = {{user,signOut, signIn, signUp, isAuthenticated}}>
			{props.children}  
		</AuthContext.Provider>
	);
}