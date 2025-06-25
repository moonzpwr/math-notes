import { getStructure } from "@/api/notes";
import { formatStructureData } from "@/helpers/formatStructureData";
import type { IStructureItem } from "@/interfaces/IStructureItem";
import { useEffect, useState } from "react";


export const useGetStructure = () => {
    const [structure, setStructure] = useState<IStructureItem[]>([]);
    //TODO: add error handling for the fetch operation
    //TODO: add loading state to the hook
    useEffect(() => {
        getStructure().then((data) => {
            setStructure(formatStructureData(data));
        }).catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
        })

    }, []);

    return { structure, setStructure };
}