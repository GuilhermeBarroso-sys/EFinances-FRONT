import { DataGrid } from '@mui/x-data-grid';
import styles from './styles.module.scss';
import noData from '../../assets/noData.svg';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Button } from '@mui/material';
import { useState } from 'react';
export default function DataTable({rows, columns, handleDelete = null, handleUpdate, sort}) {
	const [selectedArray, setSelectedArray] = useState([]);

	return (
    
		rows.length > 0 
			? (	
				<div style={{ width: '100%', height: '600px'} }>
					<div className={styles.actions}>
						{(selectedArray.length > 0 && handleDelete) && (
							<>
            
								{/* <Button variant = "contained" color = "info">  <EditIcon /> </Button> */}
								<Button variant = "contained" color = "error" onClick = {() => {
									handleDelete(selectedArray, setSelectedArray);
								}}> <DeleteForeverIcon /> </Button>
							</>

						)}
					</div>
					<DataGrid
						onSelectionModelChange={(selected) => {
							setSelectedArray(selected);
						}}
						initialState={{
							sorting: {
								sortModel: sort,
							},
						}}
						rowsPerPageOptions = {[5]}
						rows={rows}
						columns={columns}
						autoHeight={true}
						checkboxSelection={true}
						pageSize={5}
					/>
				</div>)
			: (
        
				<div className = {styles.noDataContainer}>
					<br/>
					<h1> No data!</h1>
					<br/>
					<br/>
					<img src = {noData} />
				</div>
			)
	
	);
}