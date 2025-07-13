import { LoadingSpinner } from '@/Components/LoadingSpinner/LoadingSpinner';
import { DataState } from '@/enums/DataState';
import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import styles from './HomeView.module.css';
import { ErrorView } from '../ErrorView/ErrorView';
import { useNavigate } from 'react-router-dom';
import { Paths } from '@/enums/Paths';
import { projectsStore } from '@/Store/Projects.store';

export const HomeView: React.FC = observer(() => {
	const navigate = useNavigate();
	const { projects, getProjectsAsync } = projectsStore;
	const isLoading = projects.state === DataState.Pending;
	const isFailed = projects.state === DataState.Rejected;

	useEffect(() => {
		getProjectsAsync();
	}, []);

	return (
		<Box className={styles.root}>
			{isLoading ? (
				<div className={styles.holder}>
					<LoadingSpinner />
				</div>
			) : isFailed ? (
				<div className={styles.holder}>
					<ErrorView />
				</div>
			) : (
				projects.data &&
				projects.data.map((project) => (
					<Card key={project.id} className={styles.card}>
						<CardActionArea
							onClick={() => navigate(`${Paths.Project}/${project.id}`)}
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
