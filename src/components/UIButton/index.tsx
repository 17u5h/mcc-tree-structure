import React from 'react';
import styles from './styles.module.css'

type Props = {
	children: string
	onClick: () => void
}

const UIButton = ({onClick, children}: Props) => {
	return (
		<div onClick={onClick} className={styles.uiButton}>
			{children}
		</div>
	);
};

export default UIButton;