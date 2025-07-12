import { useGetStructure } from '@/hooks/useGetStructure';
import type { IStructureItem } from '@/interfaces/IStructureItem';
import { StructureItem } from '../StructureItem/StructureItem';
import styles from './Structure.module.css';

const Structure: React.FC = () => {
	const { structure, setStructure } = useGetStructure();

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
		setStructure(updateStructure(structure));
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
};

export default Structure;
