import { DataGrid } from '@mui/x-data-grid';
import styles from './styles.module.scss';
import noData from '../../assets/noData.svg';
export default function DataTable({rows, columns}) {
	return (
		rows.length > 0 
			? (	
				<div style={{ width: '100%'} }>
					<DataGrid
						rows={rows}
						columns={columns}
						autoHeight={true}
						pageSize={5}
						rowsPerPageOptions={[5]}
						checkboxSelection
					/>
				</div>)
			: (
        
				<div className = {styles.noDataContainer}>
					<br/>
					<h1> Sem Dados Por aqui!</h1>
					<br/>
					<br/>
					<img src = {noData} />
				</div>
			)
	
	);
}