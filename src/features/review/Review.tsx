import { Divider, Grid, ListItemText, TextField, Typography } from "@mui/material";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../app/store';
import { setEmail } from "../login/LoginSlice";

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
	setEmail: ActionCreatorWithPayload<string, string>
}

export class Review extends Component<Props> {

	validate = () => {
		if (this.props.login.email === "")
			return "Bitte Emailadresse angeben";
		else {
			var requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(this.props)
			};
			fetch("https://api.mcs-rbg.de/entschuldigungen/", requestOptions)
				.then(response => response.json()).then(data => {
					if ("error" in data)
						return data.error;
					else
						return undefined;
				});
		}
	}

	render() {
		return (
			<React.Fragment>
				<Typography variant="h6" gutterBottom>
					Übersicht
				</Typography>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={6}>
						<ListItemText primary="Vorname" secondary={this.props.login.vorname} />
					</Grid>
					<Grid item xs={12} sm={6}>
						<ListItemText primary="Nachname" secondary={this.props.login.nachname} />
					</Grid>
					<Grid item xs={12} sm={6}>
						<ListItemText primary="Email" secondary={this.props.login.email} />
					</Grid>
					<Grid item xs={12} sm={6}>
						<ListItemText primary="Klasse" secondary={this.props.login.klasse} />
					</Grid>
					<Grid item xs={12} sm={6}>
						<ListItemText primary="Geburtsdatum" secondary={this.props.login.geb_dat} />
					</Grid>
					<Grid item xs={2} sm={12}>
						<Divider orientation="horizontal" flexItem />
					</Grid>
					{this.props.time.days === "single" &&
						<React.Fragment>
							{this.props.time.at === "today" &&
								<Grid item xs={12} sm={6}>
									<ListItemText primary="Am" secondary="heute" />
								</Grid>
							}
							{this.props.time.at === "another_day" &&
								<Grid item xs={12} sm={6}>
									<ListItemText primary="Am" secondary={new Date(this.props.time.date).toLocaleDateString("de-DE")} />
								</Grid>
							}
							<Grid item xs={12} sm={6}>
								<ListItemText primary="Stunden" secondary={this.props.time.classes.join(". - ") + "."} />
							</Grid>
						</React.Fragment>
					}
					{this.props.time.days === "multiple" &&
						<React.Fragment>
							<Grid item xs={12} sm={6}>
								<ListItemText primary="Von" secondary={new Date(this.props.time.from).toLocaleDateString("de-DE")} />
							</Grid>
							<Grid item xs={12} sm={6}>
								<ListItemText primary="Bis" secondary={new Date(this.props.time.till).toLocaleDateString("de-DE")} />
							</Grid>
						</React.Fragment>
					}
					<Grid item xs={2} sm={12}>
						<Divider orientation="horizontal" flexItem />
					</Grid>
					<Grid item xs={12} sm={6}>
						<ListItemText primary="Grund" secondary={this.props.reason.reason} />
					</Grid>
					{this.props.reason.comment !== "" &&
						<Grid item xs={12} sm={12} textAlign="justify" overflow="auto">
							<ListItemText style={{ "overflowWrap": "anywhere" }} primary="Kommentar" secondary={this.props.reason.comment} />
						</Grid>
					}
					<Grid item xs={2} sm={12}>
						<Divider orientation="horizontal" flexItem />
					</Grid>
					<Grid item xs={12} sm={12}>
						<TextField
							required
							id="email"
							name="email"
							label="Email Adresse"
							fullWidth
							autoComplete="email"
							placeholder="max.mustermann@kgs-ronnenberg.eu"
							onChange={(e) => this.props.setEmail(e.target.value)}
							defaultValue={this.props.login.email}
						/>
					</Grid>
				</Grid>
			</React.Fragment >
		)
	}
}

const mapStateToProps = (state: RootState) => ({
	login: state.login,
	time: state.time,
	reason: state.reason
})

const mapDispatchToProps = { setEmail }

export default connect(mapStateToProps, mapDispatchToProps)(Review)