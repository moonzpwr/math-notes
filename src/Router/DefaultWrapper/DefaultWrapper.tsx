import { Outlet } from 'react-router-dom';
import styles from './DefaultWrapper.module.css';
import { Notifications } from '@/Components/Notifications/Notifications';

export const DefaultWrapper: React.FC = () => {
	return (
		<>
			<Outlet />
			<div className={styles.notificationsHolder}>
				<Notifications />
			</div>
		</>
	);
};
