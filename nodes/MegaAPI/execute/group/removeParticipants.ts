import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { megaapiRequest } from '../megaapiRequest';

export async function removeParticipants(this: IExecuteFunctions, itemIndex: number): Promise<INodeExecutionData> {
	// Get credentials
	const credentials = await this.getCredentials('megaApiCredentialsApi');
	
	// Get parameters
	const instanceKey = credentials.instanceKey as string;
	const groupJid = this.getNodeParameter('groupJid', itemIndex) as string;
	const participantsString = this.getNodeParameter('participants', itemIndex) as string;
	
	console.log('🔐 MegaAPI Credentials loaded');
	console.log(`📋 Operation: removeParticipants (item ${itemIndex + 1})`);
	console.log(`📱 Instance Key: ${instanceKey}`);
	console.log(`🏷️ Group JID: ${groupJid}`);
	console.log(`👥 Participants String: ${participantsString}`);
	
	try {
		// Validate group JID format
		if (!groupJid || !groupJid.includes('@g.us')) {
			throw new NodeOperationError(this.getNode(), 'Group JID must be in format: group_id@g.us (e.g., 120363041490582303@g.us)', { itemIndex });
		}
		
		// Validate participants
		if (!participantsString || participantsString.trim().length === 0) {
			throw new NodeOperationError(this.getNode(), 'Participants list is required and cannot be empty', { itemIndex });
		}
		
		// Process participants list
		const participantsList = participantsString
			.split(',')
			.map(participant => participant.trim())
			.filter(participant => participant.length > 0);
		
		if (participantsList.length === 0) {
			throw new NodeOperationError(this.getNode(), 'At least one valid participant is required', { itemIndex });
		}
		
		// Validate participant format
		const validParticipants: string[] = [];
		for (const participant of participantsList) {
			if (!participant.includes('@s.whatsapp.net')) {
				throw new NodeOperationError(this.getNode(), `Invalid participant format: ${participant}. Use format: 551188888888@s.whatsapp.net`, { itemIndex });
			}
			validParticipants.push(participant);
		}
		
		console.log(`👥 Processed Participants (${validParticipants.length}):`);
		validParticipants.forEach((participant, index) => {
			console.log(`   ${index + 1}. ${participant}`);
		});
		
		// Prepare request body
		const requestBody = {
			group_data: {
				jid: groupJid.trim(),
				participants: validParticipants
			}
		};
		
		// Make the remove participants request
		const apiUrl = `/rest/group/${instanceKey}/removeParticipants`;
		
		console.log(`🌐 Full URL: ${credentials.host}${apiUrl}`);
		console.log('📤 Request Options');
		console.log(`   Method: POST`);
		console.log(`   Authorization: Bearer ${(credentials.token as string)?.substring(0, 10)}...`);
		console.log(`   Content-Type: text/plain`);
		console.log('📋 Request Body:', JSON.stringify(requestBody, null, 2));
		
		console.log('📋 Removing participants from WhatsApp group via MegaAPI...');
		
		// Note: The API expects Content-Type: text/plain but we send JSON body
		const response = await megaapiRequest.call(this, 'POST', apiUrl, requestBody, {
			'Content-Type': 'text/plain'
		});
		
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
		let removedCount = 0;
		let failedCount = 0;
		
		if (responseData && typeof responseData === 'object') {
			if (responseData.error === false || responseData.success === true) {
				operationStatus = 'Success';
			} else if (responseData.error === true) {
				operationStatus = 'Error';
			}
			
			// Count removed and failed participants
			if (responseData.participants) {
				removedCount = responseData.participants.filter((p: any) => p.status === 'removed' || p.removed === true).length;
				failedCount = responseData.participants.filter((p: any) => p.status === 'failed' || p.removed === false).length;
			} else {
				// If no detailed info, assume all were processed
				removedCount = validParticipants.length;
			}
		}
		
		console.log(`✅ Remove participants operation completed`);
		console.log(`   Group JID: ${groupJid}`);
		console.log(`   Operation Status: ${operationStatus}`);
		console.log(`   Participants Requested: ${validParticipants.length}`);
		console.log(`   Participants Removed: ${removedCount}`);
		console.log(`   Participants Failed: ${failedCount}`);
		
		return {
			json: {
				success: operationStatus === 'Success',
				operation: 'removeParticipants',
				instanceKey,
				groupJid,
				operationStatus,
				participantsRequested: validParticipants.length,
				participantsRemoved: removedCount,
				participantsFailed: failedCount,
				participants: validParticipants,
				message: `Remove participants operation completed for group ${groupJid}`,
				data: responseData,
				timestamp: new Date().toISOString(),
			},
			pairedItem: { item: itemIndex },
		};
		
	} catch (error) {
		console.log('💥 Error in MegaAPI Remove Participants operation');
		console.log(error);
		
		throw error;
	}
}
