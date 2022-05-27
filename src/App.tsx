import { useEffect, useState } from "react";
import { PersonList } from "./components/PersonList";
import { Person } from "./types";

const App = () => {
  const [persons, setPersons] = useState<Person[]>([]);

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
				return []
      }
    }
		getData().then(data => setPersons(data));
  }, []);

  return (
    <div>
      <header>
        <h2>The fellowship of the tretton37</h2>
      </header>
      <main>
        <PersonList persons={persons} />
      </main>
    </div>
  );
};

export default App;
