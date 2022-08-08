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
import { format, parseISO } from "date-fns";
import { requiredFieldsIsNull } from "../../functions/requiredFieldsIsNull";
import Swal from "sweetalert2";
export default function NewTransaction({modal}) {
	const {user} = useContext(AuthContext);
	const selectOptions = [
		{
			value: 'income',
			label: 'Income'
		},  {
			value: 'outcome',
			label: 'Outcome'
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
	const {transactions, transactionsData, setTransactions, setTransactionsData} = useContext(GlobalUseEffectsContext);

	function handleSubmit(event) {
		setIsLoading(true);
		if(requiredFieldsIsNull([name,type,amount,transactionDate])) {
			Swal.fire("Required field!", "Please fill all fields, ", "error");
			setIsLoading(false);
			return;
		}
		event.preventDefault();
		modal(false);
		api.post('transactions', {
			name, value: parseFloat(amount), type , datetime: convertDateToString(transactionDate), account_id: user.Account[0].id
		}).then(({data,status}) => {
			if(status == 201) {     
				const newTransactionsData = transactionsData;
				data.datetime = format(parseISO(data.datetime), 'MM/dd/yyyy HH:mm:ss');
				const newTransactionIncome = newTransactionsData.income;
				const newTransactionOutcome = newTransactionsData.outcome;
				const total = newTransactionsData.total;
				data.type = type == 'income' ? 'Income' : 'Outcome';
				if(data.type == 'Income') {
					newTransactionsData.income = (newTransactionIncome + data.value);
		
					newTransactionsData.total =  (total + data.value);
				} else {
					newTransactionsData.outcome = (newTransactionOutcome + data.value);
					newTransactionsData.total =  (total - data.value);

				}


				setTransactions([...transactions, data]);
				setTransactionsData(newTransactionsData);
				setIsLoading(false);
				notification('Success', 'Success!', 'success');
				return;
			}
			setIsLoading(false);
			notification('Error!', 'Something is wrong! Try again later', 'danger');
		}).catch(() => {
			setIsLoading(false);
			notification('Error!', 'Something is wrong! Try again later', 'danger');
		});
	}

	return (
		<div className = {styles.modalStyle}> 
			<form>
				<h1>New Transaction</h1>
				<MarginTop margin={'1.3rem'}  />
				<MuiContainer >
					<TextField onChange={(event) => {setName(event.target.value);}} label="Transaction Name"  fullWidth/>
					<MarginTop margin={'2rem'}  />
					<SelectOptions value = {type} setValue= {setType} options = {selectOptions} selectLabel = {"Transaction Type"} helperText = {""} />
					<MarginTop margin={'1.1rem'}  />
					<InputLabel htmlFor="outlined-adornment-amount">Transaction value</InputLabel>
					<OutlinedInput
						id="outlined-adornment-amount"
						value={amount}
						type="number"
						onChange={(event) => {
							// const money = event.target.value;
							// console.log(money, typeof(money), parseFloat(money));
							setAmount(event.target.value);
						}}
						startAdornment={<InputAdornment position="start">$</InputAdornment>}
						label=""
						fullWidth
					/>
					<MarginTop margin={'2rem'}  />
		
					<DateTimePicker
						mask={maskMap['ptBr']}
						label="Transaction Date"
						value={transactionDate}
						onChange={(date) => {
							setTransactionDate(date);
						}}
            
						renderInput={(params) => <TextField {...params} fullWidth />}
					/>

					<MarginTop margin={'2rem'}  />
					<Button variant="contained" onClick = {handleSubmit} color="success">Send</Button>
			
				</MuiContainer>
			</form>
			
		</div>
	);
}