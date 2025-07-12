import { getStructure } from '@/api/notes';
import { formatStructureData } from '@/helpers/dataFormatting';
import type { IStructureItem } from '@/interfaces/IStructureItem';
import { notificationsStore } from '@/Store/Notifications.store';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useGetStructure = () => {
	const [structure, setStructure] = useState<IStructureItem[]>([]);
	const { showNotification } = notificationsStore;
	const { pathname } = useLocation();
	//TODO: add loading state to the hook ?????
	useEffect(() => {
		const id = pathname.split('/')[2];
		getStructure(id)
			.then((data) => {
				setStructure(formatStructureData(data.structure));
			})
			.catch((error) => {
				showNotification(`There was a problem with the fetch operation: ${error}`);
			});
	}, []);

	return { structure, setStructure };
};
