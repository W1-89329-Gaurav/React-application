import axios from "axios";
import { baseUrl } from "./apiconfig";

export async function userSignIn(email, passwd) {
	const url = `${baseUrl}/user/signin`;
	const reqbody = { email, password };
	const resp = await axios.post(url, reqbody);
	console.log(resp);
	if (resp.status !== 200)
		// check axios resp status (200 or else)
		throw new Error("Axios API call Error");
	// get axios resp data - result
	const result = resp.data;
	if (result.status !== "success")
		// if api status is not success ("error"), then get the message
		throw new Error(result.message);
	const data = result.data;
	return data;
}

export async function userSignUp(firstName, lastName, email, password, phoneNo, address) {
	const url = `${baseUrl}/user/signup`;
	const reqBody = { firstName, lastName, email, password, phoneNo, address };
	const resp = await axios.post(url, reqBody);
	console.log(resp);
	if (resp.status !== 200)
		// check axios resp status (200 or else)
		throw new Error("Axios API call Error");
	// get axios resp data - result
	const result = resp.data;
	if (result.status !== "success")
		// if api status is not success ("error"), then get the message
		throw new Error(result.message);
	const data = result.data;
	return data;
}
