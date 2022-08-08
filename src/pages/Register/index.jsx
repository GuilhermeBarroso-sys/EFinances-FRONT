import {screenCenter} from '../../global/styles.module.scss';
import TextField from '@mui/material/TextField';
import styles from './styles.module.scss';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/authentication';
import { Button } from '@mui/material';
import {Link, Navigate} from 'react-router-dom';
import undrawRegister from '../../assets/undraw_register.svg';
import { GlobalLoadingContext } from '../../contexts/globalLoading';
export default function Register() {
	const {signUp} = useContext(AuthContext);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [redirect, setRedirect] = useState(false);
	const {isLoading, setIsLoading} = useContext(GlobalLoadingContext);
	useEffect(() => {
		const token = localStorage.getItem('@dolphin:token');
		if(token) {
			setRedirect(true);
		}
	});
	async function handleSignUp() {
		setIsLoading(true);
		const successRegister = await signUp(name,email,password);
		if(successRegister) {
			setRedirect(true);
		}
		setIsLoading(false);
	}
	return (
		<div className={screenCenter}>
      
			{redirect && <Navigate to = '/dashboard' />}
			<h1 className={styles.title}>Register</h1>
			<img src = {undrawRegister} className = {styles.logo} />
			<div className={styles.container}>
				<div className = {styles.box}>
					<div><TextField onChange = {(event) => setName(event.target.value)} className = {styles.input} label="Name" variant="outlined" /></div>
					<div><TextField type={`email`} onChange = {(event) => setEmail(event.target.value)}  className = {styles.input} label="Email" variant="outlined" /></div>
					<div><TextField
						type="password"
						onChange = {(event) => setPassword(event.target.value)}  className = {styles.input} label="Password" variant="outlined" /></div>
				</div>

				{isLoading 
					?<Button disabled  variant = "contained" >Sign up</Button>
					:<Button onClick = {handleSignUp}variant = "contained" >Sign up</Button>
				}
				<br />
				<br />

				<Link to = "/login" className={styles.smallText}><small> Have an account? Click here!</small> </Link>
			</div> 
		</div>
	);
}