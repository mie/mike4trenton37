import { useState } from "react";

type Props = {
  setFilter: (filterString: string) => void;
};
export function Toolbar(props: Props) {
	const [filterText, setFilterText] = useState<string>("")
	const updateFilter = (val: string) => {
		setFilterText(val);
		props.setFilter(val)
	}

  return <div>
		<input type="text" value={filterText} onChange={(e) => updateFilter(e.target.value)} />
	</div>;
}
