import { TextField } from "@mui/material";
import OutlinedInput from '@mui/material/OutlinedInput';
import {DateTimePicker} from '@mui/lab';
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
import { convertDateToString } from "../../functions/convertDateToString";
import { GlobalLoadingContext } from "../../contexts/globalLoading";
import { notification } from "../../functions/notification";
import { GlobalUseEffectsContext } from "../../contexts/globalUseEffects";
export default function NewTransaction({modal}) {
	const {user} = useContext(AuthContext);
	const selectOptions = [
		{
			value: 'income',
			label: 'Entrada'
		},  {
			value: 'outcome',
			label: 'Saida'
		},
	];
  
	const maskMap = {
		ptBr: '__/__/____ __:__'
	};
	const [name, setName] = useState('');
	const [type, setType] = useState('income');
	const [amount, setAmount] = useState('');
	const [transactionDate, setTransactionDate] = useState(new Date());
	const {setIsLoading} = useContext(GlobalLoadingContext);
	const {transactions, setTransactions} = useContext(GlobalUseEffectsContext);

	function handleSubmit(event) {
		modal(false);
		setIsLoading(true);
		event.preventDefault();
		api.post('transactions', {
			name, value: parseFloat(amount), type , datetime: convertDateToString(transactionDate), account_id: user.Account[0].id
		}).then(({data,status}) => {
			if(status == 201) {
				setTransactions([...transactions, data]);
				setIsLoading(false);
				notification('Sucesso', 'Transacao criada com sucesso!', 'success');
				return;
			}
			setIsLoading(false);
			notification('Erro!', 'Algo deu errado. Tente novamente mais tarde', 'danger');
		}).catch(() => {
			setIsLoading(false);
			notification('Erro!', 'Algo deu errado. Tente novamente mais tarde', 'danger');
		});
	}

	return (
		<div className = {styles.modalStyle}> 
			
			<form>
				<h1>Adicionar transação</h1>
				<MarginTop margin={'1.3rem'}  />

				<MuiContainer >
				
					<TextField onChange={(event) => {setName(event.target.value);}} label="Nome da transação"  fullWidth/>
					<MarginTop margin={'2rem'}  />
					<SelectOptions value = {type} setValue= {setType} options = {selectOptions} selectLabel = {"Tipo de transação"} helperText = {""} />
					<MarginTop margin={'1.1rem'}  />
					<InputLabel htmlFor="outlined-adornment-amount">Valor da transação</InputLabel>
					<OutlinedInput
						id="outlined-adornment-amount"
						value={amount}
						type="number"
						onChange={(event) => {
							setAmount(event.target.value);
						}}
						startAdornment={<InputAdornment position="start">$</InputAdornment>}
						label=""
						fullWidth
					/>
					<MarginTop margin={'2rem'}  />
		
					<DateTimePicker
						mask={maskMap['ptBr']}
						label="Data da transação"
						value={transactionDate}
						onChange={(date) => {
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