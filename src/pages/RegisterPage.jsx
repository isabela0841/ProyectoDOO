import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../hook/userForm';
import { create, findAll, update } from '../services/UserService';
import { useAlert } from '../components/alert/AlertContext';
import { bool } from 'prop-types';

export const RegisterPage = () => {
	const navigate = useNavigate();

	const [users, setUsers] = useState([]);

	const { addAlert } = useAlert();

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
		<div className='wrapper'>
			<form onSubmit={onRegister}>
				<h1>Registrarse</h1>

				<div className='input-group'>
					<input
						type='text'
						name='username'
						id='username'
						value={username}
						onChange={onInputChange}
						required
						autoComplete='off'
					/>
					<label htmlFor='name'>Nombre:</label>
				</div>

				<div className='input-group'>
					<input
						type='email'
						name='email'
						id='email'
						value={email}
						onChange={onInputChange}
						required
						autoComplete='off'
					/>
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
						autoComplete='off'
					/>
					<label htmlFor='password'>Contraseña:</label>
				</div>

				<button>Registrarse</button>
			</form>
		</div>
	);
};
