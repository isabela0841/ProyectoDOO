import React from 'react';
import {
	Link,
	Outlet,
	useLocation,
	useNavigate,
} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export const Navbar = () => {
	const { state } = useLocation();
	const navigate = useNavigate();

	const onLogout = () => {
		navigate('/login', {
			replace: true,
		});
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						PCH
					</Typography>
					{state?.logged ? (
						<><span className='username'>{state?.name}</span>
						<Button component={Link} to='/login' color="inherit">cerrar sesion</Button></>
					) : (
						<><Button component={Link} to='/login' color="inherit">Login</Button><Button component={Link} to='/register' color="inherit">Registrarse</Button></>
					)}
				</Toolbar>
			</AppBar >
			<Outlet />
		</Box >
	);
}