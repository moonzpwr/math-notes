import type { FC } from 'react';
import styles from './Header.module.css';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Paths } from '@/enums/Paths';
import { authStore } from '@/Store/Auth.store';
import { observer } from 'mobx-react-lite';
import { notificationsStore } from '@/Store/Notifications.store';

export const Header: FC = observer(() => {
	const currentUser = useAuth();
	const navigate = useNavigate();
	const { logout } = authStore;
	const { showNotification } = notificationsStore;

	return (
		<div className={styles.root}>
			<h1 className={styles.logo} onClick={() => navigate(Paths.Home)}>
				Maths Notes
			</h1>
			<div className={styles.btnContainer}>
				{!currentUser ? (
					<>
						<Button onClick={() => navigate(Paths.Login)}>LOGIN</Button>
						<Button onClick={() => navigate(Paths.Registration)}>REGISTRATION</Button>
					</>
				) : (
					<>
						<Button onClick={logout}>LOGOUT</Button>
						<Button onClick={() => navigate('editor')}>EDITOR</Button>
						<Button onClick={() => showNotification('Hello')}>Say Hi!</Button>
					</>
				)}
			</div>
		</div>
	);
});
