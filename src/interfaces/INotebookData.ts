export interface INotebookData {
	id: string;
	title?: string;
	type: string;
	items?: INotebookData[];
	htm?: string;
}
