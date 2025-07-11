import { Splitter } from '@/Components/Splitter/Splitter';
import Structure from '@/Components/Structure/Structure';
import { useResizable } from 'react-resizable-layout';
import { NotebookView } from '../NotebookView/NotebookView';
import styles from './ProjectView.module.css';
import classNames from 'classnames';

export const ProjectView: React.FC = () => {
	const { position, separatorProps, isDragging } = useResizable({
		axis: 'x',
		initial: 320,
		min: 320,
		max: 650,
	});

	return (
		<div className={styles.wrapper}>
			<div className={classNames(styles.leftBlock, { [styles.backdrop]: isDragging })} style={{ width: position }}>
				<Structure />
			</div>
			<Splitter {...separatorProps} isDragging={isDragging} />
			<div className={classNames(styles.rightBlock, { [styles.backdrop]: isDragging })}>
				<NotebookView />
			</div>
		</div>
	);
};
