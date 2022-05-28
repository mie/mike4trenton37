import { ReactNode } from 'react';
import cl from './Card.module.css'

type Props = {
	children?: ReactNode
};
export function Card(props: Props) {
	return (
		<div className={cl.card}>
			{props.children}
		</div>
	);
};