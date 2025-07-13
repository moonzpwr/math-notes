import { notificationsStore } from '@/Store/Notifications.store';
import { observer } from 'mobx-react-lite';
import styles from './Notifications.module.css';
import { NotificationItem } from '../NotificationItem/NotificationItem';

export const Notifications: React.FC = observer(() => {
	const { notifications, removeNotification } = notificationsStore;

	return (
		<div className={styles.root}>
			{notifications.map(({ message, id, isMarkedForDeletion }) => (
				<NotificationItem
					message={message}
					key={id}
					id={id}
					isMarkedForDeletion={isMarkedForDeletion}
					onFadeOutComplete={(id) => removeNotification(id)}
				/>
			))}
		</div>
	);
});
