import { fetchCurrentUser, postLogin, postRegistration } from '@/api/auth';
import { LOCAL_STORAGE_AUTH_TOKEN_KEY } from '@/helpers/constants';
import type { ICredentials } from '@/interfaces/ICredentials';
import { makeAutoObservable } from 'mobx';
import { notificationsStore } from '@/Store/Notifications.store';
import { DataState } from '@/enums/DataState';
import { formatUserData } from '@/helpers/dataFormatting';

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
			showNotification('Registration successful! Please login!');
		} catch (error: unknown) {
			this.setRegistrationState(DataState.Rejected);
			if (error instanceof Error) {
				showNotification(`There was a problem with the registration: ${error.message}`);
			} else {
				showNotification(`An unknown error occurred: ${error}`);
			}
		}
	}

	async login({ username, password }: ICredentials): Promise<void> {
		this.setUserState(DataState.Pending);

		try {
			const respRaw = await postLogin({ username, password });
			const resp = formatUserData(respRaw);
			this.setUsername(resp.username);
			this.setUserState(DataState.Fulfilled);
			localStorage.setItem(LOCAL_STORAGE_AUTH_TOKEN_KEY, resp.token);
			showNotification(`Login successful! Welcome, ${resp.username}!`);
		} catch (error: unknown) {
			//TODO ADD error code handling like 401 ect.
			this.setUserState(DataState.Rejected);
			if (error instanceof Error) {
				showNotification(`There was a problem with the login: ${error.message}`);
			} else {
				showNotification(`An unknown error occurred: ${error}`);
			}
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
		} catch {
			this.setUserState(DataState.Rejected);
		}
	};
}

export const authStore = new AuthStore();
