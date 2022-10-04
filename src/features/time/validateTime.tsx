import { timeStateType } from "./TimeSlice";

export async function validateTime(props: timeStateType) {
	if (props.days === "single")
		if (props.at === "today")
			return undefined;
		else if (props.at === "another_day")
			if (isNaN(Date.parse(props.date)))
				return "Kein Datum ausgewählt";
			else if (new Date(props.date) < new Date())
				return "Bitte ein Datum in der Zukunft auswählen";
			else
				return undefined;
		else
			return "Keinen Tag ausgewählt";
	else if (props.days === "multiple")
		if (isNaN(Date.parse(props.from)))
			return "Bitte ein Startdatum auswählen";
		else if (isNaN(Date.parse(props.till)))
			return "Bitte ein Enddatum auswählen";
		else if (new Date(props.from) < new Date(new Date().getTime() - 24 * 60 * 60 * 1000))
			return "Das Startdatum muss heute sein oder in der Zukunft liegen";
		else if (new Date(props.till) <= new Date(props.from))
			return "Das Enddatum muss nach dem Startdatum sein";
		else
			return undefined;
	else
		return "Bitte Anzahl der Tage auswählen";
}
