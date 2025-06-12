import type { INotebookData } from "@/interfaces/INotebookData";

type AllHeaders = {
    id: string, title: string | undefined
}

export const getAllHeaders = (data: INotebookData[]): AllHeaders[] => {
    return data.reduce((acc, section) => {
        if (!section.hasOwnProperty('id')) return acc;
        acc.push({ id: section.id, title: section.title });
        if (section.data) {
            acc.push(...getAllHeaders(section.data));
        }
        return acc;
    }, [] as AllHeaders[]);
}