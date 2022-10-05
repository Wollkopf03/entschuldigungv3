import { ThemeProvider } from '@emotion/react';
import { Alert, AppBar, Box, Button, Container, createTheme, Grid, Paper, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootState } from './app/store';
import { nextStep, prevStep, setError } from "./AppSlice";
import Feedback from './features/feedback/Feedback';
import { feedbackStateType } from './features/feedback/FeedbackSlice';
import { validateFeedback } from './features/feedback/validateFeedback';
import Login from './features/login/Login';
import { loginStateType } from './features/login/LoginSlice';
import { validateLogin } from './features/login/validateLogin';
import Reason from './features/reason/Reason';
import { reasonStateType } from './features/reason/ReasonSlice';
import { validateReason } from './features/reason/validateReason';
import Review from './features/review/Review';
import { validateReview } from './features/review/validateReview';
import Success from './features/success/Success';
import Time from './features/time/Time';
import { timeStateType } from './features/time/TimeSlice';
import { validateTime } from './features/time/validateTime';

type Props = {
	step: number,
	error: string | undefined,
	setError: ActionCreatorWithPayload<string | undefined, string>,
	nextStep: () => void,
	prevStep: () => void,
	login: loginStateType,
	time: timeStateType,
	reason: reasonStateType,
	feedback: feedbackStateType
}

class App extends Component<Props> {

	steps = ["Login", "Zeit", "Grund", "Überblick"];

	getStepContent() {
		switch (this.props.step) {
			case 0:
				return <Login />
			case 1:
				return <Time />
			case 2:
				return <Reason />
			case 3:
				return <Review />
			case 4:
				return <Success />
			case 5:
				return <Feedback />
			default:
				return <Typography component="h6" variant="h6" align="center">
					Vielen Dank für dein Feedback
				</Typography>
		}
	}
	async undefined() {
		return undefined;
	}

	async nextStep() {
		let error: Promise<string | undefined>;
		switch (this.props.step) {
			case 0:
				error = validateLogin(this.props.login);
				break;
			case 1:
				error = validateTime(this.props.time);
				break;
			case 2:
				error = validateReason(this.props.reason);
				break;
			case 3:
				error = validateReview({ login: this.props.login, time: this.props.time, reason: this.props.reason });
				break;
			case 4:
				error = this.undefined();
				break;
			case 5:
				error = validateFeedback({ feedback: this.props.feedback, login: this.props.login });
				break;
			default:
				throw new Error("Unknown step");
		}
		console.log(error)
		this.props.setError(await error);
		if (await error === undefined)
			this.props.nextStep()
	}

	render() {
		return (
			<ThemeProvider theme={createTheme()}>
				<Container maxWidth="sm" sx={{ mb: 8 }}>
					<Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
						<Typography component="h1" variant="h4" align="center">
							{`${process.env.REACT_APP_NAME}`[0].toUpperCase() + `${process.env.REACT_APP_NAME}`.slice(1)}
						</Typography>
						<Stepper activeStep={this.props.step} sx={{ pt: 3, pb: 5 }} alternativeLabel>
							{this.steps.map((label) => (
								<Step key={label}>
									<StepLabel>{label}</StepLabel>
								</Step>
							))}
						</Stepper>
						<React.Fragment>
							{this.getStepContent()}
							<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
								{this.props.error === undefined && this.props.step < 4 ?
									<React.Fragment>
										{this.props.step !== 0 &&
											<Button onClick={() => this.props.prevStep()} sx={{ mt: 3, ml: 1 }}>
												Zurück
											</Button>
										}
										<Button
											variant="contained"
											onClick={() => this.nextStep()}
											sx={{ mt: 3, ml: 1 }}
										>
											{this.props.step === this.steps.length - 1 ? "Abschicken" : "Weiter"}
										</Button>
									</React.Fragment>
									: this.props.error === undefined && this.props.step === 4 ?
										<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
											<Button
												variant="contained"
												onClick={() => this.nextStep()}
												sx={{ mt: 3, ml: 1 }}
											>
												Feedback senden (optional)
											</Button>
										</Box>
										: this.props.error === undefined && this.props.step === 5 ?
											<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
												<Button
													variant="contained"
													onClick={() => this.nextStep()}
													sx={{ mt: 3, ml: 1 }}
												>
													Feedback senden (optional)
												</Button>
											</Box> : this.props.error !== undefined &&
											<Alert sx={{ mt: 3, width: "100%" }} severity="error">{this.props.error}</Alert>
								}
							</Box>
						</React.Fragment>
					</Paper>
				</Container>
				<AppBar
					position="relative"
					color="default"
					sx={{
						width: '100%',
						position: 'fixed',
						bottom: 0,
						left: 0,
						right: 0,
						p: 0,
						borderTop: (theme) => `1px solid ${theme.palette.divider}`,
					}}
				>
					<Grid sx={{ display: 'flex' }}>
						<Typography sx={{
							position: 'relative',
							left: 5,
						}} variant="h6" color="rgba(0, 0, 0, 0.5)">
							by {`${process.env.REACT_APP_AUTHOR}`}
						</Typography>
						<Typography sx={{
							position: 'fixed',
							right: 5,
						}} variant="h6" color="rgba(0, 0, 0, 0.5)">
							v{`${process.env.REACT_APP_VERSION}`}
						</Typography>
					</Grid>
				</AppBar>
			</ThemeProvider >
		)
	}
}

const mapStateToProps = (state: RootState) => ({
	step: state.app.step,
	error: state.app.error,
	login: state.login,
	time: state.time,
	reason: state.reason,
	feedback: state.feedback
})

const mapDispatchToProps = {
	nextStep,
	prevStep,
	setError
}

export default connect(mapStateToProps, mapDispatchToProps)(App)