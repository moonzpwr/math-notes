import type { IStructureItem } from "@/interfaces/IStructureItem";


export const formatStructureData = (data: IStructureItem[]): IStructureItem[] => {
    return data.map((item) => ({
        ...item,
        expanded: false,
        children: item.children ? formatStructureData(item.children) : []
    }));
}