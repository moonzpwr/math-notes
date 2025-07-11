export interface IStructureItem {
	type: string;
	title: string;
	id: string;
	expanded: boolean;
	children: IStructureItem[];
}
