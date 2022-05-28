import { Person } from "../types";
import { Card } from "../ui/card/Card";

type Props = {
	person: Person	
};
export function PersonCard(props: Props) {
	return (
		<Card>
			<p>{props.person.name} (office {props.person.office})</p>
		</Card>
	);
};