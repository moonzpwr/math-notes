import type { IStructureItem } from '@/interfaces/IStructureItem';

export const recursiveSearchInStructure = (data: IStructureItem[], id: string): string => {
	return data.reduce((acc, item) => {
		if (item.id === id) {
			return item.title;
		} else if (item.children) {
			const childResult = recursiveSearchInStructure(item.children, id);
			if (childResult) {
				return childResult;
			}
		}
		return acc;
	}, '');
};
