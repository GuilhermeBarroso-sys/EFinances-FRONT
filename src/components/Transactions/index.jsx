import { useContext, useEffect, useState } from "react";
import styles from './styles.module.scss';

import { api } from "../../services/api";
import {AuthContext}  from '../../contexts/authentication';
import DataTable from "../DataTable";
import { format, parseISO } from "date-fns";
import  {BulletList} from 'react-content-loader';
import { GlobalUseEffectsContext } from "../../contexts/globalUseEffects";
export function Transactions() {
	const {user} = useContext(AuthContext);
	const [transactionLoading, setTransactionLoading] = useState(true);
	const {transactions, setTransactions} = useContext(GlobalUseEffectsContext);
	useEffect(() => {
		if(user){
			api.get(`transactions/${user.Account[0].id}?delay=2500`).then(({data}) => {
				setTransactions(data.map(({id,name,value,type,datetime}) => {
					datetime = format(parseISO(datetime), 'dd/MM/yyyy HH:mm:ss');
					type = type == 'income' ? 'Entrada' : 'Saida';
					return {id, name, value, type, datetime};
				}));
				setTransactionLoading(false);
			});
		}
	}, [user]);
  
	// const rows = [
	// 	{id: 1, name: 'Notebook', value: 'R$ 4000', category: 'Equipamento', data: '01/05/2022'},
	// 	{id: 2, name: 'Notebook', value: '4000', category: 'Equipamento', data: '01/05/2022'},
	// 	{id: 3, name: 'Notebook', value: '4000', category: 'Equipamento', data: '01/05/2022'},
	// 	{id: 4, name: 'Notebook', value: '4000', category: 'Equipamento', data: '01/05/2022'},
	// 	{id: 5, name: 'Notebook', value: '4000', category: 'Equipamento', data: '01/05/2022'},
	// 	{id: 6, name: 'Notebook', value: '4000', category: 'Equipamento', data: '01/05/2022'},
	// ];
	const columns = [
		{ id: 2, field: 'name', headerName: 'Nome', width: 250},
		{ id: 1, field: 'value', headerName: 'Valor', width: 250},
		{ id: 3, field: 'type', headerName: 'Tipo da transação', width: 450 },
		{ id: 4, field: 'datetime', headerName: 'Data da transação', width: 350 },
		// {
		//   field: 'age',
		//   headerName: 'Age',
		//   type: 'number',
		//   width: 90,
		// },
		// {
		//   field: 'fullName',
		//   headerName: 'Full name',
		//   description: 'This column has a value getter and is not sortable.',
		//   sortable: false,
		//   width: 160,
		//   valueGetter: (params) =>
		//     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
		// },
	];
  
  
	return  transactionLoading ? 	<div className={styles.datatableLoading}><BulletList style={{
		width: '80%',
	}} backgroundColor={'var(--green)'}  /> </div> : <DataTable  rows = {transactions} columns = {columns}/>;
}