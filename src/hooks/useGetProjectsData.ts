import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { getProjects } from '@/api/projects';
import { formatProjectsData } from '@/helpers/dataFormatting';
import { type IProjectsDataItem } from '@/interfaces/IProjectsDataItem';
import type { IAsyncData } from '@/interfaces/IAsyncData';
import { DataState } from '@/enums/DataState';

export const useGetProjectsData = () => {
	const [projects, setProjects] = useState<IAsyncData<IProjectsDataItem[]>>({
		data: [],
		state: DataState.Idle,
		error: null,
	});
	const currentUser = useAuth();

	useEffect(() => {
		setProjects({ data: [], state: DataState.Pending, error: null });
		try {
			getProjects().then((data) => {
				const mockData = [
					...data.projects,
					// {
					// 	permission_type: 'read-only',
					// 	project_description: '',
					// 	project_id: 'test2',
					// 	project_name: 'Test2',
					// },
					// {
					// 	permission_type: 'read-only',
					// 	project_description: '',
					// 	project_id: 'test3',
					// 	project_name: 'Test3',
					// },
					// {
					// 	permission_type: 'read-only',
					// 	project_description: '',
					// 	project_id: 'test4',
					// 	project_name: 'Test4',
					// },
					// {
					// 	permission_type: 'read-only',
					// 	project_description: '',
					// 	project_id: 'test5',
					// 	project_name: 'Test5',
					// },
					// {
					// 	permission_type: 'read-only',
					// 	project_description: '',
					// 	project_id: 'test6',
					// 	project_name: 'Test6',
					// },
					// {
					// 	permission_type: 'read-only',
					// 	project_description: '',
					// 	project_id: 'test7',
					// 	project_name: 'Test7',
					// },
					// {
					// 	permission_type: 'read-only',
					// 	project_description: '',
					// 	project_id: 'test8',
					// 	project_name: 'Test8',
					// },
				];
				setProjects({
					data: formatProjectsData(mockData),
					state: DataState.Fulfilled,
					error: null,
				});
			});
		} catch (error) {
			setProjects({
				data: null,
				state: DataState.Rejected,
				error: error as Error,
			});
		}
	}, [currentUser]);

	return projects;
};
