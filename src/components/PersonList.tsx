import { Person } from "../types";
import { PersonCard } from "./PersonCard";

type Props = {
  persons: Person[];
};
export function PersonList(props: Props) {
  return (
    <div>
      {props.persons.map((p) => {
        return <div key={p.name}>
					<PersonCard person={p} />
				</div>
      })}
    </div>
  );
}
