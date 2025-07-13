import type { ReactNode } from 'react';
import styles from './DefaultLayout.module.css';

interface Props {
	children: ReactNode;
}

export const DefaultLayout = ({ children }: Props) => {
	return (
		<div className={styles.defaultLayout}>
			<div className={styles.blur}>{children}</div>
		</div>
	);
};
