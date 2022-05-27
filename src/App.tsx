import { useEffect, useState } from "react";
import { PersonList } from "./components/PersonList";
import { Toolbar } from "./components/Toolbar";
import { Person } from "./types";

const App = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [personFilter, setPersonFilter] = useState<string>("");

  useEffect(() => {
    async function getData(): Promise<Person[]> {
      try {
        const response = await fetch(
          `http://${process.env.REACT_APP_SERVER}/data`
        );
        const body = await response.json();
        return body as Person[];
      } catch (err) {
        console.log(err);
        return [];
      }
    }
    getData().then((data) => setPersons(data));
  }, []);

  const filteredPersons =
    personFilter === ""
      ? persons
      : persons.filter((p) => {
          return (
            p.name.toLocaleLowerCase().includes(personFilter) ||
            (p.office !== null &&
              p.office.toLocaleLowerCase().includes(personFilter))
          );
        });

  return (
    <div>
      <header>
        <h2>The fellowship of the tretton37</h2>
      </header>
      <main>
        <Toolbar
          setFilter={(val) => setPersonFilter(val.toLocaleLowerCase())}
        />
        <PersonList persons={filteredPersons} />
      </main>
    </div>
  );
};

export default App;
