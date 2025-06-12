import { formatStructureData } from "@/helpers/formatStructureData";
import type { IStructureItem } from "@/interfaces/IStructureItem";
import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.MATH_NOTES_BASE_URL;

export const useGetStructure = () => {
    const [structure, setStructure] = useState<IStructureItem[]>([]);

    useEffect(() => {
        fetch(`${BASE_URL}/structure`).then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then((data) => {
            setStructure(formatStructureData(data));
        }).catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
        })

    }, []);

    return { structure, setStructure };
}