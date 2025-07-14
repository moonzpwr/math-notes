import { makeAutoObservable } from 'mobx';
import { notificationsStore } from '@/Store/Notifications.store';
import { formatStructureData } from '@/helpers/dataFormatting';
import type { IStructureItem } from '@/interfaces/IStructureItem';
import { getStructure } from '@/api/notes';

const { showNotification } = notificationsStore;

class StructureStore {
	structure: IStructureItem[] = [];
	//TODO: add loading state to the hook ?????
	constructor() {
		makeAutoObservable(this, {}, { autoBind: true });
	}

	// setDataState(newState: DataState) {
	// 	this.structure = { ...this.structure, state: newState };
	// }

	setStructureData(newData: IStructureItem[]) {
		this.structure = newData;
	}

	async getStructureAsync(id: string): Promise<void> {
		try {
			const data = await getStructure(id);
			this.setStructureData(formatStructureData(data.structure));
		} catch (error: unknown) {
			this.setStructureData([]);
			if (error instanceof Error) {
				showNotification(`There was a problem with the structure fetching: ${error.message}`);
			} else {
				showNotification(`An unknown error occurred: ${error}`);
			}
		}
	}
}

export const structureStore = new StructureStore();
