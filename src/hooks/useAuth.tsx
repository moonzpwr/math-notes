import { authStore } from '@/Store/Auth.store';
import { useEffect } from 'react';

export const useAuth = () => {
	const { username, getCurrentUser } = authStore;

	useEffect(() => {
		if (!username) {
			getCurrentUser();
		}
	}, [username]);

	return username;
};
