import { useGetNotebookData } from "@/hooks/useGetNotebookData";
import { SectionItem } from "../../Components/SectionItem/SectionItem";
import { DataState } from "@/enums/DataState";
import { LoadingSpinner } from "@/Components/LoadingSpinner/LoadingSpinner";
import styles from './NotebookView.module.css';
import { useEffect, useRef, useState } from "react";
import { getAllHeaders } from "@/helpers/getAllHeaders";


export const NotebookView: React.FC = () => {
    const { data, state } = useGetNotebookData();
    const isLoading = state === DataState.Pending;
    const titleRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        titleRef.current?.scrollIntoView()
    }, [state])


    const [activeHeaders, setActiveHeaders] = useState<string[]>([]);
    const headersRef = useRef<Record<string, HTMLDivElement | null>>({});

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const id = entry.target.getAttribute('data-id');
                    if (!id) return;

                    if (entry.boundingClientRect.top <= activeHeaders.length * 10) {
                        const idPath = entry.target.getAttribute('data-id-path')?.split('.') || [];
                        console.log(entry);
                        setActiveHeaders([...idPath, id]);
                    } else if (entry.boundingClientRect.top > activeHeaders.length * 43) {
                        // const idPath = entry.target.getAttribute('data-id-path')?.split('.') || [];
                        // console.log(entry);
                        // setActiveHeaders((prev) => prev.filter((h) => h === id));
                    }
                });
            },
            {
                threshold: [1],
                // rootMargin: '0px 0px -90% 0px',
            }
        );

        const headers = getAllHeaders(data?.data || [])
        console.log('Headers:', headers);
        headers.forEach((section) => {
            if (!section.id) return;
            const el = headersRef.current[section.id];
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [data]);


    return (
        <div className={styles.container}>
            {isLoading ? <div className={styles.spinnerContainer}><LoadingSpinner /></div> :
                <>
                    <div style={{ position: 'fixed', top: 0, zIndex: 999, width: '100%', }}>
                        {activeHeaders.map((id, i) => (
                            <div
                                key={id}
                                style={{
                                    height: 40,
                                    background: 'white',
                                    borderBottom: '1px solid #ccc',
                                    padding: '0 12px',
                                    lineHeight: '40px',
                                    position: 'sticky',
                                    top: `${i * 40}px`,
                                    width: '100%',
                                }}
                                id={id}
                            >
                                {getAllHeaders(data?.data || []).find((s) => s.id === id)?.title}
                            </div>
                        ))}
                    </div>
                    <h1 style={{ textAlign: 'center' }} ref={titleRef}>{data?.title}</h1>
                    {data?.data?.map((item) => item.data && (
                        <SectionItem
                            headersRef={headersRef}
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            data={item.data}
                            idPath={item.idPath || []}
                        />
                    ))}
                </>}
        </div>
    );
}

