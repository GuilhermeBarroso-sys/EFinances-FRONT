import {screenCenter} from '../../global/styles.module.scss';
import TextField from '@mui/material/TextField';
import styles from './styles.module.scss';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/authentication';
import { Button, CircularProgress } from '@mui/material';
import {Navigate, Link} from 'react-router-dom';
import { LinearProgressContext } from '../../contexts/linearProgress';
import undrawLogin from '../../assets/undraw_login.svg';

export default function Login() {
	const {signIn} = useContext(AuthContext);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [redirect, setRedirect] = useState(false);
	const {isLoading, setIsLoading} = useContext(LinearProgressContext);
	useEffect(() => {
		const token = localStorage.getItem('@dolphin:token');
		if(token) {
			setRedirect(true);
		}
	});
	async function handleSignIn() {
		setIsLoading(true);
		const successRegister = await signIn(email,password);
		setIsLoading(false);
		console.log(successRegister);
		if(successRegister) {
			setRedirect(true);
		} 
	}
	return (
		<div className={screenCenter}>
			{redirect && <Navigate to = '/dashboard' />}
			<h1 className={styles.title}>Entrar</h1>
			<img src = {undrawLogin} className = {styles.logo} />
			<div className={styles.container}>
				<div className = {styles.box}>
					<div><TextField type={`email`} onChange = {(event) => setEmail(event.target.value)}  className = {styles.input} label="Email" variant="outlined" /></div>
					<div><TextField
						type="password"
						onChange = {(event) => setPassword(event.target.value)}  className = {styles.input} label="Senha" variant="outlined" /></div>
				</div>
				{isLoading ? <Button disabled  variant = "contained" >Enviar</Button> :<Button onClick = {() => {handleSignIn(email,password);}}variant = "contained" >Enviar</Button>}
				<br/>
				<br/>
				<Link to = "/register" className={styles.smallText}><small> Não tem uma conta? Clique aqui para registrar-se</small> </Link>
			</div> 
		</div>
	);
}