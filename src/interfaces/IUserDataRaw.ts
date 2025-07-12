import type { Roles } from '@/enums/Roles';

export interface IUserDataRaw {
	token: string;
	user_info: {
		role: Roles;
		username: string;
	};
}
