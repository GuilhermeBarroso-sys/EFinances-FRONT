import {screenCenter} from '../../global/style.module.scss';
import TextField from '@mui/material/TextField';
import styles from './styles.module.scss';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/authentication';
import { Button } from '@mui/material';
import Swal from 'sweetalert2';
import {Navigate, useNavigate} from 'react-router-dom';
export default function Register() {
	const {signUp} = useContext(AuthContext);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [redirect, setRedirect] = useState(false);
	useEffect(() => {
		const token = localStorage.getItem('@dolphin:token');
		if(token) {
			setRedirect(true);
		}
	});
	async function handleSignUp() {
		const successRegister = await signUp(name,email,password);
		if(successRegister) {
			setRedirect(true);
		}
	}
	return (
		<div className={screenCenter}>
			{redirect && <Navigate to = '/dashboard' />}
			<h1 className={styles.title}>Registrar-se</h1>
			<div className={styles.container}>
				<div className = {styles.box}>
					<div><TextField onChange = {(event) => setName(event.target.value)} className = {styles.input}id="standard-basic" label="Nome" variant="outlined" /></div>
					<div><TextField type={`email`} onChange = {(event) => setEmail(event.target.value)}  className = {styles.input}id="standard-basic" label="Email" variant="outlined" /></div>
					<div><TextField hintText="Password"
						floatingLabelText="Password"
						type="password"
						onChange = {(event) => setPassword(event.target.value)}  className = {styles.input}id="standard-basic" label="Senha" variant="outlined" /></div>
				</div>

				<Button onClick = {() => {handleSignUp(name,email,password);}}variant = "contained" >Enviar</Button>

			</div> 
		</div>
	);
}