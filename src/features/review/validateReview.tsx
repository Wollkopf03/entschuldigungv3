type Props = {
	login: {
		vorname: string,
		nachname: string,
		klasse: string,
		geb_dat: string,
		passwort: string,
		email: string
	},
	time: {
		days: string,
		at: string,
		date: string,
		classes: [number, number],
		from: string,
		till: string
	},
	reason: {
		reason: string,
		comment: string,
	}
}

export async function validateReview(props: Props) {
	if (props.login.email === "")
		return "Bitte Emailadresse angeben";
	else {
		var requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ ...props.login, ...props.time, ...props.reason })
		};
		return fetch("https://api.mcs-rbg.de/entschuldigungen-test/", requestOptions)
			.then(response => response.json()).then(data => {
				if ("error" in data)
					return data.error;
				else
					return undefined;
			});
	}
}