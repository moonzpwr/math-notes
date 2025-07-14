import type { IStructureItem } from '@/interfaces/IStructureItem';
import { StructureItem } from '../StructureItem/StructureItem';
import styles from './Structure.module.css';
import { structureStore } from '@/Store/Structure.store';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Structure: React.FC = observer(() => {
	const { structure, setStructureData, getStructureAsync } = structureStore;
	const { pathname } = useLocation();

	useEffect(() => {
		const id = pathname.split('/')[2];
		getStructureAsync(id);
	}, []);

	const toggleExpand = (id: string) => {
		const updateStructure = (structure: IStructureItem[]): IStructureItem[] => {
			return structure.map((item) => {
				if (item.id === id) {
					return { ...item, expanded: !item.expanded };
				}
				if (item.children.length > 0) {
					item.children = updateStructure(item.children);
				}
				return item;
			});
		};
		setStructureData(updateStructure(structure));
	};

	return (
		<div className={styles.container}>
			<div>
				{structure.map((book) => (
					<StructureItem key={book.id} item={book} onToggleExpand={toggleExpand} />
				))}
			</div>
		</div>
	);
});

export default Structure;
