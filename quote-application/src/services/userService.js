
//import axiosInstance from "axiosInstance";
import { baseUrl } from "./apiconfig";
import axiosInstance from "../utils/axiosInstance";
// Login
export async function userSignIn(email, password) {
	const url = `${baseUrl}/user/signin`;
	const reqbody = { email, password };
	const resp = await axiosInstance.post(url, reqbody);
	console.log(resp);
	if (resp.status !== 200)
		throw new Error("axiosInstance API call Error");
	const result = resp.data;
	if (result.status !== "success")
		throw new Error(result.message);
	return result.data;
}

// Register
export async function userSignUp(firstName, lastName, email, password, phoneno, address) {
	const url = `${baseUrl}/user/signup`;
	const reqBody = { firstName, lastName, email, password, phoneno, address };
	const resp = await axiosInstance.post(url, reqBody);
	console.log(resp);
	if (resp.status !== 200)
		throw new Error("axiosInstance API call Error");
	const result = resp.data;
	if (result.status !== "success")
		throw new Error(result.message);
	return result.data;
}

export async function fetchAllUsers() {
	const url = `${baseUrl}/user`;
	const resp = await axiosInstance.get(url);
	console.log(resp);
	if (resp.status !== 200)
		throw new Error("axiosInstance API call Error");
	const result = resp.data;
	if (result.status !== "success")
		throw new Error(result.message);
	return result.data;
}
export async function fetchUserById(id) {
	const url = `${baseUrl}/user/${id}`;
	const resp = await axiosInstance.get(url);
	console.log(resp);
	if (resp.status !== 200)
		throw new Error("axiosInstance API call Error");
	const result = resp.data;
	if (result.status !== "success")
		throw new Error(result.message);
	return result.data;
}

export async function updateUserById(id, userData) {
	const url = `${baseUrl}/user/${id}`;
	const resp = await axiosInstance.patch(url, userData);
	console.log(resp);
	if (resp.status !== 200)
		throw new Error("axiosInstance API call Error");
	const result = resp.data;
	if (result.status !== "success")
		throw new Error(result.message);
	return result.data;
}
export async function updateUserByIdPut(id, userData) {
	const url = `${baseUrl}/user/${id}`;
	const resp = await axiosInstance.put(url, userData);
	console.log(resp);
	if (resp.status !== 200)
		throw new Error("axiosInstance API call Error");
	const result = resp.data;
	if (result.status !== "success")
		throw new Error(result.message);
	return result.data;
}
export async function deleteUserById(id) {
	const url = `${baseUrl}/user/${id}`;
	const resp = await axiosInstance.delete(url);
	console.log(resp);
	if (resp.status !== 200)
		throw new Error("axiosInstance API call Error");
	const result = resp.data;
	if (result.status !== "success")
		throw new Error(result.message);
	return result.data;
}



