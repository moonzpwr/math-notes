import { Permissions } from '@/enums/Permissions';

export interface IProjectsDataItem {
	permissionType: Permissions;
	description: string;
	id: string;
	name: string;
}

export interface IProjectsDataItemRaw {
	permission_type: Permissions;
	project_description: string;
	project_id: string;
	project_name: string;
}
