import type {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestMethods,
	IRequestOptions,
} from 'n8n-workflow';

export async function megaapiRequest(
	this: IExecuteFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
	customHeaders: IDataObject = {},
): Promise<any> {
	const credentials = await this.getCredentials('megaApiCredentialsApi');

	const defaultHeaders = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${credentials.token}`,
	};

	const options: IRequestOptions = {
		method,
		body,
		qs,
		url: `${credentials.host}${endpoint}`,
		headers: {
			...defaultHeaders,
			...customHeaders,
		},
		json: true,
	};

	// Log da URL construída para debug
	this.logger.info(`[MegaAPI] Request URL: ${options.url}`);
	this.logger.info(`[MegaAPI] Method: ${method}`);
	this.logger.info(`[MegaAPI] Body:`, body);
	this.logger.info(`[MegaAPI] Query params:`, qs);

	try {
		const response = await this.helpers.request(options);
		this.logger.info(`[MegaAPI] Response:`, response);
		return response;
	} catch (error) {
		this.logger.error(`[MegaAPI] Error:`, error);
		throw error;
	}
}
