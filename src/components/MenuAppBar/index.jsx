import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/authentication';
import MenuIcon from '@mui/icons-material/Menu';
import {AccountCircleTwoTone } from '@mui/icons-material';
import styles from './styles.module.scss';
const settings = [
	

];

const rolesMock = [
	{
		title:'Dashboard',
		anchor: '/dashboard',
	},
];

export default function MenuAppBar() {

	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const [anchorElNavBar, setAnchorElNavBar] = React.useState(null);
	const {signOut} = useContext(AuthContext);

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};
	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleOpenNavBarMenu= (event) => {
		setAnchorElNavBar(event.currentTarget);
	};
	const handleCloseNavBarMenu = () => {
		setAnchorElNavBar(null);
	};
	return (
		<AppBar  position={'fixed'} style = {{backgroundColor: '#33cc95'}}>
			<Container maxWidth={"lg"}>
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="open drawer"
						sx={{ mr: 2 }}
						onClick={handleOpenNavBarMenu}
            
					>
						<MenuIcon />
					</IconButton>
					<Menu
						sx={{ mt: '15px'}}
						id="menu-appbar"
						anchorEl={anchorElNavBar}
						anchorOrigin={{
							vertical: 'top',
							horizontal: 'center',
						}}
						keepMounted
						transformOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						open={Boolean(anchorElNavBar)}
						onClose={handleCloseNavBarMenu}
					>
						{rolesMock.map(({title, anchor}, index) => (
							<MenuItem key={index} onClick={handleCloseUserMenu}>
								<Link style = {{textDecoration:'none', color: 'var(--text-title)', width:'100%'}} to = {anchor}> {title} </Link> 
							</MenuItem>
						))}
					</Menu>
					<Box sx={{ flexGrow: 1 }}></Box>
					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Abrir Menu">
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0}}>
								<AccountCircleTwoTone  color="success" className = {styles.profileIcon} />
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: '15px' }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'center',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
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
								<Link style = {{textDecoration:'none', color: 'var(--text-title)', width:'100%'}} to = '/login'> Logout </Link> 
							</MenuItem>
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}