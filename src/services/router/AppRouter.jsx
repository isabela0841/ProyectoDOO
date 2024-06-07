import { Route, Routes } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import {
	HomePage,
	LoginPage,
	RegisterPage,
} from '../../pages';
import { PrivateRoute } from './PrivateRoute';
import { ProductApp } from '../../pages/ProductApp';

export const AppRouter = () => {
	return (
		<>
			<Routes>
				<Route path='/' element={<Navbar />}>
					<Route index element={<HomePage />} />
					<Route path='login' element={<LoginPage />} />
					<Route path='register' element={<RegisterPage />} />
					<Route
						path='dashboard'
						element={
							<PrivateRoute>
								<ProductApp  title='Lista de productos!'/>
							</PrivateRoute>
						}
					/>
				</Route>
			</Routes>
		</>
	);
};