import { DataState } from "@/enums/DataState";
import type { IAsyncData } from "@/interfaces/IAsyncData";
import type { INotebookData } from "@/interfaces/INotebookData";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const BASE_URL = import.meta.env.MATH_NOTES_BASE_URL;

export const useGetNotebookData = (): IAsyncData<INotebookData> => {
    const { pathname } = useLocation()
    const [notebookData, setNotebookData] = useState<IAsyncData<INotebookData>>({ data: null, state: DataState.Idle, error: null });

    useEffect(() => {
        const id = pathname.split('/').pop();
        if (id) {
            setNotebookData({ data: null, state: DataState.Pending, error: null });
            fetch(`${BASE_URL}/index/${id}`).then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            }).then((data) => {
                setNotebookData({ data: data, state: DataState.Fulfilled, error: null });
            }).catch((error) => {
                setNotebookData({ data: null, state: DataState.Rejected, error: error })
            })
        }

    }, [pathname]);

    return notebookData;
}
