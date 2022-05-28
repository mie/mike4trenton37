import { Person } from "../types";
import { Card } from "../ui/card/Card";
import { Grid } from "../ui/grid/Grid";

type Props = {
  persons: Person[];
};
export function PersonList(props: Props) {
  return (
    <Grid>
      {props.persons.map((p) => {
        return (
          <div key={p.name}>
            <Card person={p} />
          </div>
        );
      })}
    </Grid>
  );
}
