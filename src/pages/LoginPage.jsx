import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { useForm } from '../hook/userForm';
import { findAll } from '../services/UserService';
import { useAlert } from '../components/alert/AlertContext';

export const LoginPage = () => {
	const navigate = useNavigate();

	const { addAlert } = useAlert();

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
		<Card sx={{ minWidth: 275 }}>
			<form onSubmit={onLogin}>
				<CardContent>

					<h1>Iniciar Sesión</h1>

					<div className='input-group'>
						<input
							type='email'
							name='email'
							id='email'
							value={email}
							onChange={onInputChange}
							required
							autoComplete='off' />
						<label htmlFor='email'>Email:</label>
					</div>
					<div className='input-group'>
						<input
							type='password'
							name='password'
							id='password'
							value={password}
							onChange={onInputChange}
							required
							autoComplete='off' />
						<label htmlFor='password'>Contraseña:</label>
					</div>
				</CardContent>
				<CardActions>
					<Button variant="contained" size="small" type='submit'>Iniciar Sesión</Button>

				</CardActions>
			</form>
		</Card>
	);
};
