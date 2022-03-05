import {screenCenter} from '../../global/style.module.scss';
import Box from '@mui/material/Box';
import AccountCircle from '@mui/icons-material/AccountCircle';
import TextField from '@mui/material/TextField';
import styles from './styles.module.scss';
export default function Register() {
	return (
		<div className={screenCenter}>
			<h1 className={styles.title}>Registrar-se</h1>
			<div className={styles.container}>
				<div className = {styles.box}>

					<div><TextField className = {styles.input}id="standard-basic" label="Nome" variant="outlined" /></div>
					<div><TextField type = "email" className = {styles.input}id="standard-basic" label="Email" variant="outlined" /></div>
					<div><TextField type = "password" className = {styles.input}id="standard-basic" label="Senha" variant="outlined" /></div>
				</div>
			</div> 
		</div>
	);
}