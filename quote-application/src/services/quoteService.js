
import { baseUrl } from "./apiconfig";
import axiosInstance from "../utils/axiosInstance";

// Get All Quotes
export async function fetchAllQuotes(userId) {
	const url = `${baseUrl}/quote/withLikedStatus/${userId}`;
	const resp = await axiosInstance.get(url);
	console.log(resp);
	if (resp.status !== 200)
		throw new Error("axiosInstance API call Error");
	const result = resp.data;
	if (result.status !== "success")
		throw new Error(result.message);
	return result.data;
}
export async function fetchQuoteById(id) {
	const url = `${baseUrl}/quote/${id}`;
	const resp = await axiosInstance.get(url);
	console.log(resp);
	if (resp.status !== 200)
		throw new Error("axiosInstance API call Error");
	const result = resp.data;
	if (result.status !== "success")
		throw new Error(result.message);
	return result.data;
}
// Get Favorite Quotes
export async function getFavoriteQuotesByUserId(userId) {
	const url = `${baseUrl}/quote/favQuote/${userId}`;
	const resp = await axiosInstance.get(url);
	console.log(resp);
	if (resp.status !== 200)
		throw new Error("axiosInstance API call Error");
	const result = resp.data;
	if (result.status !== "success")
		throw new Error(result.message);
	return result.data;
}

// Fetch quotes by userId used in MyQuotes added quotes in quoteTable.
export async function fetchQuotesByUserId(userId) {
  const response = await axiosInstance.get(`${baseUrl}/quote/userId/${userId}`);
  if (response.data.status === "success") {
    return response.data.data;
  }
  throw new Error(response.data.message);
}

// Delete a quote by id
export async function deleteQuote(id) {
  const response = await axiosInstance.delete(`${baseUrl}/quote/${id}`);
  if (response.data.status === "success") {
    return;
  }
  throw new Error(response.data.message);
}
export async function addQuotes({ userId, author, contents, createdTime }) {
	const url = `${baseUrl}/quote`;
	const resp = await axiosInstance.post(url, {
		userId,
		author,
		contents,
		createdTime
	});
	console.log(resp);
	if (resp.status !== 200) throw new Error("axiosInstance API call Error");
	const result = resp.data;
	if (result.status !== "success") throw new Error(result.message);
	return result.data;
}

export async function updateQuote(id,{ userId, author, contents, createdTime }) {
	const url = `${baseUrl}/quote/${id}`;
	const resp = await axiosInstance.put(url, {
		userId,
		author,
		contents,
		createdTime
	});
	console.log(resp);
	if (resp.status !== 200) throw new Error("axiosInstance API call Error");
	const result = resp.data;
	if (result.status !== "success") throw new Error(result.message);
	return result.data;
}


// Toggle Like
export async function toggleQuoteLike(quoteId) {
	const url = `${baseUrl}/quote/toggle-like/${quoteId}`;
	const resp = await axiosInstance.put(url);
	console.log(resp);
	if (resp.status !== 200)
		throw new Error("axiosInstance API call Error");
	const result = resp.data;
	if (result.status !== "success")
		throw new Error(result.message);
	return result.data;
}

export async function markAsFavorite(userId, quoteId) {
	const url = `${baseUrl}/quote/favQuote`;
	const resp = await axiosInstance.post(url, { userId, quoteId });
	if (resp.status !== 200) throw new Error("Failed to favorite quote");
	const result = resp.data;
	if (result.status !== "success") throw new Error(result.message);
	return result.data;
}
// Unmark a quote as favorite
// export async function unmarkAsFavorite(id) {
// 	const url = `${baseUrl}/quote/favQuote/${id}`;
// 	const resp = await axiosInstance.delete(url);
// 	if (resp.status !== 200) throw new Error("Failed to unfavorite quote");
// 	const result = resp.data;
// 	if (result.status !== "success") throw new Error(result.message);
// 	return result.data;
// }

export async function unmarkAsFavorite(userId, quoteId) {
  try {
    const response = await axiosInstance.delete(`${baseUrl}/quote/unmark-favorite/${userId}/${quoteId}`);
    return response.data;
  } catch (error) {
    console.error('Error in unmarkAsFavorite:', error);
    throw error.response?.data || { message: 'Unknown error occurred' };
  }
}