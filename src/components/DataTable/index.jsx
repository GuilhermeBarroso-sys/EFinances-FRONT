import { DataGrid } from '@mui/x-data-grid';
import { useContext } from 'react';
import { LinearProgressContext } from '../../contexts/linearProgress';




export default function DataTable({rows, columns}) {
	return (
		rows.length > 1 
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
        
				<div>
          Sem dados por aqui
				</div>
			)
	
	);
}