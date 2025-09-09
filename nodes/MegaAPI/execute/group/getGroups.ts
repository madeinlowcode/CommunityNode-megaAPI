import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { megaapiRequest } from '../megaapiRequest';

export async function getGroups(this: IExecuteFunctions, itemIndex: number): Promise<INodeExecutionData> {
	// Get credentials
	const credentials = await this.getCredentials('megaApiCredentialsApi');
	
	// Get parameters
	const instanceKey = credentials.instanceKey as string;
	
	console.log('🔐 MegaAPI Credentials loaded');
	console.log(`📋 Operation: getGroups (item ${itemIndex + 1})`);
	console.log(`📱 Instance Key: ${instanceKey}`);
	
	try {
		// Make the get groups request
		const apiUrl = `/rest/group/list/${instanceKey}`;
		
		console.log(`🌐 Full URL: ${credentials.host}${apiUrl}`);
		console.log('📤 Request Options');
		console.log(`   Method: GET`);
		console.log(`   Authorization: Bearer ${(credentials.token as string)?.substring(0, 10)}...`);
		console.log(`   Content-Type: application/json`);
		
		console.log('📋 Fetching groups list from MegaAPI...');
		
		const response = await megaapiRequest.call(this, 'GET', apiUrl);
		
		console.log('📥 Response received', typeof response === 'string' ? response.substring(0, 50) + '...' : response);
		
		// Process the response
		let groupsData;
		if (typeof response === 'string') {
			try {
				groupsData = JSON.parse(response);
			} catch {
				groupsData = { message: response, status: 'unknown' };
			}
		} else {
			groupsData = response;
		}
		
		// Count groups if it's an array
		let groupCount = 0;
		if (Array.isArray(groupsData)) {
			groupCount = groupsData.length;
		} else if (groupsData && typeof groupsData === 'object' && groupsData.groups && Array.isArray(groupsData.groups)) {
			groupCount = groupsData.groups.length;
		}
		
		console.log(`✅ Groups list retrieved successfully. Found ${groupCount} groups.`);
		
		return {
			json: {
				success: true,
				operation: 'getGroups',
				instanceKey,
				groupCount,
				message: `Groups list retrieved successfully. Found ${groupCount} groups.`,
				data: groupsData,
				timestamp: new Date().toISOString(),
			},
			pairedItem: { item: itemIndex },
		};
		
	} catch (error) {
		console.log('💥 Error in MegaAPI Get Groups operation');
		console.log(error);
		
		throw error;
	}
}
