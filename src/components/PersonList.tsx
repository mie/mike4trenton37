import { Person } from "../types";

type Props = {
  persons: Person[];
};
export function PersonList(props: Props) {
  return (
    <div>
      {props.persons.map((p, idx) => {
        return <div>
					<p key={idx}>{p.name} ({p.email})</p>
				</div>
      })}
    </div>
  );
}
