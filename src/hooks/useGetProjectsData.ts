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
			getProjects().then((data) =>
				setProjects({
					data: formatProjectsData(data.projects),
					state: DataState.Fulfilled,
					error: null,
				})
			);
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
