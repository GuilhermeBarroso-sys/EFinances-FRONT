import {screenCenter} from '../../global/style.module.scss';
import TextField from '@mui/material/TextField';
import styles from './styles.module.scss';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/authentication';
import { Button } from '@mui/material';
import Swal from 'sweetalert2';
export default function Register() {
	const {signUp} = useContext(AuthContext);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	async function handleSignUp() {
		signUp(name,email,password) && Swal.fire("Sucesso!");
	}
	return (
		<div className={screenCenter}>
			<h1 className={styles.title}>Registrar-se</h1>
			<div className={styles.container}>
				<div className = {styles.box}>
					<div><TextField onChange = {(event) => setName(event.target.value)} className = {styles.input}id="standard-basic" label="Nome" variant="outlined" /></div>
					<div><TextField onChange = {(event) => setEmail(event.target.value)} type = "email" className = {styles.input}id="standard-basic" label="Email" variant="outlined" /></div>
					<div><TextField onChange = {(event) => setPassword(event.target.value)} type = "password" className = {styles.input}id="standard-basic" label="Senha" variant="outlined" /></div>
				</div>

				<Button onClick = {() => {handleSignUp(name,email,password);}}variant = "contained" >Enviar</Button>

			</div> 
		</div>
	);
}