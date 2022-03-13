import { createContext, useEffect, useState } from "react";
import { handlerApi } from "../services/api";
import Swal from 'sweetalert2';
export const AuthContext = createContext({});
export function AuthProvider(props) {
	const [user, setUser] = useState(null);
	async function signIn(email, password ) {
		try {
			const {data} = await handlerApi.post('users/authenticate', { email, password });
			const {user,token} = data;
			console.log(user,token);
			localStorage.setItem('@dolphin:token', token);
			handlerApi.defaults.headers.common.authorization = `Bearer ${token}`;
			setUser(user);
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
			await handlerApi.post('users', { name, email, password}),
			await signIn(email, password);
			await handlerApi.post('accounts');
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

	function signOut(){
		setUser(null);
		localStorage.removeItem('@dolphin:token');
	}

	function isAuthenticated(){
		const token = localStorage.getItem('@dolphin:token');
		if(!token) {
			return false;
		}
		handlerApi.defaults.headers.common.authorization = `Bearer ${token}`;
		return true;
	}

	useEffect(() => {
		const token = localStorage.getItem('@dolphin:token');
		if(token) {
			handlerApi.defaults.headers.common.authorization = `Bearer ${token}`;
		}
	},[]);

	return (
		<AuthContext.Provider value = {{user,signOut, signIn, signUp, isAuthenticated}}>
			{props.children}  
		</AuthContext.Provider>
	);
}