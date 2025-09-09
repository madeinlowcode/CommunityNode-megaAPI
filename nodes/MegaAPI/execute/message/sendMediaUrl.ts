import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { megaapiRequest } from '../megaapiRequest';

export async function sendMediaUrl(this: IExecuteFunctions, itemIndex: number): Promise<INodeExecutionData> {
	// Get credentials
	const credentials = await this.getCredentials('megaApiCredentialsApi');
	
	// Get parameters
	const instanceKey = credentials.instanceKey as string;
	const to = this.getNodeParameter('to', itemIndex) as string;
	const url = this.getNodeParameter('url', itemIndex) as string;
	const fileName = this.getNodeParameter('fileName', itemIndex) as string;
	const type = this.getNodeParameter('type', itemIndex) as string;
	const mimeType = this.getNodeParameter('mimeType', itemIndex) as string;
	const caption = this.getNodeParameter('caption', itemIndex, '') as string;
	
	console.log('🔐 MegaAPI Credentials loaded');
	console.log(`📋 Operation: sendMediaUrl (item ${itemIndex + 1})`);
	console.log(`📱 Instance Key: ${instanceKey}`);
	console.log(`👤 To: ${to}`);
	console.log(`🌐 Media URL: ${url}`);
	console.log(`📄 File Name: ${fileName}`);
	console.log(`📎 Media Type: ${type}`);
	console.log(`🏷️ MIME Type: ${mimeType}`);
	console.log(`💬 Caption: ${caption || 'No caption'}`);
	
	try {
		// Prepare the request body
		const requestBody = {
			messageData: {
				to: to,
				url: url,
				fileName: fileName,
				type: type,
				caption: caption,
				mimeType: mimeType,
			},
		};
		
		// Make the send media URL request
		const apiUrl = `/rest/sendMessage/${instanceKey}/mediaUrl`;
		
		console.log(`🌐 Full URL: ${credentials.host}${apiUrl}`);
		console.log('📤 Request Options');
		console.log(`   Method: POST`);
		console.log(`   Authorization: Bearer ${(credentials.token as string)?.substring(0, 10)}...`);
		console.log(`   Content-Type: application/json`);
		console.log('📦 Request Body:', requestBody);
		
		console.log('📎 Sending media URL via MegaAPI...');
		
		const response = await megaapiRequest.call(this, 'POST', apiUrl, requestBody);
		
		console.log('📥 Response received', typeof response === 'string' ? response.substring(0, 50) + '...' : response);
		
		// Process the response
		let messageData;
		if (typeof response === 'string') {
			try {
				messageData = JSON.parse(response);
			} catch {
				messageData = { message: response, status: 'unknown' };
			}
		} else {
			messageData = response;
		}
		
		console.log('✅ Media URL sent successfully', typeof messageData === 'string' ? messageData.substring(0, 50) + '...' : 'Object received');
		
		return {
			json: {
				success: true,
				operation: 'sendMediaUrl',
				instanceKey,
				to,
				url,
				fileName,
				type,
				mimeType,
				caption,
				message: 'Media URL sent successfully',
				data: messageData,
				timestamp: new Date().toISOString(),
			},
			pairedItem: { item: itemIndex },
		};
		
	} catch (error) {
		console.log('💥 Error in MegaAPI Send Media URL operation');
		console.log(error);
		
		throw error;
	}
}
