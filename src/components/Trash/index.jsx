import { useContext, useEffect, useState } from "react";
import styles from './styles.module.scss';
import {AuthContext}  from '../../contexts/authentication';
import DataTable from "../DataTable";
import  {BulletList} from 'react-content-loader';
import { GlobalUseEffectsContext } from "../../contexts/globalUseEffects";
export function Trash() {
	
	const {user} = useContext(AuthContext);
	const [transactionLoading, setTransactionLoading] = useState(true);
	const {transactions, setTransactions} = useContext(GlobalUseEffectsContext);
	useEffect(() => {
		if(transactions) {
			setTransactionLoading(false);
		}
	}, [transactionLoading]);
	const columns = [
		{ id: 2, field: 'name', headerName: 'Name', width: 250},
		{ id: 1, field: 'value', headerName: 'Valor', width: 250},
		{ id: 3, field: 'type', headerName: 'Tipo da transação', width: 450 },
		{ id: 4, field: 'datetime', headerName: 'Data da transação', width: 350 },
	];
  
	return  transactionLoading ? 	<div className={styles.datatableLoading}><BulletList style={{
		width: '80%',
	}} backgroundColor={'var(--green)'}  /> </div> : <DataTable  rows = {transactions} columns = {columns} />;
}