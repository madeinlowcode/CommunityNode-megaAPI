import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { megaapiRequest } from '../megaapiRequest';

export async function getWebhookConfig(this: IExecuteFunctions, itemIndex: number): Promise<INodeExecutionData> {
	// Get credentials
	const credentials = await this.getCredentials('megaApiCredentialsApi');
	
	// Get parameters
	const instanceKey = credentials.instanceKey as string;
	
	console.log('🔐 MegaAPI Credentials loaded');
	console.log(`📋 Operation: getWebhook (item ${itemIndex + 1})`);
	console.log(`🔗 Instance Key: ${instanceKey}`);
	
	try {
		// Make the get webhook request
		const url = `/rest/webhook/${instanceKey}`;
		
		console.log(`🌐 Full URL: ${credentials.host}${url}`);
		console.log('📤 Request Options');
		console.log(`   Method: GET`);
		console.log(`   Authorization: Bearer ${(credentials.token as string)?.substring(0, 10)}...`);
		console.log(`   Content-Type: application/json`);
		
		console.log('🔗 Getting webhook configuration from MegaAPI...');
		
		const response = await megaapiRequest.call(this, 'GET', url, {});
		
		console.log('📥 Response received', typeof response === 'string' ? response.substring(0, 50) + '...' : response);
		
		// Process the response
		let webhookData;
		if (typeof response === 'string') {
			try {
				webhookData = JSON.parse(response);
			} catch {
				webhookData = { message: response, status: 'unknown' };
			}
		} else {
			webhookData = response;
		}
		
		console.log('✅ Webhook configuration retrieved successfully', typeof webhookData === 'string' ? webhookData.substring(0, 50) + '...' : 'Object received');
		
		return {
			json: {
				success: true,
				operation: 'getWebhook',
				instanceKey,
				message: 'Webhook configuration retrieved successfully',
				data: webhookData,
				timestamp: new Date().toISOString(),
			},
			pairedItem: { item: itemIndex },
		};
		
	} catch (error) {
		console.log('💥 Error in MegaAPI Get Webhook operation');
		console.log(error);
		
		throw error;
	}
}
