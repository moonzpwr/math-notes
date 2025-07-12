import { getNotebookData } from '@/api/notes';
import { DataState } from '@/enums/DataState';
import type { IAsyncData } from '@/interfaces/IAsyncData';
import type { INotebookData } from '@/interfaces/INotebookData';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useGetNotebookData = (): IAsyncData<INotebookData> => {
	const { pathname } = useLocation();
	const [notebookData, setNotebookData] = useState<IAsyncData<INotebookData>>({
		data: null,
		state: DataState.Idle,
		error: null,
	});

	useEffect(() => {
		const projectId = pathname.split('/')[2];
		const notebookId = pathname.split('/')[3];
		if (projectId && notebookId) {
			setNotebookData({ data: null, state: DataState.Pending, error: null });
			getNotebookData(projectId, notebookId)
				.then((data) => {
					setNotebookData({ data: data, state: DataState.Fulfilled, error: null });
				})
				.catch((error) => {
					setNotebookData({ data: null, state: DataState.Rejected, error: error });
				});
		}
	}, [pathname]);

	return notebookData;
};
