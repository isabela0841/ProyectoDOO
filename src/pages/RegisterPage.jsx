import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../hook/userForm';
import { create, findAll, update } from '../services/UserService';
import { useAlert } from '../components/alert/AlertContext';
import EmailIcon from '@mui/icons-material/Email';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

export const RegisterPage = () => {
	const navigate = useNavigate();

	const [users, setUsers] = useState([]);

	const { addAlert } = useAlert();

	const [showPassword, setShowPassword] = React.useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const { username, email, password, onInputChange, onResetForm } =
		useForm({
			username: '',
			email: '',
			password: '',
		});

	const getUsers = async () => {
		const result = await findAll();
		setUsers(result.data._embedded.users);
	}

	useEffect(() => {
        getUsers();
    }, []);

	const onRegister = async (e) => {
		e.preventDefault();
		
		let id = users.length + 1;
		console.log(id, username, email, password);
		var isRegister = false;
		for (const user of users){
			if (email == user.email){
				addAlert('error', 'El usuario ya existe!');
				isRegister = false;
			} else {
				isRegister = true;
			}
		}
		if (isRegister){
			const response = await create({id, username, email, password});
				console.log(response.status);
				if (response.status === 201) {
					addAlert('success', 'Registro completado con éxito!');
					navigate('/login', {
						replace: true
					});
				} else {
					addAlert('error', 'Error al intentar registrar un usuario');
				}		
		}
		
		onResetForm();
	};

	return (
		<Card sx={{ minWidth: 275, display: 'flex', justifyContent: 'center' }}>
			<form onSubmit={onRegister}>
				<CardContent>

					<h1>Registro</h1>

					<Box sx={{ display: 'flex', alignItems: 'flex-end', margin: '0px; 20px', marginBottom: '20px' }}>
						<FilledInput
							placeholder="Nombre de usuario"
							variant="filled"
							type='username'
							name='username'
							id='username'
							value={username}
							onChange={onInputChange}
							required
							autoComplete='off' 
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="email"
										edge="end"
										disabled
									>
										<AssignmentIndIcon/>
									</IconButton>
								</InputAdornment>
							}/>
					</Box>
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
								<InputAdornment position="end">
									<IconButton
										aria-label="email"
										edge="end"
										disabled
									>
										<EmailIcon/>
									</IconButton>
								</InputAdornment>
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
					<Button variant="contained" size="small" type='submit'>Registrarse</Button>
				</CardContent>
					
			</form>
		</Card>
	);
};
