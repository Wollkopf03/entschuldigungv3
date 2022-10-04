import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type loginStateType = {
	vorname: string,
	nachname: string,
	klasse: string,
	geb_dat: string,
	passwort: string,
	email: string
}
const initialState: loginStateType = {
	vorname: "",
	nachname: "",
	klasse: "",
	geb_dat: "",
	passwort: "",
	email: ""
}

const LoginSlice = createSlice({
	name: "login",
	initialState,
	reducers: {
		setVorname: (loginState, action: PayloadAction<string>) => {
			loginState.vorname = action.payload
		},
		setNachname: (loginState, action: PayloadAction<string>) => {
			loginState.nachname = action.payload
		},
		setKlasse: (loginState, action: PayloadAction<string>) => {
			loginState.klasse = action.payload
		},
		setGebDat: (loginState, action: PayloadAction<string>) => {
			loginState.geb_dat = action.payload
		},
		setPasswort: (loginState, action: PayloadAction<string>) => {
			loginState.passwort = action.payload
		},
		setEmail: (loginState, action: PayloadAction<string>) => {
			loginState.email = action.payload
		}
	}
});

export const { setVorname, setNachname, setKlasse, setGebDat, setPasswort, setEmail } = LoginSlice.actions

export default LoginSlice.reducer