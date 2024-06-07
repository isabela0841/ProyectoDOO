import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useForm } from '../hook/userForm';
import { findAll } from '../services/UserService';
import { useAlert } from '../components/alert/AlertContext';

export const LoginPage = () => {
	const navigate = useNavigate();

	const { addAlert } = useAlert();

	const [showPassword, setShowPassword] = React.useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const { email, password, onInputChange, onResetForm } =
		useForm({
			email: '',
			password: '',
		});

	const onLogin = async e => {
		e.preventDefault();

		const response = await findAll();

		response.data._embedded.users.map(user => {
			console.log(user);
			if (user.email == email && user.password == password) {
				addAlert('success', 'Se ha logueado con exito, bienvenido ' + user.username);
				navigate('/dashboard', {
					replace: true,
					state: {
						logged: true,
						email,
					},
				});

			} else {
				addAlert('error', 'Usuario y/o contraseña incorrectos!');
			}
			onResetForm();
		})
	};

	return (
		<Card sx={{ minWidth: 275, display: 'flex', justifyContent: 'center' }}>
			<form onSubmit={onLogin}>
				<CardContent>

					<h1>Iniciar Sesión</h1>

					<Box sx={{ display: 'flex', alignItems: 'flex-end', margin: '0px; 20px', marginBottom: '20px' }}>
						<FilledInput
							placeholder="Email"
							variant="filled"
							type='email'
							name='email'
							id='email'
							value={email}
							onChange={onInputChange}
							required
							autoComplete='off' 
							endAdornment={
								<AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
							}/>
					</Box>
					<Box sx={{ display: 'flex', alignItems: 'flex-end', margin: '0px; 20px', marginBottom: '20px' }}>
						<FilledInput
							id="outlined-adornment-password"
							type={showPassword ? 'text' : 'password'}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
										edge="end"
									>
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							}
							placeholder="Password"
							name='password'
							value={password}
							onChange={onInputChange}
							required
							autoComplete='off'
						/>
					</Box>
					<Button variant="contained" size="small" type='submit'>Iniciar Sesión</Button>
				</CardContent>
					
			</form>
		</Card>
	);
};
