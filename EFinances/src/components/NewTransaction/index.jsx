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
import { format } from 'date-fns';
import {useState} from 'react';
export default function NewTransaction() {
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
	return (
		<div className = {styles.modalStyle}> 

			<h1>Adicionar transação</h1>
			<MarginTop margin={'1.3rem'}  />

			<MuiContainer >
				<form>
					<TextField id="standard-basic" label="Nome da transação" />
					<MarginTop margin={'2rem'}  />
					<SelectOptions value = {transaction} setValue= {setTransaction} options = {selectOptions} selectLabel = {"Tipo de transação"} helperText = {""}/>
					<MarginTop margin={'1.1rem'}  />
					<InputLabel htmlFor="outlined-adornment-amount">Valor da transação</InputLabel>
					<OutlinedInput
						id="outlined-adornment-amount"
						value={amount}
						onChange={(event) => {setAmount(event.target.value);}}
						startAdornment={<InputAdornment position="start">$</InputAdornment>}
						label=""
					/>
					<MarginTop margin={'2rem'}  />
					<DatePicker
						mask={maskMap['ptBr']}
						label="Data da transação"
						value={transactionDate}
						onChange={(date) => {
							setTransactionDate(date);
						}}
            
						renderInput={(params) => <TextField {...params} />}
					/>
					<MarginTop margin={'2rem'}  />
					<Button variant="contained" color="success">Enviar</Button>
				</form>
			</MuiContainer>
		</div>
	);
}