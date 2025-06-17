import { useGetNotebookData } from "@/hooks/useGetNotebookData";
import { SectionItem } from "../../Components/SectionItem/SectionItem";
import { DataState } from "@/enums/DataState";
import { LoadingSpinner } from "@/Components/LoadingSpinner/LoadingSpinner";
import styles from './NotebookView.module.css';
import { useEffect, useRef } from "react";


export const NotebookView: React.FC = () => {
    const { data, state } = useGetNotebookData();
    const isLoading = state === DataState.Pending;
    const titleRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        titleRef.current?.scrollIntoView()
    }, [state])




    return (
        <div className={styles.container}>
            {isLoading ? <div className={styles.spinnerContainer}><LoadingSpinner /></div> :
                <>
                    <h1 style={{ textAlign: 'center' }} ref={titleRef}>{data?.title}</h1>
                    {data?.data?.map((item) => item.data && (
                        <SectionItem
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            data={item.data}
                        />
                    ))}
                </>}
        </div>
    );
}

