import { TextField } from "@mui/material";
import OutlinedInput from '@mui/material/OutlinedInput';
import DatePicker from '@mui/lab/DatePicker';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import MuiContainer from "../Container";
import MarginTop from "../MarginTop";
import SelectOptions from "../SelectOptions";
import styles from './styles.module.scss';
import {useState} from 'react';
import { api } from "../../services/api";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authentication";
export default function NewTransaction() {
	const {user} = useContext(AuthContext);
	console.log(user);
	const selectOptions = [
		{
			value: 'input',
			label: 'Entrada'
		},  {
			value: 'outcome',
			label: 'Saida'
		},
	];

	const maskMap = {
		ptBr: '__/__/____'
	};
	const [transaction, setTransaction] = useState('input');
	const [amount, setAmount] = useState('');
	const [transactionDate, setTransactionDate] = useState();
	function handleSubmit(event) {
		event.preventDefault();
		api.post('transactions', {
	    // value: amount, category : transaction, datetime: transactionDate, account_id
	  }).then(data => {console.log(data);});
	}
	return (
		<div className = {styles.modalStyle}> 
			<form>
				<h1>Adicionar transação</h1>
				<MarginTop margin={'1.3rem'}  />

				<MuiContainer >
				
					<TextField id="standard-basic" label="Nome da transação"  fullWidth/>
					<MarginTop margin={'2rem'}  />
					<SelectOptions value = {transaction} setValue= {setTransaction} options = {selectOptions} selectLabel = {"Tipo de transação"} helperText = {""} />
					<MarginTop margin={'1.1rem'}  />
					<InputLabel htmlFor="outlined-adornment-amount">Valor da transação</InputLabel>
					<OutlinedInput
						id="outlined-adornment-amount"
						value={amount}
						onChange={(event) => {setAmount(event.target.value);}}
						startAdornment={<InputAdornment position="start">$</InputAdornment>}
						label=""
						fullWidth
					/>
					<MarginTop margin={'2rem'}  />
		
					<DatePicker
						mask={maskMap['ptBr']}
            
						label="Data da transação"
						value={transactionDate}
					
						onChange={(date) => {
							console.log(date);
							setTransactionDate(date);
						}}
            
						renderInput={(params) => <TextField {...params} fullWidth />}
					/>

					<MarginTop margin={'2rem'}  />
					<Button variant="contained" onClick = {handleSubmit} color="success">Enviar</Button>
			
				</MuiContainer>
			</form>
			
		</div>
	);
}