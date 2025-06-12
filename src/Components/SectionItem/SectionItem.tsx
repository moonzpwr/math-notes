import { StructureTypes } from "@/enums/StructureTypes";
import type { INotebookData } from "@/interfaces/INotebookData";
import { RichParagraph } from "../RichParagraph/RichParagraph";
import styles from './SectionItem.module.css'

interface Props {
    title?: string;
    data: INotebookData[];
    id: string;
    headersRef: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
}


export const SectionItem: React.FC<Props> = ({ title, data, id, headersRef }) => {
    return (
        <div className={styles.container}>
            <div
                className={styles.title}
                ref={(el) => {
                    headersRef.current[id] = el;
                }}
                data-id={id}
            >
                {title}
            </div>
            <div>{data?.map((item, i) => {
                if (item.type === StructureTypes.RichParagraph) {
                    return <RichParagraph key={i} content={item.data[0]} />
                } else {
                    return (
                        <SectionItem
                            key={item.id}
                            id={item.id}
                            headersRef={headersRef}
                            title={item.title}
                            data={item.data}
                        />)
                }

            })}
            </div>
        </div >
    );
}