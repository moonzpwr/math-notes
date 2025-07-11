import type { IStructureItem } from "@/interfaces/IStructureItem";
import type { IProjectsDataItem, IProjectsDataItemRaw } from "@/interfaces/IProjectsDataItem";



export const formatStructureData = (data: IStructureItem[]): IStructureItem[] => {
    return data.map((item) => ({
        ...item,
        expanded: false,
        children: item.children ? formatStructureData(item.children) : []
    }));
}

export const formatProjectsData = (data: IProjectsDataItemRaw[]): IProjectsDataItem[] => {
    return data.map((project) => ({
        permissionType: project.permission_type,
        description: project.project_description === '' ? 'Generic description' : project.project_description,
        id: project.project_id,
        name: project.project_name,
    }))
}