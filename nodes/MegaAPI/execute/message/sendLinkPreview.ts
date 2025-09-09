import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { megaapiRequest } from '../megaapiRequest';

export async function sendLinkPreview(this: IExecuteFunctions, itemIndex: number): Promise<INodeExecutionData> {
	// Get credentials
	const credentials = await this.getCredentials('megaApiCredentialsApi');
	
	// Get parameters
	const instanceKey = credentials.instanceKey as string;
	const to = this.getNodeParameter('to', itemIndex) as string;
	const textWithLink = this.getNodeParameter('textWithLink', itemIndex) as string;
	
	console.log('🔐 MegaAPI Credentials loaded');
	console.log(`📋 Operation: sendLinkPreview (item ${itemIndex + 1})`);
	console.log(`📱 Instance Key: ${instanceKey}`);
	console.log(`👤 To: ${to}`);
	console.log(`🔗 Text with Link: ${textWithLink.substring(0, 100)}${textWithLink.length > 100 ? '...' : ''}`);
	
	try {
		// Prepare the request body
		const requestBody = {
			messageData: {
				to: to,
				textWithLink: textWithLink,
			},
		};
		
		// Make the send link preview request
		const apiUrl = `/rest/sendMessage/${instanceKey}/sendLinkPreview`;
		
		console.log(`🌐 Full URL: ${credentials.host}${apiUrl}`);
		console.log('📤 Request Options');
		console.log(`   Method: POST`);
		console.log(`   Authorization: Bearer ${(credentials.token as string)?.substring(0, 10)}...`);
		console.log(`   Content-Type: application/json`);
		console.log('📦 Request Body:', requestBody);
		
		console.log('🔗 Sending link preview via MegaAPI...');
		
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
		
		console.log('✅ Link preview sent successfully', typeof messageData === 'string' ? messageData.substring(0, 50) + '...' : 'Object received');
		
		return {
			json: {
				success: true,
				operation: 'sendLinkPreview',
				instanceKey,
				to,
				textWithLink,
				message: 'Link preview sent successfully',
				data: messageData,
				timestamp: new Date().toISOString(),
			},
			pairedItem: { item: itemIndex },
		};
		
	} catch (error) {
		console.log('💥 Error in MegaAPI Send Link Preview operation');
		console.log(error);
		
		throw error;
	}
}
