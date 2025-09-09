import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { megaapiRequest } from '../megaapiRequest';

export async function detailsGroup(this: IExecuteFunctions, itemIndex: number): Promise<INodeExecutionData> {
	// Get credentials
	const credentials = await this.getCredentials('megaApiCredentialsApi');
	
	// Get parameters
	const instanceKey = credentials.instanceKey as string;
	const jid = this.getNodeParameter('jid', itemIndex) as string;
	
	console.log('🔐 MegaAPI Credentials loaded');
	console.log(`📋 Operation: detailsGroup (item ${itemIndex + 1})`);
	console.log(`📱 Instance Key: ${instanceKey}`);
	console.log(`🏷️ Group JID: ${jid}`);
	
	try {
		// Validate JID format
		if (!jid || !jid.includes('@g.us')) {
			throw new NodeOperationError(this.getNode(), 'Group JID must be in format: group_id@g.us (e.g., 12345678910@g.us)', { itemIndex });
		}
		
		// Make the get group details request
		const apiUrl = `/rest/group/${instanceKey}/group/?jid=${encodeURIComponent(jid)}`;
		
		console.log(`🌐 Full URL: ${credentials.host}${apiUrl}`);
		console.log('📤 Request Options');
		console.log(`   Method: GET`);
		console.log(`   Authorization: Bearer ${(credentials.token as string)?.substring(0, 10)}...`);
		console.log(`   Content-Type: application/json`);
		
		console.log('📋 Fetching group details from MegaAPI...');
		
		const response = await megaapiRequest.call(this, 'GET', apiUrl);
		
		console.log('📥 Response received', typeof response === 'string' ? response.substring(0, 50) + '...' : response);
		
		// Process the response
		let groupData;
		if (typeof response === 'string') {
			try {
				groupData = JSON.parse(response);
			} catch {
				groupData = { message: response, status: 'unknown' };
			}
		} else {
			groupData = response;
		}
		
		// Extract group information for logging
		let groupName = 'Unknown';
		let participantCount = 0;
		let isAdmin = false;
		
		if (groupData && typeof groupData === 'object') {
			if (groupData.subject || groupData.name) {
				groupName = groupData.subject || groupData.name;
			}
			if (groupData.participants && Array.isArray(groupData.participants)) {
				participantCount = groupData.participants.length;
			}
			if (groupData.participants && Array.isArray(groupData.participants)) {
				// Check if current instance is admin
				const currentInstanceJid = `${instanceKey}@s.whatsapp.net`;
				const adminParticipant = groupData.participants.find((p: any) => 
					p.id === currentInstanceJid && (p.admin === 'admin' || p.admin === 'superadmin')
				);
				isAdmin = !!adminParticipant;
			}
		}
		
		console.log(`✅ Group details retrieved successfully`);
		console.log(`   Group Name: ${groupName}`);
		console.log(`   Participants: ${participantCount}`);
		console.log(`   Is Admin: ${isAdmin}`);
		
		return {
			json: {
				success: true,
				operation: 'detailsGroup',
				instanceKey,
				groupJid: jid,
				groupName,
				participantCount,
				isAdmin,
				message: `Group details retrieved successfully for ${groupName}`,
				data: groupData,
				timestamp: new Date().toISOString(),
			},
			pairedItem: { item: itemIndex },
		};
		
	} catch (error) {
		console.log('💥 Error in MegaAPI Details Group operation');
		console.log(error);
		
		throw error;
	}
}
