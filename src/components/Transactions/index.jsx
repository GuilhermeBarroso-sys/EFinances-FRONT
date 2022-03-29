import { useContext, useEffect, useRef, useState } from "react";
import { api } from "../../services/api";
import {AuthContext}  from '../../contexts/authentication';
import DataTable from "../DataTable";
import { format, parseISO } from "date-fns";
import { convertStringToDate } from "../../functions/convertStringToDate";

export function Transactions() {
	const {user} = useContext(AuthContext);

	const [rows, setRows] = useState([]);

	useEffect(() => {
		if(user){
			api.get(`transactions/${user.Account[0].id}`).then(({data}) => {
				setRows(data.map(({id,name,value,category,datetime}) => {
		
					datetime = format(parseISO(datetime), 'dd/MM/yyyy HH:mm:ss');
					console.log(id);
					return {id, name, value, category, datetime};
				}));
			});
		}
		return;
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
		{ id: 1, field: 'value', headerName: 'Valor', width: 250},
		{ id: 2, field: 'name', headerName: 'Nome', width: 250},
		{ id: 3, field: 'category', headerName: 'Tipo da transação', width: 450 },
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
  

	return <DataTable rows = {rows} columns = {columns}/>;
}