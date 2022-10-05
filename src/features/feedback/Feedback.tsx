import { Box, Button, Grid, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../app/store';
import { setError } from "../../AppSlice";
import { setText, setTopic, setType } from "./FeedbackSlice";

type Props = {
	type: string,
	topic: string,
	text: string,
	schueler: string,
	setType: ActionCreatorWithPayload<string, string>,
	setTopic: ActionCreatorWithPayload<string, string>,
	setText: ActionCreatorWithPayload<string, string>,
	setError: ActionCreatorWithPayload<string | undefined, string>
}

export class Feedback extends Component<Props> {

	render() {
		return (
			<React.Fragment>
				<Typography variant="h6" gutterBottom>
					Feedback
				</Typography>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={12}>
						<ToggleButtonGroup
							fullWidth
							value={this.props.type}
							exclusive
						>
							<ToggleButton
								value="kritik"
								onClick={(e, value) => this.props.setType(value)}
							>Kritik</ToggleButton>
							<ToggleButton
								value="vorschlag"
								onClick={(e, value) => this.props.setType(value)}
							>Vorschlag</ToggleButton>
							<ToggleButton
								value="lob_anerkennung"
								onClick={(e, value) => this.props.setType(value)}
							>Lob & Anerkennung</ToggleButton>
							<ToggleButton
								value="none"
								onClick={(e, value) => this.props.setType(value)}
							>Etwas anderes...</ToggleButton>
						</ToggleButtonGroup>
					</Grid>
					{this.props.type === "none" &&
						<Grid item xs={12} sm={12}>
							<TextField
								required
								id="topic"
								name="topic"
								label="Thema"
								value={this.props.topic}
								onChange={(e) => this.props.setTopic(e.target.value)}
								fullWidth
							/>
						</Grid>
					}
					{this.props.type !== "" &&
						<Grid item xs={12} sm={12}>
							<TextField
								id="Text"
								name="text"
								label="Feedback"
								value={this.props.text}
								onChange={(e) => this.props.setText(e.target.value)}
								fullWidth
								multiline
								rows={4}
							/>
						</Grid>
					}
				</Grid>
			</React.Fragment >
		)
	}
}

const mapStateToProps = (state: RootState) => ({
	type: state.feedback.type,
	topic: state.feedback.topic,
	text: state.feedback.text,
	schueler: state.login.vorname + " " + state.login.nachname
})

const mapDispatchToProps = { setType, setTopic, setText, setError }

export default connect(mapStateToProps, mapDispatchToProps)(Feedback)