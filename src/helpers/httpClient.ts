import { LOCAL_STORAGE_AUTH_TOKEN_KEY } from './constants';

export const httpClient = async (input: RequestInfo, init: RequestInit = {}) => {
	const token = localStorage.getItem(LOCAL_STORAGE_AUTH_TOKEN_KEY);
	const authHeaders = {
		Authorization: `Bearer ${token}`,
		...(init.headers || {}),
	};

	const modifiedInit: RequestInit = {
		...init,
		headers: authHeaders,
	};

	return fetch(input, modifiedInit);
};
