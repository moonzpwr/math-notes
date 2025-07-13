import { Paths } from '@/enums/Paths';
import { useAuth } from '@/hooks/useAuth';
import { authStore } from '@/Store/Auth.store';
import { Box, Button, Paper, TextField } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RegistrationView.module.css';
import { DataState } from '@/enums/DataState';
import { useFormik } from 'formik';
import { authValidationSchema } from '@/helpers/validation';

export const RegistrationView: React.FC = () => {
	const navigate = useNavigate();
	const currentUser = useAuth();
	const { registration, registrationState } = authStore;
	const isLoading = registrationState === DataState.Pending;

	const { touched, values, handleChange, handleBlur, errors, handleSubmit } = useFormik({
		initialValues: { username: '', password: '', confirmPassword: '' },
		validationSchema: authValidationSchema,
		onSubmit: ({ username, password }) => {
			try {
				registration({ username, password });
				navigate(Paths.Login);
			} catch {
				return;
			}
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
				<h1>Please enter registration data!</h1>
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
				<TextField
					id='confirmPassword'
					label='Confirm password'
					variant='outlined'
					type='password'
					name='confirmPassword'
					value={values.confirmPassword}
					onChange={handleChange}
					onBlur={handleBlur}
					error={touched.confirmPassword && Boolean(errors.confirmPassword)}
					helperText={touched.confirmPassword && errors.confirmPassword}
					fullWidth
				/>
				<Button
					variant='contained'
					type='submit'
					loading={isLoading}
					disabled={Boolean(
						values.password === '' ||
							values.username === '' ||
							values.confirmPassword === '' ||
							errors.password ||
							errors.username ||
							errors.confirmPassword
					)}
				>
					Registration
				</Button>
				Already have an account?{' '}
				<Button variant='text' onClick={() => navigate(Paths.Login)}>
					Login
				</Button>
			</Paper>
		</Box>
	);
};
