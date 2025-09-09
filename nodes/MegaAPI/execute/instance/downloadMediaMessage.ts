import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { megaapiRequest } from '../megaapiRequest';

export async function downloadMediaMessage(this: IExecuteFunctions, itemIndex: number): Promise<INodeExecutionData> {
	// Get credentials
	const credentials = await this.getCredentials('megaApiCredentialsApi');
	
	// Get parameters
	const instanceKey = credentials.instanceKey as string;
	const mediaKey = this.getNodeParameter('mediaKey', itemIndex) as string;
	const directPath = this.getNodeParameter('directPath', itemIndex) as string;
	const url = this.getNodeParameter('url', itemIndex) as string;
	const mimetype = this.getNodeParameter('mimetype', itemIndex) as string;
	const messageType = this.getNodeParameter('messageType', itemIndex) as string;
	
	console.log('🔐 MegaAPI Credentials loaded');
	console.log(`📋 Operation: downloadMediaMessage (item ${itemIndex + 1})`);
	console.log(`📥 Instance Key: ${instanceKey}`);
	console.log(`🔑 Media Key: ${mediaKey?.substring(0, 20)}...`);
	console.log(`📂 Direct Path: ${directPath}`);
	console.log(`🌐 URL: ${url}`);
	console.log(`📄 Mimetype: ${mimetype}`);
	console.log(`📱 Message Type: ${messageType}`);
	
	try {
		// Prepare the request body
		const requestBody = {
			messageKeys: {
				mediaKey,
				directPath,
				url,
				mimetype,
				messageType,
			},
		};
		
		// Make the download media message request
		const requestUrl = `/rest/instance/downloadMediaMessage/${instanceKey}`;
		
		console.log(`🌐 Full URL: ${credentials.host}${requestUrl}`);
		console.log('📤 Request Options');
		console.log(`   Method: POST`);
		console.log(`   Authorization: Bearer ${(credentials.token as string)?.substring(0, 10)}...`);
		console.log(`   Content-Type: application/json`);
		console.log('📦 Request Body:', JSON.stringify(requestBody, null, 2));
		
		console.log('📥 Downloading media message from MegaAPI...');
		
		const response = await megaapiRequest.call(this, 'POST', requestUrl, requestBody);
		
		console.log('📥 Response received', typeof response === 'string' ? response.substring(0, 50) + '...' : response);
		
		// Process the response
		let mediaData;
		if (typeof response === 'string') {
			try {
				mediaData = JSON.parse(response);
			} catch {
				mediaData = { message: response, status: 'unknown' };
			}
		} else {
			mediaData = response;
		}
		
		console.log('✅ Media message downloaded successfully', typeof mediaData === 'string' ? mediaData.substring(0, 50) + '...' : 'Object received');
		
		return {
			json: {
				success: true,
				operation: 'downloadMediaMessage',
				instanceKey,
				messageType,
				mimetype,
				message: 'Media message downloaded successfully',
				data: mediaData,
				timestamp: new Date().toISOString(),
			},
			pairedItem: { item: itemIndex },
		};
		
	} catch (error) {
		console.log('💥 Error in MegaAPI Download Media Message operation');
		console.log(error);
		
		throw error;
	}
}
