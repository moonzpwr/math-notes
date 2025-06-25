import { getNotebookData } from "@/api/notes";
import { DataState } from "@/enums/DataState";
import type { IAsyncData } from "@/interfaces/IAsyncData";
import type { INotebookData } from "@/interfaces/INotebookData";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";



export const useGetNotebookData = (): IAsyncData<INotebookData> => {
    const { pathname } = useLocation()
    const [notebookData, setNotebookData] = useState<IAsyncData<INotebookData>>({ data: null, state: DataState.Idle, error: null });


    useEffect(() => {
        const id = pathname.split('/')[1];
        if (id) {
            setNotebookData({ data: null, state: DataState.Pending, error: null });
            getNotebookData(id).then((data) => {
                setNotebookData({ data: data, state: DataState.Fulfilled, error: null });
            }).catch((error) => {
                setNotebookData({ data: null, state: DataState.Rejected, error: error })
            })
        }

    }, [pathname]);

    return notebookData;
}
