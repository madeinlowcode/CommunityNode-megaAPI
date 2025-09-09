import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { megaapiRequest } from '../megaapiRequest';

export async function restartInstance(this: IExecuteFunctions, itemIndex: number): Promise<INodeExecutionData> {
	// Get credentials
	const credentials = await this.getCredentials('megaApiCredentialsApi');
	
	// Get parameters
	const instanceKey = credentials.instanceKey as string;
	
	console.log('🔐 MegaAPI Credentials loaded');
	console.log(`📋 Operation: restart (item ${itemIndex + 1})`);
	console.log(`🔄 Instance Key: ${instanceKey}`);
	
	try {
		// Make the restart request
		const url = `/rest/instance/${instanceKey}/restart`;
		
		console.log(`🌐 Full URL: ${credentials.host}${url}`);
		console.log('📤 Request Options');
		console.log(`   Method: DELETE`);
		console.log(`   Authorization: Bearer ${(credentials.token as string)?.substring(0, 10)}...`);
		console.log(`   Content-Type: application/json`);
		
		console.log('🔄 Making restart request to MegaAPI...');
		
		const response = await megaapiRequest.call(this, 'DELETE', url, {});
		
		console.log('📥 Response received', typeof response === 'string' ? response.substring(0, 50) + '...' : response);
		
		// Process the response
		let restartData;
		if (typeof response === 'string') {
			try {
				restartData = JSON.parse(response);
			} catch {
				restartData = { message: response, status: 'success' };
			}
		} else {
			restartData = response;
		}
		
		console.log('✅ Instance restart initiated successfully', typeof restartData === 'string' ? restartData.substring(0, 50) + '...' : 'Object received');
		
		return {
			json: {
				success: true,
				operation: 'restart',
				instanceKey,
				message: 'Instance restart initiated successfully',
				data: restartData,
				timestamp: new Date().toISOString(),
			},
			pairedItem: { item: itemIndex },
		};
		
	} catch (error) {
		console.log('💥 Error in MegaAPI Restart operation');
		console.log(error);
		
		throw error;
	}
}
