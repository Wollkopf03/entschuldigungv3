import { Grid, Slider, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../app/store';
import { setAt, setClasses, setDate, setDays, setFrom, setTill } from "./TimeSlice";

type Props = {
	days: string,
	at: string,
	date: string,
	classes: [number, number],
	from: string,
	till: string,
	setDays: ActionCreatorWithPayload<string, string>,
	setAt: ActionCreatorWithPayload<string, string>,
	setDate: ActionCreatorWithPayload<string, string>,
	setClasses: ActionCreatorWithPayload<[number, number], string>,
	setFrom: ActionCreatorWithPayload<string, string>,
	setTill: ActionCreatorWithPayload<string, string>
}

export class Time extends Component<Props> {

	render() {
		return (
			<>
				<Typography variant="h6" gutterBottom>
					Zeit
				</Typography>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={12}>
						<ToggleButtonGroup
							fullWidth
							value={this.props.days}
							exclusive
						>
							<ToggleButton
								value="single"
								onClick={() => this.props.setDays("single")}
							>Einen Tag</ToggleButton>
							<ToggleButton
								value="multiple"
								onClick={() => this.props.setDays("multiple")}
							>Mehrere Tage</ToggleButton>
						</ToggleButtonGroup>
					</Grid>
					{this.props.days === "single" &&
						<Grid item xs={12} sm={12}>
							<ToggleButtonGroup
								fullWidth
								value={this.props.at}
								exclusive
							>
								<ToggleButton
									value="today"
									onClick={() => this.props.setAt("today")}
								>Heute</ToggleButton>
								<ToggleButton
									value="another_day"
									onClick={() => this.props.setAt("another_day")}
								>Einen anderen Tag</ToggleButton>
							</ToggleButtonGroup>
						</Grid>}
					{this.props.days === "single" && this.props.at !== "today" && this.props.at !== "" &&
						<Grid item xs={12} sm={12}>
							<TextField
								required
								id="date"
								type="date"
								name="date"
								label="Datum"
								fullWidth
								onChange={(e) => this.props.setDate(e.target.value)}
								defaultValue={this.props.date} />
						</Grid>}
					{this.props.days === "single" && this.props.at !== "" &&
						<Grid item xs={12} sm={12}>
							<label>Stunden</label>
							<Slider
								value={this.props.classes}
								onChange={(e, value) => this.props.setClasses(value as [number, number])}
								min={1}
								max={11}
								marks={[
									{ value: 1, label: "1." },
									{ value: 2, label: "2." },
									{ value: 3, label: "3." },
									{ value: 4, label: "4." },
									{ value: 5, label: "5." },
									{ value: 6, label: "6." },
									{ value: 7, label: "7." },
									{ value: 8, label: "8." },
									{ value: 9, label: "9." },
									{ value: 10, label: "10." },
									{ value: 11, label: "11." }
								]} />
						</Grid>
					}
					{this.props.days === "multiple" &&
						<React.Fragment>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									id="from"
									type="date"
									name="from"
									label="Von"
									fullWidth
									onChange={(e) => this.props.setFrom(e.target.value)}
									defaultValue={this.props.from} />
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									id="till"
									type="date"
									name="till"
									label="Bis"
									fullWidth
									onChange={(e) => this.props.setTill(e.target.value)}
									defaultValue={this.props.till} />
							</Grid>
						</React.Fragment>
					}
				</Grid>
				<style>
					input[type =date]: required: invalid:: -webkit-datetime-edit {"{"}
					color: transparent;
					{"}"}
					input[type =date]: focus:: -webkit-datetime-edit {"{"}
					color: black !important;
					{"}"}
				</style>
			</>
		);
	}
}

const mapStateToProps = (state: RootState) => ({
	days: state.time.days,
	at: state.time.at,
	date: state.time.date,
	classes: state.time.classes,
	from: state.time.from,
	till: state.time.till,
})

const mapDispatchToProps = {
	setDays,
	setAt,
	setDate,
	setClasses,
	setFrom,
	setTill
}

export default connect(mapStateToProps, mapDispatchToProps)(Time)