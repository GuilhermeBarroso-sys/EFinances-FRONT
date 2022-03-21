import React from 'react';
import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";
import 'sweetalert2/src/sweetalert2.scss';
import ReactDOM from 'react-dom';
import "./global/styles.module.scss";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import brLocale from 'date-fns/locale/pt-BR';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { AuthProvider } from './contexts/authentication';
import { LinearProgressProvider } from './contexts/linearProgress';

import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import 'react-notifications-component/dist/theme.css';
import { ReactNotifications } from 'react-notifications-component';

const localeMap = {
	ptBr: brLocale
};
ReactDOM.render(
	<React.StrictMode>
		<LocalizationProvider dateAdapter={AdapterDateFns} locale={localeMap['ptBr']}>
			<AuthProvider>
				<LinearProgressProvider>
					<ReactNotifications />
					<BrowserRouter>
						<Routes>
							<Route path="/dashboard" index element={<Dashboard/>} />
							<Route path="/register" element={<Register/>} />

				
						</Routes>
					</BrowserRouter>
				</LinearProgressProvider>
			
			</AuthProvider>
		</LocalizationProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
