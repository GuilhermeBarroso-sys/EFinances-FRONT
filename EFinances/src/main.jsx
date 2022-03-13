import React from 'react';
import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";
import 'sweetalert2/src/sweetalert2.scss';
import ReactDOM from 'react-dom';
import "./global/style.module.scss";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import brLocale from 'date-fns/locale/pt-BR';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { AuthProvider } from './contexts/authentication';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
const localeMap = {
	ptBr: brLocale
};
ReactDOM.render(
	<React.StrictMode>
		<LocalizationProvider dateAdapter={AdapterDateFns} locale={localeMap['ptBr']}>
			<AuthProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Dashboard/>} />
						<Route path="/register" element={<Register/>} />

				
					</Routes>
				</BrowserRouter>
			</AuthProvider>
		</LocalizationProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
