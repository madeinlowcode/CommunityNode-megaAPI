import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { megaapiRequest } from '../megaapiRequest';

export async function sendLocation(this: IExecuteFunctions, itemIndex: number): Promise<INodeExecutionData> {
	// Get credentials
	const credentials = await this.getCredentials('megaApiCredentialsApi');
	
	// Get parameters
	const instanceKey = credentials.instanceKey as string;
	const to = this.getNodeParameter('to', itemIndex) as string;
	const address = this.getNodeParameter('address', itemIndex) as string;
	const latitude = this.getNodeParameter('latitude', itemIndex) as number;
	const longitude = this.getNodeParameter('longitude', itemIndex) as number;
	const caption = this.getNodeParameter('caption', itemIndex, '') as string;
	
	console.log('🔐 MegaAPI Credentials loaded');
	console.log(`📋 Operation: sendLocation (item ${itemIndex + 1})`);
	console.log(`📱 Instance Key: ${instanceKey}`);
	console.log(`👤 To: ${to}`);
	console.log(`📍 Address: ${address}`);
	console.log(`🌐 Latitude: ${latitude}`);
	console.log(`🌐 Longitude: ${longitude}`);
	console.log(`💬 Caption: ${caption || 'No caption'}`);
	
	try {
		// Prepare the request body
		const requestBody = {
			messageData: {
				to: to,
				address: address,
				caption: caption,
				latitude: latitude,
				longitude: longitude,
			},
		};
		
		// Make the send location request
		const apiUrl = `/rest/sendMessage/${instanceKey}/location`;
		
		console.log(`🌐 Full URL: ${credentials.host}${apiUrl}`);
		console.log('📤 Request Options');
		console.log(`   Method: POST`);
		console.log(`   Authorization: Bearer ${(credentials.token as string)?.substring(0, 10)}...`);
		console.log(`   Content-Type: application/json`);
		console.log('📦 Request Body:', requestBody);
		
		console.log('📍 Sending location via MegaAPI...');
		
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
		
		console.log('✅ Location sent successfully', typeof messageData === 'string' ? messageData.substring(0, 50) + '...' : 'Object received');
		
		return {
			json: {
				success: true,
				operation: 'sendLocation',
				instanceKey,
				to,
				address,
				latitude,
				longitude,
				caption,
				message: 'Location sent successfully',
				data: messageData,
				timestamp: new Date().toISOString(),
			},
			pairedItem: { item: itemIndex },
		};
		
	} catch (error) {
		console.log('💥 Error in MegaAPI Send Location operation');
		console.log(error);
		
		throw error;
	}
}
