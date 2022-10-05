import { loginStateType } from "./LoginSlice";

export async function validateLogin(props: loginStateType): Promise<string | undefined> {
	if (props.vorname === "")
		return "Bitte den Vornamen angeben";
	else if (props.nachname === "")
		return "Bitte den Nachnamen angeben";
	else if (props.email === "")
		return "Bitte die Emailadresse angeben";
	else if (props.klasse === "")
		return "Bitte die Klasse auswählen";
	else if (props.geb_dat === "")
		return "Bitte das Geburtsdatum angeben";
	else if (props.passwort === "")
		return "Bitte das Passwort eingeben";
	var requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(props)
	};
	return fetch("https://api.mcs-rbg.de/entschuldigungen/login.php", requestOptions)
		.then(response => response.json()).then(data => {
			if ("error" in data)
				return data.error;
			else {
				if (props.saveData)
					localStorage.setItem("mcs_entschuldigung_user", JSON.stringify({
						vorname: props.vorname,
						nachname: props.nachname,
						email: props.email,
						klasse: props.klasse,
						geb_dat: props.geb_dat
					}))
				return undefined;
			}
		});

}