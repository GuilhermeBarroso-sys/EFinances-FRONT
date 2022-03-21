import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/authentication';
const settings = [
	{
		title:'Dashboard',
		anchor: '/dashboard',
	},
	{
		title:'Meu Perfil',
		anchor: '/user',
	}
];

export default function MenuAppBar() {

	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const {signOut} = useContext(AuthContext);
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};


	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<AppBar position="static" style = {{backgroundColor: '#33cc95'}}>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
					>
            G Finances
					</Typography>
					<Box sx={{ flexGrow: 1 }}></Box>
					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Open settings">
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar  />
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: '45px' }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							{settings.map(({title, anchor}, index) => (
								<MenuItem key={index} onClick={handleCloseUserMenu}>
									<Link style = {{textDecoration:'none', color: 'var(--text-title)', width:'100%'}} to = {anchor}> {title} </Link> 
								</MenuItem>
							))}
							<MenuItem  onClick={signOut}>
								<Link style = {{textDecoration:'none', color: 'var(--text-title)', width:'100%'}} to = '/login'> Sair </Link> 
							</MenuItem>
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}