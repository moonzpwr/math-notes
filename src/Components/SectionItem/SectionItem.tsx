import { StructureTypes } from "@/enums/StructureTypes";
import type { INotebookData } from "@/interfaces/INotebookData";
import { RichParagraph } from "../RichParagraph/RichParagraph";
import styles from './SectionItem.module.css'


interface Props {
    title?: string;
    data: INotebookData[];
    id: string;
}


export const SectionItem: React.FC<Props> = ({ title, data, id }) => {



    return (
        <div className={styles.container}>
            <div className={styles.title} data-id={id}>{title}</div>
            <div>{data?.map((item, i) => {
                if (item.type === StructureTypes.RichParagraph) {
                    return <RichParagraph key={i} content={item.value} />
                } else {
                    return item.data && (
                        <SectionItem
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            data={item.data}
                        />)
                }

            })}
            </div>
        </div >
    );
}