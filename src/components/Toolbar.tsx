import { useEffect, useMemo, useState } from "react";
import { CheckedState, Filter } from "../types";
import debounce from "../utils/debounce";

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
    debounce(() => {
      props.updateFilter({
        name_str: val,
        offices: checked.filter((c) => c.checked).map((o) => o.item),
      });
    }, 500)();
  };

  const sortedOptions = useMemo(() => {
    return checked.sort((a, b) => {
      return a.item.localeCompare(b.item);
    });
  }, [checked]);

  const updateFilterCb = (val: string, check: boolean) => {
    const new_checked = [
      ...checked.filter((c) => c.item !== val),
      { item: val, checked: check },
    ];
    setChecked(new_checked);
    props.updateFilter({
      name_str: filterText,
      offices: new_checked.filter((c) => c.checked).map((o) => o.item),
    });
  };

  return (
    <div className="toolbar">
      <div className="input-toolbar">
        <input
          type="text"
          value={filterText}
          placeholder="start typing a name to filter..."
          onChange={(e) => updateFilterText(e.target.value.toLocaleLowerCase())}
        />
      </div>
      {checked !== [] && (
        <div className="cb-toolbar">
          <p>Selected offices:</p>
          <div className="cb-toolbar-inner">
            {sortedOptions.map((ch) => (
              <div className="cb-toolbar-item" key={ch.item}>
                <input
                  type="checkbox"
                  checked={ch.checked}
                  onChange={(e) => updateFilterCb(ch.item, e.target.checked)}
                />
                <label>{ch.item}</label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
