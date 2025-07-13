import { makeAutoObservable } from 'mobx';
import { notificationsStore } from '@/Store/Notifications.store';
import { DataState } from '@/enums/DataState';
import { formatProjectsData } from '@/helpers/dataFormatting';
import type { IAsyncData } from '@/interfaces/IAsyncData';
import type { IProjectsDataItem } from '@/interfaces/IProjectsDataItem';
import { getProjects } from '@/api/projects';

const { showNotification } = notificationsStore;

class ProjectsStore {
	projects: IAsyncData<IProjectsDataItem[]> = {
		data: [],
		state: DataState.Idle,
		error: null,
	};

	constructor() {
		makeAutoObservable(this, {}, { autoBind: true });
	}

	setDataState(newState: DataState) {
		this.projects = { ...this.projects, state: newState };
	}

	setProjectsData(newData: IAsyncData<IProjectsDataItem[]>) {
		this.projects = newData;
	}

	async getProjectsAsync(): Promise<void> {
		this.setDataState(DataState.Pending);

		try {
			const data = await getProjects();
			const mockData = [
				...data.projects,
				{
					permission_type: 'read-only',
					project_description: '',
					project_id: 'test2',
					project_name: 'Test2',
				},
				{
					permission_type: 'read-only',
					project_description: '',
					project_id: 'test3',
					project_name: 'Test3',
				},
				{
					permission_type: 'read-only',
					project_description: '',
					project_id: 'test4',
					project_name: 'Test4',
				},
				{
					permission_type: 'read-only',
					project_description: '',
					project_id: 'test5',
					project_name: 'Test5',
				},
				{
					permission_type: 'read-only',
					project_description: '',
					project_id: 'test6',
					project_name: 'Test6',
				},
				{
					permission_type: 'read-only',
					project_description: '',
					project_id: 'test7',
					project_name: 'Test7',
				},
				{
					permission_type: 'read-only',
					project_description: '',
					project_id: 'test8',
					project_name: 'Test8',
				},
			];
			this.setProjectsData({
				data: formatProjectsData(mockData),
				state: DataState.Fulfilled,
				error: null,
			});
			this.setDataState(DataState.Fulfilled);
		} catch (error: unknown) {
			this.setProjectsData({
				data: null,
				state: DataState.Rejected,
				error: error as Error,
			});
			if (error instanceof Error) {
				showNotification(`There was a problem with the project fetching: ${error.message}`);
			} else {
				showNotification(`An unknown error occurred: ${error}`);
			}
		}
	}
}

export const projectsStore = new ProjectsStore();
