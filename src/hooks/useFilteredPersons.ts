import { useMemo } from "react";
import { Filter, Person } from "../types";

export default function useFilteredPersons(persons: Person[], filter: Filter): Person[] {
  const filteredPersonsByOffice = useMemo(() => {
    return persons.filter((p) => {
      return (
        p.office !== null &&
        filter.offices !== [] &&
        filter.offices.includes(p.office)
      );
    });
  }, [persons, filter.offices]);
  const filteredPersons = useMemo(() => {
    return filteredPersonsByOffice.filter((p) => {
      return (
        filter.name_str === "" ||
        (filter.name_str !== "" &&
          p.name.toLocaleLowerCase().includes(filter.name_str))
      );
    });
  }, [filteredPersonsByOffice, filter.name_str]);
  return filteredPersons;
}
