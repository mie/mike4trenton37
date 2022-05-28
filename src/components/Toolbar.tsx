import { useEffect, useMemo, useState } from "react";
import { CheckedState, Filter } from "../types";

type Props = {
  updateFilter: (filter: Filter) => void;
  cbList: string[];
};
export function Toolbar(props: Props) {
  const [filterText, setFilterText] = useState<string>("");
  const [checked, setChecked] = useState<CheckedState[]>([]);
	useEffect(() => {
		setChecked(
			props.cbList.map((li) => {
				return { item: li, checked: true };
			})
		);
	}, [props.cbList]);

  const updateFilterText = (val: string) => {
    setFilterText(val);
    props.updateFilter({
      name_str: val,
      offices: checked.filter((c) => c.checked).map((o) => o.item),
    });
  };

	const sortedOptions = useMemo(() => {
		return checked.sort((a,b) => {return a.item.localeCompare(b.item)});
	}, [checked])

  const updateFilterCb = (val: string, check: boolean) => {
		const new_checked = [
      ...checked.filter((c) => c.item !== val),
      { item: val, checked: check }
    ]
    setChecked(new_checked);
    props.updateFilter({
      name_str: filterText,
      offices: new_checked.filter((c) => c.checked).map((o) => o.item),
    });
  };

  return (
    <div>
      <input
        type="text"
        value={filterText}
        onChange={(e) => updateFilterText(e.target.value.toLocaleLowerCase())}
      />
      {checked === [] ? (
        <div>No offices found</div>
      ) : (
        <div>
          {sortedOptions.map(ch => (
            <div key={ch.item}>
              <input
                type="checkbox"
                checked={ch.checked}
                onChange={(e) => updateFilterCb(ch.item, e.target.checked)}
              />
              <label>{ch.item}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
