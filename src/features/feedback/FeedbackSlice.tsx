import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type feedbackStateType = {
	type: string,
	topic: string,
	text: string
}
const initialState: feedbackStateType = {
	type: "",
	topic: "",
	text: ""
}

const LoginSlice = createSlice({
	name: "login",
	initialState,
	reducers: {
		setType: (loginState, action: PayloadAction<string>) => {
			loginState.type = action.payload
		},
		setTopic: (loginState, action: PayloadAction<string>) => {
			loginState.topic = action.payload
		},
		setText: (loginState, action: PayloadAction<string>) => {
			loginState.text = action.payload
		}
	}
});

export const { setType, setTopic, setText } = LoginSlice.actions

export default LoginSlice.reducer