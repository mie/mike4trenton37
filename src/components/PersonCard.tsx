import { Person } from "../types";

type Props = {
	person: Person	
};
export function PersonCard(props: Props) {
	return (
		<div>
			<p>{props.person.name} (office {props.person.office})</p>
		</div>
	);
};