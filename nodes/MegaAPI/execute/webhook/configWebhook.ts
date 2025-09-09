import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { megaapiRequest } from '../megaapiRequest';

export async function configureWebhook(this: IExecuteFunctions, itemIndex: number): Promise<INodeExecutionData> {
	// Get credentials
	const credentials = await this.getCredentials('megaApiCredentialsApi');
	
	// Get parameters
	const instanceKey = credentials.instanceKey as string;
	const webhookUrl = this.getNodeParameter('webhookUrl', itemIndex) as string;
	const webhookEnabled = this.getNodeParameter('webhookEnabled', itemIndex) as boolean;
	
	console.log('🔐 MegaAPI Credentials loaded');
	console.log(`📋 Operation: configWebhook (item ${itemIndex + 1})`);
	console.log(`🔗 Instance Key: ${instanceKey}`);
	console.log(`🌐 Webhook URL: ${webhookUrl}`);
	console.log(`⚡ Webhook Enabled: ${webhookEnabled}`);
	
	try {
		// Prepare the request body
		const requestBody = {
			messageData: {
				webhookUrl: webhookUrl,
				webhookEnabled: webhookEnabled,
			},
		};
		
		// Make the config webhook request
		const url = `/rest/webhook/${instanceKey}/configWebhook`;
		
		console.log(`🌐 Full URL: ${credentials.host}${url}`);
		console.log('📤 Request Options');
		console.log(`   Method: POST`);
		console.log(`   Authorization: Bearer ${(credentials.token as string)?.substring(0, 10)}...`);
		console.log(`   Content-Type: application/json`);
		console.log('📦 Request Body:', requestBody);
		
		console.log('⚙️ Configuring webhook in MegaAPI...');
		
		const response = await megaapiRequest.call(this, 'POST', url, requestBody);
		
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
		
		console.log('✅ Webhook configuration completed successfully', typeof webhookData === 'string' ? webhookData.substring(0, 50) + '...' : 'Object received');
		
		return {
			json: {
				success: true,
				operation: 'configWebhook',
				instanceKey,
				webhookUrl,
				webhookEnabled,
				message: 'Webhook configuration completed successfully',
				data: webhookData,
				timestamp: new Date().toISOString(),
			},
			pairedItem: { item: itemIndex },
		};
		
	} catch (error) {
		console.log('💥 Error in MegaAPI Config Webhook operation');
		console.log(error);
		
		throw error;
	}
}
