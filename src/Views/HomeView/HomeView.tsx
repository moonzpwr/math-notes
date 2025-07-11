import { LoadingSpinner } from '@/Components/LoadingSpinner/LoadingSpinner';
import { DataState } from '@/enums/DataState';
import { useGetProjectsData } from '@/hooks/useGetProjectsData';
import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { type FC } from 'react';
import styles from './HomeView.module.css';
import { ErrorView } from '../ErrorView/ErrorView';

export const HomeView: FC = observer(() => {
	const { data, state } = useGetProjectsData();
	const isLoading = state === DataState.Pending;
	const isFailed = state === DataState.Rejected;

	return (
		<Box className={styles.root}>
			{isLoading ? (
				<div className={styles.spinnerHolder}>
					<LoadingSpinner />
				</div>
			) : isFailed ? (
				<ErrorView />
			) : (
				data &&
				data.map((project) => (
					<Card key={project.id}>
						<CardActionArea
							onClick={() => {}}
							sx={{
								height: '100%',
								'&[data-active]': {
									backgroundColor: 'action.selected',
									'&:hover': {
										backgroundColor: 'action.selectedHover',
									},
								},
							}}
						>
							<CardContent sx={{ height: '100%' }}>
								<Typography variant='h5' component='div'>
									{project.name}
								</Typography>
								<Typography variant='body2' color='text.secondary'>
									{project.description}
								</Typography>
							</CardContent>
						</CardActionArea>
					</Card>
				))
			)}
		</Box>
	);
});
