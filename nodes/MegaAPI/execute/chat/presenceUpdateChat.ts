import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { megaapiRequest } from '../megaapiRequest';

export async function presenceUpdateChat(this: IExecuteFunctions, itemIndex: number): Promise<INodeExecutionData> {
	// Get credentials
	const credentials = await this.getCredentials('megaApiCredentialsApi');
	
	// Get parameters
	const instanceKey = credentials.instanceKey as string;
	const to = this.getNodeParameter('to', itemIndex) as string;
	const option = this.getNodeParameter('option', itemIndex) as string;
	
	console.log('🔐 MegaAPI Credentials loaded');
	console.log(`📋 Operation: presenceUpdateChat (item ${itemIndex + 1})`);
	console.log(`📱 Instance Key: ${instanceKey}`);
	console.log(`👤 To: ${to}`);
	console.log(`👁️ Presence Option: ${option}`);
	
	// Map option to description for logging
	const optionDescriptions: { [key: string]: string } = {
		'composing': 'Digitando...',
		'recording': 'Gravando áudio...',
		'available': 'Online',
		'unavailable': 'Visto por último hoje às...',
		'pause': 'Pausa o digitando'
	};
	
	console.log(`📝 Presence Description: ${optionDescriptions[option] || option}`);
	
	try {
		// Prepare the request body
		const requestBody = {
			to: to,
			option: option,
		};
		
		// Make the presence update request
		const apiUrl = `/rest/chat/${instanceKey}/presenceUpdateChat`;
		
		console.log(`🌐 Full URL: ${credentials.host}${apiUrl}`);
		console.log('📤 Request Options');
		console.log(`   Method: POST`);
		console.log(`   Authorization: Bearer ${(credentials.token as string)?.substring(0, 10)}...`);
		console.log(`   Content-Type: application/json`);
		console.log('📦 Request Body:', JSON.stringify(requestBody, null, 2));
		
		console.log('👁️ Updating presence status via MegaAPI...');
		
		const response = await megaapiRequest.call(this, 'POST', apiUrl, requestBody);
		
		console.log('📥 Response received', typeof response === 'string' ? response.substring(0, 50) + '...' : response);
		
		// Process the response
		let presenceData;
		if (typeof response === 'string') {
			try {
				presenceData = JSON.parse(response);
			} catch {
				presenceData = { message: response, status: 'unknown' };
			}
		} else {
			presenceData = response;
		}
		
		console.log('✅ Presence status updated successfully', typeof presenceData === 'string' ? presenceData.substring(0, 50) + '...' : 'Object received');
		
		return {
			json: {
				success: true,
				operation: 'presenceUpdateChat',
				instanceKey,
				to,
				option,
				optionDescription: optionDescriptions[option] || option,
				message: 'Presence status updated successfully',
				data: presenceData,
				timestamp: new Date().toISOString(),
			},
			pairedItem: { item: itemIndex },
		};
		
	} catch (error) {
		console.log('💥 Error in MegaAPI Presence Update Chat operation');
		console.log(error);
		
		throw error;
	}
}
