import type { Roles } from '@/enums/Roles';

export interface IUserData {
	token: string;
	role: Roles;
	username: string;
}
