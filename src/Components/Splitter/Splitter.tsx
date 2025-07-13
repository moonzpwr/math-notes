import classNames from 'classnames';
import { useState } from 'react';
import styles from './Splitter.module.css';

interface Props {
	id?: string;
	isDragging: boolean;
}

export const Splitter: React.FC<Props> = ({ id = 'drag-bar', ...props }) => {
	const [isFocused, setIsFocused] = useState(false);
	return (
		<div
			id={id}
			className={classNames(styles.splitter, { [styles.active]: isFocused })}
			onFocus={() => setIsFocused(true)}
			onBlur={() => setIsFocused(false)}
			{...props}
		>
			{' '}
			|
		</div>
	);
};
