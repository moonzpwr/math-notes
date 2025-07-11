import { type FC } from 'react';
import styles from './NotFoundView.module.css';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Paths } from '@/enums/Paths';

export const NotFoundView: FC = () => {
	const navigate = useNavigate();
	return (
		<div className={styles.root}>
			<h1>Oops! It looks like this page doesn't exist 😢</h1>
			<p>
				<Button onClick={() => navigate(Paths.Home)}>HOME</Button>
			</p>
		</div>
	);
};
