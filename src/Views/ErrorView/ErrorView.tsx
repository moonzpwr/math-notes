import styles from './ErrorView.module.css';

export const ErrorView: React.FC = () => {
	return (
		<div className={styles.root}>
			<h1>Oops! Something went wrong 😢</h1>
			<p>Please try refreshing the page or come back later.</p>
		</div>
	);
};
