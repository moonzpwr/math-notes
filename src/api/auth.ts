import { httpClient } from '@/helpers/httpClient';
import type { ICredentials } from '@/interfaces/ICredentials';

const BASE_URL = import.meta.env.MATH_NOTES_BASE_URL;

export const postRegistration = (payload: ICredentials) =>
	fetch(`${BASE_URL}/register`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			username: payload.username,
			password: payload.password,
		}),
	}).then(async (res) => {
		//TODO remove data because no json provided
		const data = await res.json();
		if (!res.ok) {
			throw new Error(data?.error || 'Registration failed');
		}
		return data;
	});

export const postLogin = (payload: ICredentials) =>
	fetch(`${BASE_URL}/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			username: payload.username,
			password: payload.password,
		}),
	}).then(async (res) => {
		//TODO remove data because no json provided
		const data = await res.json();
		if (!res.ok) {
			throw new Error(data?.error || 'Login failed');
		}
		return data;
	});

export const fetchCurrentUser = () =>
	httpClient(`${BASE_URL}/currentUser`, {
		method: 'GET',
	}).then(async (res) => {
		const data = await res.json();
		if (!res.ok) {
			throw new Error(data?.error || 'Login failed');
		}
		return data;
	});
