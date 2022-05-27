import { Person } from "../types";

type Props = {
  persons: Person[];
};
export function PersonList(props: Props) {
  return (
    <div>
      {props.persons.map((p) => {
        return <div key={p.name}>
					<p>{p.name} (office {p.office})</p>
				</div>
      })}
    </div>
  );
}
