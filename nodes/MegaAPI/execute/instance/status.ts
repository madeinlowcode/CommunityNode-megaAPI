import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { megaapiRequest } from '../megaapiRequest';

export async function getInstanceStatus(this: IExecuteFunctions, itemIndex: number): Promise<INodeExecutionData> {
	// Get credentials
	const credentials = await this.getCredentials('megaApiCredentialsApi');
	
	// Get parameters
	const instanceKey = credentials.instanceKey as string;
	
	console.log('🔐 MegaAPI Credentials loaded');
	console.log(`📋 Operation: status (item ${itemIndex + 1})`);
	console.log(`📊 Instance Key: ${instanceKey}`);
	
	try {
		// Make the status request
		const url = `/rest/instance/${instanceKey}`;
		
		console.log(`🌐 Full URL: ${credentials.host}${url}`);
		console.log('📤 Request Options');
		console.log(`   Method: GET`);
		console.log(`   Authorization: Bearer ${(credentials.token as string)?.substring(0, 10)}...`);
		console.log(`   Content-Type: application/json`);
		
		console.log('📊 Getting instance status from MegaAPI...');
		
		const response = await megaapiRequest.call(this, 'GET', url, {});
		
		console.log('📥 Response received', typeof response === 'string' ? response.substring(0, 50) + '...' : response);
		
		// Process the response
		let statusData;
		if (typeof response === 'string') {
			try {
				statusData = JSON.parse(response);
			} catch {
				statusData = { message: response, status: 'unknown' };
			}
		} else {
			statusData = response;
		}
		
		console.log('✅ Instance status retrieved successfully', typeof statusData === 'string' ? statusData.substring(0, 50) + '...' : 'Object received');
		
		return {
			json: {
				success: true,
				operation: 'status',
				instanceKey,
				message: 'Instance status retrieved successfully',
				data: statusData,
				timestamp: new Date().toISOString(),
			},
			pairedItem: { item: itemIndex },
		};
		
	} catch (error) {
		console.log('💥 Error in MegaAPI Status operation');
		console.log(error);
		
		throw error;
	}
}
