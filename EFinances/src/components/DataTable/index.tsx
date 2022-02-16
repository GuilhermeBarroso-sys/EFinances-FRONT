import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { id: 1, field: 'value', headerName: 'Valor', width: 250},
  { id: 1, field: 'category', headerName: 'Tipo da despesa', width: 450 },
  { id: 1, field: 'data', headerName: 'Data da transação', width: 350 },
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

const rows = [
  {id: 1,name: 'Notebook', value: '4000', category: 'Equipamento', data: '01/05/2022'},
  {id: 2,name: 'Notebook', value: '4000', category: 'Equipamento', data: '01/05/2022'},
  {id: 3,name: 'Notebook', value: '4000', category: 'Equipamento', data: '01/05/2022'},
  {id: 4,name: 'Notebook', value: '4000', category: 'Equipamento', data: '01/05/2022'},
  {id: 5,name: 'Notebook', value: '4000', category: 'Equipamento', data: '01/05/2022'},
  {id: 6,name: 'Notebook', value: '4000', category: 'Equipamento', data: '01/05/2022'},
];

export default function DataTable() {
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