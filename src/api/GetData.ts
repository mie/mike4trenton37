import { Person } from "../types";

export default class GetData {
	static async GetPersons() {
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
}