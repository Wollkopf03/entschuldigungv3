import { loginStateType } from "../login/LoginSlice";
import { feedbackStateType } from "./FeedbackSlice";

export async function validateFeedback(props: { feedback: feedbackStateType, login: loginStateType }): Promise<string | undefined> {
	var requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			login: props.login,
			feedback: props.feedback
		})
	};
	return await fetch("https://api.mcs-rbg.de/entschuldigungen/feedback.php", requestOptions)
		.then(response => response.json()).then(data => {
			if ("error" in data)
				return data.error;
			else
				return undefined;
		});
}