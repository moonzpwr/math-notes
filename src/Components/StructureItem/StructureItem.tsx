import React, { type SyntheticEvent } from 'react';
import { useNavigate } from "react-router";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IconButton } from '@mui/material';
import type { IStructureItem } from '@/interfaces/IStructureItem';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import BookIcon from '@mui/icons-material/Book';
import { StructureTypes } from '@/enums/StructureTypes';
import styles from './StructureItem.module.css';
import classNames from 'classnames';

interface Props {
    item: IStructureItem;
    onToggleExpand: (id: string) => void;
}

export const StructureItem: React.FC<Props> = ({
    item,
    onToggleExpand
}) => {
    const { expanded, children, id, title, type } = item;
    let navigate = useNavigate();

    const handleItemClick = (event: SyntheticEvent) => {
        event.stopPropagation();
        if (type === StructureTypes.Notebook) {
            navigate(id)
        } else {
            onToggleExpand(id)
        }
    }


    return (
        <div className={styles.itemContainer}>
            <div className={classNames(styles.rootItemContainer, { [styles.expanded]: children.length == 0 })}>
                {children.length > 0 && <IconButton onClick={() => onToggleExpand(id)}>
                    {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>}
                <div onClick={handleItemClick} className={styles.itemContent}>
                    {type === StructureTypes.Book ? <CollectionsBookmarkIcon /> : <BookIcon />}
                    <span>{title}</span>
                </div>
            </div>
            {expanded && children.length > 0 && (
                <div>
                    {children.map((child: any) => (
                        <StructureItem
                            key={child.id}
                            item={child}
                            onToggleExpand={onToggleExpand}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};