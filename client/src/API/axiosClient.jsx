// api/axiosClient.js
import axios from 'axios';
import queryString from 'query-string';
// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#requestconfig` for the full list of configs
const axiosClient = axios.create({
	baseURL: 'http://localhost:5000',
	headers: {
		'content-type': 'application/json',
		// 'CSRF-Token':
	},
	paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
	// Handle token here ...
	return config;
});
axiosClient.interceptors.response.use(
	(response) => {
		if (response && response.data) {
			return response.data;
		}
		return response;
	},
	(error) => {
		// Handle errors
		throw error;
	}
);
export default axiosClient;
/*
This code sets up a default configuration for making HTTP requests using the Axios library. Here's a breakdown of what each part of the code does:

Importing Dependencies:

import axios from 'axios': Imports the Axios library for making HTTP requests.
import queryString from 'query-string': Imports the queryString library, which helps serialize JavaScript objects into query strings.
Creating Axios Instance:

const axiosClient = axios.create({ ... }): Creates an instance of the Axios client with custom configurations.
baseURL: 'http://localhost:5000': Sets the base URL for all requests made with this instance to http://localhost:5000.
headers: { 'content-type': 'application/json' }: Sets the default request headers to include Content-Type: application/json.
paramsSerializer: (params) => queryString.stringify(params): Configures the paramsSerializer function to use queryString.stringify to serialize request parameters.
Request Interceptor:

axiosClient.interceptors.request.use(async (config) => { ... }): Adds a request interceptor to modify the config before sending the request.
This interceptor function allows you to perform actions on the request config, such as attaching authentication tokens or modifying headers.
In this example, the interceptor function is empty and returns the config as is.
Response Interceptor:

axiosClient.interceptors.response.use((response) => { ... }, (error) => { ... }): Adds a response interceptor to handle responses and errors.
The first callback function is called when a response is received and allows you to manipulate the response data before it is returned to the caller.
In this example, the function checks if the response has data and returns only the data property if available. Otherwise, it returns the entire response.
The second callback function is called when an error occurs in the request/response cycle. It throws the error to be handled by the caller.
Exporting the Axios Client:

export default axiosClient: Exports the configured Axios client as the default export of the module.
By using this axiosClient instance throughout your codebase, you can make HTTP requests with the predefined configurations, such as the base URL, default headers, and request/response interceptors.
*/