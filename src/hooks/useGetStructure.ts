import { getStructure } from '@/api/notes';
import { formatStructureData } from '@/helpers/dataFormatting';
import type { IStructureItem } from '@/interfaces/IStructureItem';
import { notificationsStore } from '@/Store/Notifications.store';
import { useEffect, useState } from 'react';

export const useGetStructure = () => {
	const [structure, setStructure] = useState<IStructureItem[]>([]);
	const { showNotification } = notificationsStore;
	//TODO: add loading state to the hook ?????
	useEffect(() => {
		getStructure()
			.then((data) => {
				setStructure(formatStructureData(data));
			})
			.catch((error) => {
				showNotification(`There was a problem with the fetch operation: ${error}`);
			});
	}, []);

	return { structure, setStructure };
};
