import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authentication";

export function Logout() {
	const {signOut} = useContext(AuthContext);
	signOut();
	return <Navigate to = '/login' />;
}