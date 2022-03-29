import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';




export default function DataTable({rows, columns}) {
	return (
		<div style={{ width: '100%'} }>
			<DataGrid
				rows={rows}
				columns={columns}
				autoHeight={true}
				pageSize={5}
				rowsPerPageOptions={[5]}
				checkboxSelection
			/>
		</div>
	);
}