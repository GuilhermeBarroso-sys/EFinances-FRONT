import { TextField } from "@mui/material";
import MuiContainer from "../Container";
import MarginTop from "../MarginTop";
import SelectOptions from "../SelectOptions";
import styles from './styles.module.scss';
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
	const [transaction, setTransaction] = useState('input');
	return (
		<div className = {styles.modalStyle}> 

			<h1>Adicionar transação</h1>
			<MuiContainer >
				<form>
					<TextField id="standard-basic" label="Nome da transação" />
					<MarginTop margin={'2rem'}  />
					<SelectOptions value = {transaction} setValue= {setTransaction} options = {selectOptions} selectLabel = {"Tipo de transação"} helperText = {"Selecione o tipo de transação"}/>
				</form>
			</MuiContainer>
		</div>
	);
}