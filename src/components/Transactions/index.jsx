import { useContext, useEffect, useState } from "react";
import styles from './styles.module.scss';

import { api } from "../../services/api";
import {AuthContext}  from '../../contexts/authentication';
import DataTable from "../DataTable";
import { format, parseISO } from "date-fns";
import  {BulletList} from 'react-content-loader';
import { GlobalUseEffectsContext } from "../../contexts/globalUseEffects";
import Swal from "sweetalert2";
import { notification } from "../../functions/notification";
export function Transactions() {
	
	const {user} = useContext(AuthContext);
	const [transactionLoading, setTransactionLoading] = useState(true);
	const {transactions, setTransactions, transactionsData, setTransactionsData} = useContext(GlobalUseEffectsContext);
	async function handleDelete(transactionSelect, setTransactionSelect) {
		const transactionLength = transactionSelect.length;
		const {isConfirmed} = await Swal.fire({
			title: 'Are you sure?',
			text:  transactionLength > 1 ? `${transactionLength} transactions will to be lost!` : 'this transaction will be lost!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Delete',
			cancelButtonText: 'Cancel'
		});
		if(isConfirmed) {
			const ids = transactionSelect.toString();
			try {
				const newTransactionsData = transactionsData;
				await api.delete(`/transactions?ids=${ids}`);
				const data = transactions.map(transaction => {
          
					if(!(transactionSelect.includes(transaction.id))) {
						return transaction;
					} else {
						transaction.type == 'Outcome' 
							? newTransactionsData.outcome = newTransactionsData.outcome - transaction.value
							: newTransactionsData.income = newTransactionsData.income - transaction.value;
  
						newTransactionsData.total = newTransactionsData.income - newTransactionsData.outcome;
					}
				});
        
				setTransactionsData(newTransactionsData);
				setTransactions(data.filter(data => data != undefined));
				transactionLength > 1 
					? notification('Success', `${transactionLength} Transactions deleted with success!`, 'success') 
					: notification('Success', ` Transaction deleted with success!`, 'success'); 
				setTransactionSelect([]);

        
			} catch( err) {
				Swal.fire('Error', 'Something is wrong', 'error');
			}
		} 

	}
	useEffect(() => {
		if(user){
			api.get(`transactions/${user.Account[0].id}`).then(({data}) => {
				setTransactionsData({
					income: data.income,
					outcome: data.outcome,
					total: data.total
				});
				setTransactions(data.transactions.map(({id,name,value,type,datetime}) => {
					datetime = format(parseISO(datetime), 'MM/dd/yyyy HH:mm:ss');
					type = type == 'income' ? 'Income' : 'Outcome';
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
		{ id: 2, field: 'name', headerName: 'Name', width: 400},
		{ id: 1, field: 'value', headerName: 'Value', width: 150},
		{ id: 3, field: 'type', headerName: 'Transaction Type', width: 170 },
		{ id: 4, field: 'datetime', headerName: 'Transaction Date (mm/dd/yyyy)', width: 350 },
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
	}} backgroundColor={'var(--green)'}  /> </div> : <DataTable sort={[{field: 'datetime', sort: 'desc'}]} rows = {transactions} columns = {columns} handleDelete = {handleDelete}/>;
}