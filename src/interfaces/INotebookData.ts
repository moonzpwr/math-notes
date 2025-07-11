export interface INotebookData {
	id: string;
	title?: string;
	type: string;
	data?: INotebookData[];
	value?: string;
}
