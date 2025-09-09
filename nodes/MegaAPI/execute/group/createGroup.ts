import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { megaapiRequest } from '../megaapiRequest';

export async function createGroup(this: IExecuteFunctions, itemIndex: number): Promise<INodeExecutionData> {
	// Get credentials
	const credentials = await this.getCredentials('megaApiCredentialsApi');
	
	// Get parameters
	const instanceKey = credentials.instanceKey as string;
	const groupName = this.getNodeParameter('groupName', itemIndex) as string;
	const participantsString = this.getNodeParameter('participants', itemIndex) as string;
	
	console.log('🔐 MegaAPI Credentials loaded');
	console.log(`📋 Operation: createGroup (item ${itemIndex + 1})`);
	console.log(`📱 Instance Key: ${instanceKey}`);
	console.log(`🏷️ Group Name: ${groupName}`);
	console.log(`👥 Participants String: ${participantsString}`);
	
	try {
		// Validate group name
		if (!groupName || groupName.trim().length === 0) {
			throw new NodeOperationError(this.getNode(), 'Group name is required and cannot be empty', { itemIndex });
		}
		
		// Validate and process participants
		if (!participantsString || participantsString.trim().length === 0) {
			throw new NodeOperationError(this.getNode(), 'At least one participant is required', { itemIndex });
		}
		
		// Parse participants from comma-separated string
		const participantsList = participantsString
			.split(',')
			.map(p => p.trim())
			.filter(p => p.length > 0);
		
		if (participantsList.length === 0) {
			throw new NodeOperationError(this.getNode(), 'At least one valid participant is required', { itemIndex });
		}
		
		// Validate participant format
		const invalidParticipants = participantsList.filter(p => !p.includes('@s.whatsapp.net'));
		if (invalidParticipants.length > 0) {
			throw new NodeOperationError(this.getNode(), `Invalid participant format: ${invalidParticipants.join(', ')}. Use format: 551199999999@s.whatsapp.net`, { itemIndex });
		}
		
		console.log(`👥 Processed Participants (${participantsList.length}):`);
		participantsList.forEach((participant, index) => {
			console.log(`   ${index + 1}. ${participant}`);
		});
		
		// Prepare request body
		const requestBody = {
			group_data: {
				group_name: groupName.trim(),
				participants: participantsList
			}
		};
		
		// Make the create group request
		const apiUrl = `/rest/group/${instanceKey}/create`;
		
		console.log(`🌐 Full URL: ${credentials.host}${apiUrl}`);
		console.log('📤 Request Options');
		console.log(`   Method: POST`);
		console.log(`   Authorization: Bearer ${(credentials.token as string)?.substring(0, 10)}...`);
		console.log(`   Content-Type: text/plain`);
		console.log('📋 Request Body:', JSON.stringify(requestBody, null, 2));
		
		console.log('📋 Creating WhatsApp group via MegaAPI...');
		
		const response = await megaapiRequest.call(this, 'POST', apiUrl, requestBody, {
			'Content-Type': 'text/plain'
		});
		
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
		let groupJid = 'Unknown';
		let createdGroupName = groupName;
		let actualParticipantCount = participantsList.length;
		
		if (groupData && typeof groupData === 'object') {
			if (groupData.jid || groupData.id || groupData.groupJid) {
				groupJid = groupData.jid || groupData.id || groupData.groupJid;
			}
			if (groupData.subject || groupData.name || groupData.group_name) {
				createdGroupName = groupData.subject || groupData.name || groupData.group_name;
			}
			if (groupData.participants && Array.isArray(groupData.participants)) {
				actualParticipantCount = groupData.participants.length;
			}
		}
		
		console.log(`✅ Group created successfully`);
		console.log(`   Group JID: ${groupJid}`);
		console.log(`   Group Name: ${createdGroupName}`);
		console.log(`   Participants Added: ${actualParticipantCount}`);
		
		return {
			json: {
				success: true,
				operation: 'createGroup',
				instanceKey,
				groupJid,
				groupName: createdGroupName,
				participantCount: actualParticipantCount,
				requestedParticipants: participantsList,
				message: `Group "${createdGroupName}" created successfully with ${actualParticipantCount} participants`,
				data: groupData,
				timestamp: new Date().toISOString(),
			},
			pairedItem: { item: itemIndex },
		};
		
	} catch (error) {
		console.log('💥 Error in MegaAPI Create Group operation');
		console.log(error);
		
		throw error;
	}
}
