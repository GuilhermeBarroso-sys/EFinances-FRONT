import {screenCenter} from '../../global/styles.module.scss';
import TextField from '@mui/material/TextField';
import styles from './styles.module.scss';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/authentication';
import { Button } from '@mui/material';
import {Navigate, Link} from 'react-router-dom';
import { GlobalLoadingContext } from '../../contexts/globalLoading';
import undrawLogin from '../../assets/undraw_login.svg';

export default function Login() {
	const {signIn} = useContext(AuthContext);
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
	async function handleSignIn() {
		setIsLoading(true);
		const successRegister = await signIn(email,password);
		setIsLoading(false);
		if(successRegister) {
			setRedirect(true);
		} 
	}
	return (
		<div className={screenCenter}>
			{redirect && <Navigate to = '/dashboard' />}
			<h1 className={styles.title}>Sign In</h1>
			<img src = {undrawLogin} className = {styles.logo} />
			<div className={styles.container}>
				<div className = {styles.box}>
					<div><TextField type={`email`} onChange = {(event) => setEmail(event.target.value)}  className = {styles.input} label="Email" variant="outlined" /></div>
					<div><TextField
						type="password"
						onChange = {(event) => setPassword(event.target.value)}  className = {styles.input} label="Password" variant="outlined" /></div>
				</div>
				{isLoading ? <Button disabled  variant = "contained" >Send</Button> :<Button onClick = {() => {handleSignIn(email,password);}}variant = "contained" >Send</Button>}
				<br/>
				<br/>
				<Link to = "/register" className={styles.smallText}><small> Doesn't Have an account? Click Here</small> </Link>
			</div> 
		</div>
	);
}