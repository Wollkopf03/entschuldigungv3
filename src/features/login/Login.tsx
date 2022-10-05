import { FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from '@mui/material';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../app/store';
import { setEmail, setGebDat, setKlasse, setNachname, setPasswort, setVorname } from "./LoginSlice";

type Props = {
	vorname: string,
	nachname: string,
	klasse: string,
	geb_dat: string,
	passwort: string,
	email: string,
	setEmail: ActionCreatorWithPayload<string, string>,
	setGebDat: ActionCreatorWithPayload<string, string>,
	setKlasse: ActionCreatorWithPayload<string, string>,
	setNachname: ActionCreatorWithPayload<string, string>,
	setPasswort: ActionCreatorWithPayload<string, string>,
	setVorname: ActionCreatorWithPayload<string, string>
}

export class Login extends Component<Props>  {

	render() {
		return (
			<React.Fragment >
				<Typography variant="h6" gutterBottom>
					Anmeldedaten
				</Typography>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={6}>
						<TextField
							required
							id="firstName"
							name="firstName"
							label="Vorname"
							fullWidth
							autoComplete="given-name"
							placeholder="Max"
							onChange={(e) => this.props.setVorname(e.target.value)}
							value={this.props.vorname}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							required
							id="lastName"
							name="lastName"
							label="Nachname"
							fullWidth
							autoComplete="family-name"
							placeholder="Mustermann"
							onChange={(e) => this.props.setNachname(e.target.value)}
							value={this.props.nachname}
						/>
					</Grid>
					<Grid item xs={12} sm={12}>
						<TextField
							required
							id="email"
							type="email"
							name="email"
							label="Email Adresse"
							fullWidth
							autoComplete="email"
							placeholder="max.mustermann@kgs-ronnenberg.eu"
							onChange={(e) => this.props.setEmail(e.target.value)}
							value={this.props.email}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormControl fullWidth>
							<InputLabel id="klasse-label">Klasse *</InputLabel>
							<Select
								required
								labelId="klasse-label"
								id="klasse"
								name="klasse"
								value={this.props.klasse}
								fullWidth
								label="Klasse"
								onChange={(e) => this.props.setKlasse(e.target.value)}
							>
								<MenuItem value="E1">E1</MenuItem>
								<MenuItem value="E2">E2</MenuItem>
								<MenuItem value="E3">E3</MenuItem>
								<MenuItem value="E4">E4</MenuItem>
								<MenuItem value="E5">E5</MenuItem>
								<MenuItem value="Q">Q</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							required
							id="geb_dat"
							name="geb_dat"
							label="Geburtsdatum"
							fullWidth
							placeholder="01.01.2003"
							onChange={(e) => this.props.setGebDat(e.target.value)}
							value={this.props.geb_dat}
						/>
					</Grid>
					<Grid item xs={12} sm={12}>
						<FormControl fullWidth variant="outlined">
							<InputLabel htmlFor="password">Password *</InputLabel>
							<OutlinedInput
								required
								id="password"
								type="password"
								name="password"
								label="Passwort"
								fullWidth
								placeholder="12345"
								onChange={(e) => this.props.setPasswort(e.target.value)}
								value={this.props.passwort}
							/>
						</FormControl>
					</Grid>
				</Grid>
			</React.Fragment >
		);
	}
}

const mapStateToProps = (state: RootState) => ({
	vorname: state.login.vorname,
	nachname: state.login.nachname,
	klasse: state.login.klasse,
	geb_dat: state.login.geb_dat,
	passwort: state.login.passwort,
	email: state.login.email
})

const mapDispatchToProps = { setVorname, setNachname, setKlasse, setGebDat, setPasswort, setEmail }

export default connect(mapStateToProps, mapDispatchToProps)(Login)