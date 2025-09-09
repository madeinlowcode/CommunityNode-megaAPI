import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { megaapiRequest } from '../megaapiRequest';

export async function leaveGroup(this: IExecuteFunctions, itemIndex: number): Promise<INodeExecutionData> {
	// Get credentials
	const credentials = await this.getCredentials('megaApiCredentialsApi');
	
	// Get parameters
	const instanceKey = credentials.instanceKey as string;
	const groupJid = this.getNodeParameter('groupJid', itemIndex) as string;
	
	console.log('🔐 MegaAPI Credentials loaded');
	console.log(`📋 Operation: leaveGroup (item ${itemIndex + 1})`);
	console.log(`📱 Instance Key: ${instanceKey}`);
	console.log(`🏷️ Group JID: ${groupJid}`);
	
	try {
		// Validate group JID format
		if (!groupJid || !groupJid.includes('@g.us')) {
			throw new NodeOperationError(this.getNode(), 'Group JID must be in format: group_id@g.us (e.g., 120363042979163716@g.us)', { itemIndex });
		}
		
		// Make the leave group request
		const apiUrl = `/rest/group/${instanceKey}/leaveGroup`;
		const queryParams = {
			jid: groupJid.trim()
		};
		
		console.log(`🌐 Full URL: ${credentials.host}${apiUrl}`);
		console.log('📤 Request Options');
		console.log(`   Method: DELETE`);
		console.log(`   Authorization: Bearer ${(credentials.token as string)?.substring(0, 10)}...`);
		console.log(`   Content-Type: application/json`);
		console.log('📋 Query Parameters:', JSON.stringify(queryParams, null, 2));
		
		console.log('📋 Leaving WhatsApp group via MegaAPI...');
		
		const response = await megaapiRequest.call(this, 'DELETE', apiUrl, {}, queryParams);
		
		console.log('📥 Response received', typeof response === 'string' ? response.substring(0, 50) + '...' : response);
		
		// Process the response
		let responseData;
		if (typeof response === 'string') {
			try {
				responseData = JSON.parse(response);
			} catch {
				responseData = { message: response, status: 'unknown' };
			}
		} else {
			responseData = response;
		}
		
		// Extract operation information for logging
		let operationStatus = 'Unknown';
		let operationMessage = 'Unknown';
		
		if (responseData && typeof responseData === 'object') {
			if (responseData.error === false || responseData.success === true) {
				operationStatus = 'Success';
			} else if (responseData.error === true) {
				operationStatus = 'Error';
			}
			
			if (responseData.message) {
				operationMessage = responseData.message;
			}
		}
		
		console.log(`✅ Leave group operation completed`);
		console.log(`   Group JID: ${groupJid}`);
		console.log(`   Operation Status: ${operationStatus}`);
		console.log(`   Operation Message: ${operationMessage}`);
		
		return {
			json: {
				success: operationStatus === 'Success',
				operation: 'leaveGroup',
				instanceKey,
				groupJid,
				operationStatus,
				operationMessage,
				message: `Leave group operation completed for group ${groupJid}`,
				data: responseData,
				timestamp: new Date().toISOString(),
			},
			pairedItem: { item: itemIndex },
		};
		
	} catch (error) {
		console.log('💥 Error in MegaAPI Leave Group operation');
		console.log(error);
		
		throw error;
	}
}
