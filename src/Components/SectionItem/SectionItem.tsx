import { StructureTypes } from "@/enums/StructureTypes";
import type { INotebookData } from "@/interfaces/INotebookData";
import { RichParagraph } from "../RichParagraph/RichParagraph";
import styles from './SectionItem.module.css'

interface Props {
    title?: string;
    data: INotebookData[];
    id: string;
    headersRef: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
    idPath: string[];
}


export const SectionItem: React.FC<Props> = ({ title, data, id, headersRef, idPath }) => {
    return (
        <div className={styles.container}>
            <div
                className={styles.title}
                ref={(el) => {
                    headersRef.current[id] = el;
                }}
                data-id={id}
                data-id-path={idPath.length > 0 ? idPath.join('.') : null}
            >
                {title}
            </div>
            <div>{data?.map((item, i) => {
                if (item.type === StructureTypes.RichParagraph) {
                    return <RichParagraph key={i} content={item.value} />
                } else {
                    return item.data && (
                        <SectionItem
                            key={item.id}
                            id={item.id}
                            headersRef={headersRef}
                            title={item.title}
                            data={item.data}
                            idPath={item.idPath || []}
                        />)
                }

            })}
            </div>
        </div >
    );
}