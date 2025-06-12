import { useGetNotebookData } from "@/hooks/useGetNotebookData";
import { SectionItem } from "../../SectionItem/SectionItem";
import { DataState } from "@/enums/DataState";
import { LoadingSpinner } from "@/Components/LoadingSpinner/LoadingSpinner";
import styles from './NotebookView.module.css';
import { useEffect, useRef, useState } from "react";


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
                    console.log('entry', entry);

                    if (entry.boundingClientRect.top <= 0) {
                        console.log('add');
                        setActiveHeaders((prev) =>
                            prev.includes(id) ? prev : [...prev, id]
                        );
                    } else if (entry.boundingClientRect.top > 0) {
                        console.log('remove');
                        setActiveHeaders((prev) => prev.filter((hid) => hid !== id));
                    }
                });
            },
            {
                threshold: [0.1],
                // rootMargin: '0px 0px -90% 0px',
            }
        );

        data?.data.forEach((section) => {
            const el = headersRef.current[section.id];
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [data]);


    return (
        <div className={styles.container} style={{ paddingTop: `${activeHeaders.length * 43}px` }}>
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
                            >
                                {data?.data.find((s) => s.id === id)?.title}
                            </div>
                        ))}
                    </div>
                    <h1 style={{ textAlign: 'center' }} ref={titleRef}>{data?.title}</h1>
                    {data?.data.map((item) => (
                        <SectionItem
                            headersRef={headersRef}
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