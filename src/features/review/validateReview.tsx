import { loginStateType } from "../login/LoginSlice";
import { reasonStateType } from "../reason/ReasonSlice";
import { timeStateType } from "../time/TimeSlice";

type Props = {
	login: loginStateType,
	time: timeStateType,
	reason: reasonStateType
}

export async function validateReview(props: Props) {
	var requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ ...props.login, ...props.time, ...props.reason })
	};
	return fetch("https://api.mcs-rbg.de/entschuldigungen/", requestOptions)
		.then(response => response.json()).then(data => {
			if ("error" in data)
				return data.error;
			else
				return undefined;
		});
}