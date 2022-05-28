import { useEffect, useMemo, useState } from "react";
import { PersonList } from "./components/PersonList";
import { Toolbar } from "./components/Toolbar";
import { Filter, Person } from "./types";

const App = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [personFilter, setPersonFilter] = useState<Filter>({
    offices: [],
    name_str: "",
  });

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
    getData().then((data) => {
      setPersons(data);
      let offices: string[] = [];
      data.forEach((p) => {
        if (
          p.office !== null &&
          p.office !== "" &&
          !offices.includes(p.office)
        ) {
          offices.push(p.office);
        }
      });
      setCities(offices);
      setPersonFilter({ name_str: "", offices: offices });
    });
  }, []);

  const filteredPersons: Person[] = useMemo(() => {
    return persons.filter((p) => {
      return (
        p.office !== null &&
				personFilter.offices !== [] &&
        personFilter.offices.includes(p.office) &&
        (personFilter.name_str === "" ||
          (personFilter.name_str !== "" &&
            p.name.toLocaleLowerCase().includes(personFilter.name_str)))
      );
    });
  }, [persons, personFilter]);

  return (
    <div>
      <header>
        <h2>The fellowship of the tretton37</h2>
      </header>
      <main>
        <Toolbar updateFilter={(val) => setPersonFilter(val)} cbList={cities} />
        <PersonList persons={filteredPersons} />
      </main>
    </div>
  );
};

export default App;
