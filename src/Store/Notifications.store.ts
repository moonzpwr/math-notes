import { NOTIFICATIONS_HIDE_DELAY_MS } from '@/helpers/constants';
import type { INotifications } from '@/interfaces/INotification';
import { makeAutoObservable, runInAction } from 'mobx';
import { nanoid } from 'nanoid';

class NotificationsStore {
	notifications: INotifications[] = [];

	constructor() {
		makeAutoObservable(this, {}, { autoBind: true });
	}

	showNotification(message: string) {
		const id = nanoid();
		const notification: INotifications = { id, message, isMarkedForDeletion: false };

		this.notifications.push(notification);

		setTimeout(() => {
			runInAction(() => {
				const item = this.notifications.find((n) => n.id === id);
				if (item) item.isMarkedForDeletion = true;
			});
		}, NOTIFICATIONS_HIDE_DELAY_MS);
	}

	removeNotification(id: string) {
		this.notifications = this.notifications.filter((n) => n.id !== id);
	}
}

export const notificationsStore = new NotificationsStore();
