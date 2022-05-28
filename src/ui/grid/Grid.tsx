import { ReactNode } from "react";
import cl from "./Grid.module.css"

type Props = {
	children? : ReactNode
};
export function Grid(props: Props) {
	return (
		<div className={cl.pane}>
			{props.children}
		</div>
	);
};