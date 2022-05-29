import { useEffect, useRef, useState } from "react";
import useObserver from "../hooks/useObserver";
import { Person } from "../types";
import { Card } from "../ui/card/Card";
import { Grid } from "../ui/grid/Grid";

type Props = {
  persons: Person[];
};
export function PersonList(props: Props) {
  const [shownPersons, setShownPersons] = useState<Person[]>([]);
  const [page, setPage] = useState<number>(0);
  const size = 12;
  const loader = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setPage(0)
	}, [props.persons]);
  useEffect(() => {
    setShownPersons(props.persons.slice(0, page * size));
  }, [page, props.persons]);
  useObserver(
    loader.current,
    shownPersons !== [],
    shownPersons.length < props.persons.length,
    () => setPage(page + 1)
  );

  return (
    <>
      <Grid>
        {shownPersons.map((p) => {
          return (
            <div key={p.name}>
              <Card person={p} data-testid="person-card" />
            </div>
          );
        })}
      </Grid>
      <div
        ref={loader}
        style={{
          height: "20px",
          width: "100%",
          backgroundColor: "transparent",
        }}
      ></div>
    </>
  );
}
