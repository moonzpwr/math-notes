import { Paths } from '@/enums/Paths';
import { useAuth } from '@/hooks/useAuth';
import { authStore } from '@/Store/Auth.store';
import { Box, Button, Paper, TextField } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginView.module.css';
import { DataState } from '@/enums/DataState';
import { useFormik } from 'formik';
import { authValidationSchema } from '@/helpers/validation';

export const LoginView: React.FC = observer(() => {
	const navigate = useNavigate();
	const currentUser = useAuth();
	const { login, userState } = authStore;
	const isLoading = userState === DataState.Pending;
	const { touched, values, handleChange, handleBlur, errors, handleSubmit } = useFormik({
		initialValues: { username: '', password: '' },
		validationSchema: authValidationSchema,
		onSubmit: (values) => {
			login(values);
		},
	});

	useEffect(() => {
		if (currentUser) {
			navigate(Paths.Home);
		}
	}, [currentUser]);

	return (
		<Box component='form' onSubmit={handleSubmit} className={styles.container}>
			<Paper elevation={3} className={styles.paper}>
				<h1>Please login!</h1>
				<TextField
					id='username'
					variant='outlined'
					label='Username'
					name='username'
					value={values.username}
					onChange={handleChange}
					onBlur={handleBlur}
					error={touched.username && Boolean(errors.username)}
					helperText={touched.username && errors.username}
					fullWidth
				/>
				<TextField
					id='password'
					label='Password'
					variant='outlined'
					type='password'
					name='password'
					value={values.password}
					onChange={handleChange}
					onBlur={handleBlur}
					error={touched.password && Boolean(errors.password)}
					helperText={touched.password && errors.password}
					fullWidth
				/>
				<Button
					variant='contained'
					type='submit'
					loading={isLoading}
					disabled={Boolean(values.password === '' || values.username === '' || errors.password || errors.username)}
				>
					Login
				</Button>
				Don't have an account?{' '}
				<Button variant='text' onClick={() => navigate(Paths.Registration)}>
					Register
				</Button>
			</Paper>
		</Box>
	);
});
