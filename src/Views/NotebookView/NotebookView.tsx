import { useGetNotebookData } from '@/hooks/useGetNotebookData';
import { SectionItem } from '../../Components/SectionItem/SectionItem';
import { DataState } from '@/enums/DataState';
import { LoadingSpinner } from '@/Components/LoadingSpinner/LoadingSpinner';
import styles from './NotebookView.module.css';
import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

export const NotebookView: React.FC = () => {
	const { data, state } = useGetNotebookData();
	const isLoading = state === DataState.Pending;
	const titleRef = useRef<HTMLDivElement | null>(null);
	const [searchparams, setSearchParams] = useSearchParams();
	const headersRef = useRef<Record<string, HTMLDivElement | null>>({});

	useEffect(() => {
		const scrollTo = searchparams.get('scroll');

		if (scrollTo) {
			const header = headersRef.current[scrollTo];
			if (!header) {
				return;
			}
			header?.scrollIntoView({ behavior: 'smooth' });
			setSearchParams({});
		} else {
			titleRef.current?.scrollIntoView();
		}
	}, [state]);

	return (
		<div className={styles.container}>
			{isLoading ? (
				<div className={styles.spinnerContainer}>
					<LoadingSpinner />
				</div>
			) : (
				<>
					<h1 style={{ textAlign: 'center' }} ref={titleRef}>
						{data?.title}
					</h1>
					{data?.data?.map(
						(item) =>
							item.data && (
								<SectionItem key={item.id} id={item.id} title={item.title} data={item.data} headersRef={headersRef} />
							)
					)}
				</>
			)}
		</div>
	);
};
