import { reasonStateType } from './ReasonSlice';


export async function validateReason(props: reasonStateType) {
	if (props.reason === "")
		return "Bitte Grund angeben";
	else
		return undefined;
}