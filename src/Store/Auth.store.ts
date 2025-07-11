import { fetchCurrentUser, postLogin, postRegistration } from '@/api/auth';
import { LOCAL_STORAGE_AUTH_TOKEN_KEY } from '@/helpers/constants';
import type { ICredentials } from '@/interfaces/ICredentials';
import { action, makeAutoObservable } from 'mobx';
import { notificationsStore } from '@/Store/Notifications.store';
import { DataState } from '@/enums/DataState';

const { showNotification } = notificationsStore;

class AuthStore {
	username: string | null = null;
	userState: DataState = DataState.Idle;
	registrationState: DataState = DataState.Idle;

	constructor() {
		makeAutoObservable(this, {}, { autoBind: true });
	}

	setUsername(username: string | null) {
		this.username = username;
	}

	setUserState(userState: DataState) {
		this.userState = userState;
	}

	setRegistrationState(registrationState: DataState) {
		this.registrationState = registrationState;
	}

	async registration({ username, password }: ICredentials): Promise<void> {
		this.setRegistrationState(DataState.Pending);

		try {
			await postRegistration({ username, password });
			this.setRegistrationState(DataState.Fulfilled);
			showNotification(`Registration successful! Please login!`);
		} catch (error: any) {
			this.setRegistrationState(DataState.Rejected);

			showNotification(`There was a problem with the registration: ${error.message}`);
		}
	}

	async login({ username, password }: ICredentials): Promise<void> {
		this.setUserState(DataState.Pending);

		try {
			const resp = await postLogin({ username, password });
			this.setUsername(resp.username);
			this.setUserState(DataState.Fulfilled);
			localStorage.setItem(LOCAL_STORAGE_AUTH_TOKEN_KEY, resp.token);
			showNotification(`Login successful! Welcome, ${resp.username}!`);
		} catch (error: any) {
			this.setUserState(DataState.Rejected);
			showNotification(`There was a problem with the login: ${error.message}`);
		}
	}

	logout(): void {
		this.setUsername(null);
		this.setUserState(DataState.Idle);
		localStorage.removeItem(LOCAL_STORAGE_AUTH_TOKEN_KEY);
	}

	getCurrentUser = async (): Promise<void> => {
		this.setUserState(DataState.Pending);
		try {
			const resp = await fetchCurrentUser();
			this.setUsername(resp.username);
			this.setUserState(DataState.Fulfilled);
		} catch (error) {
			this.setUserState(DataState.Rejected);
		}
	};
}

export const authStore = new AuthStore();
