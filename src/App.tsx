import { useEffect, useState } from "react";
import { PersonList } from "./components/PersonList";
import { Toolbar } from "./components/Toolbar";
import { Filter, Person } from "./types";
import "./App.css"
import useFilteredPersons from "./hooks/useFilteredPersons";
import GetData from "./api/GetData";

export const App = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [personFilter, setPersonFilter] = useState<Filter>({
    offices: [],
    name_str: "",
  });

  useEffect(() => {
    GetData.GetPersons().then((data) => {
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

  const filteredPersons: Person[] = useFilteredPersons(persons, personFilter);

  return (
    <div className="container">
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