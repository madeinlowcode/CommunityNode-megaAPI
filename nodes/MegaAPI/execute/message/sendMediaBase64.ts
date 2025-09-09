import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { megaapiRequest } from '../megaapiRequest';

export async function sendMediaBase64(this: IExecuteFunctions, itemIndex: number): Promise<INodeExecutionData> {
	// Get credentials
	const credentials = await this.getCredentials('megaApiCredentialsApi');
	
	// Get parameters
	const instanceKey = credentials.instanceKey as string;
	const to = this.getNodeParameter('to', itemIndex) as string;
	const base64 = this.getNodeParameter('base64', itemIndex) as string;
	const fileName = this.getNodeParameter('fileName', itemIndex) as string;
	const type = this.getNodeParameter('type', itemIndex) as string;
	const mimeType = this.getNodeParameter('mimeType', itemIndex) as string;
	const caption = this.getNodeParameter('caption', itemIndex, '') as string;
	
	console.log('🔐 MegaAPI Credentials loaded');
	console.log(`📋 Operation: sendMediaBase64 (item ${itemIndex + 1})`);
	console.log(`📱 Instance Key: ${instanceKey}`);
	console.log(`👤 To: ${to}`);
	console.log(`📄 File Name: ${fileName}`);
	console.log(`📎 Media Type: ${type}`);
	console.log(`🏷️ MIME Type: ${mimeType}`);
	console.log(`💬 Caption: ${caption || 'No caption'}`);
	console.log(`📊 Base64 Data: ${base64.substring(0, 50)}... (${base64.length} characters)`);
	
	try {
		// Prepare the request body
		const requestBody = {
			messageData: {
				to: to,
				base64: base64,
				fileName: fileName,
				type: type,
				caption: caption,
				mimeType: mimeType,
			},
		};
		
		// Make the send media base64 request
		const apiUrl = `/rest/sendMessage/${instanceKey}/mediaBase64`;
		
		console.log(`🌐 Full URL: ${credentials.host}${apiUrl}`);
		console.log('📤 Request Options');
		console.log(`   Method: POST`);
		console.log(`   Authorization: Bearer ${(credentials.token as string)?.substring(0, 10)}...`);
		console.log(`   Content-Type: application/json`);
		console.log('📦 Request Body (base64 truncated):', {
			messageData: {
				to: requestBody.messageData.to,
				base64: `${requestBody.messageData.base64.substring(0, 50)}... (${requestBody.messageData.base64.length} chars)`,
				fileName: requestBody.messageData.fileName,
				type: requestBody.messageData.type,
				caption: requestBody.messageData.caption,
				mimeType: requestBody.messageData.mimeType,
			},
		});
		
		console.log('📎 Sending media base64 via MegaAPI...');
		
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
		
		console.log('✅ Media base64 sent successfully', typeof messageData === 'string' ? messageData.substring(0, 50) + '...' : 'Object received');
		
		return {
			json: {
				success: true,
				operation: 'sendMediaBase64',
				instanceKey,
				to,
				fileName,
				type,
				mimeType,
				caption,
				base64Length: base64.length,
				message: 'Media base64 sent successfully',
				data: messageData,
				timestamp: new Date().toISOString(),
			},
			pairedItem: { item: itemIndex },
		};
		
	} catch (error) {
		console.log('💥 Error in MegaAPI Send Media Base64 operation');
		console.log(error);
		
		throw error;
	}
}
