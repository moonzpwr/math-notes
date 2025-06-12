import styles from './LoadingSpinner.module.css';

export const LoadingSpinner: React.FC = () => {
    return (
        <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner} />
        </div>
    )
}