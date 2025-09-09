import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { megaapiRequest } from '../megaapiRequest';

export async function sendMessageGroup(this: IExecuteFunctions, itemIndex: number): Promise<INodeExecutionData> {
	// Get credentials
	const credentials = await this.getCredentials('megaApiCredentialsApi');
	
	// Get parameters
	const instanceKey = credentials.instanceKey as string;
	const groupJid = this.getNodeParameter('groupJid', itemIndex) as string;
	const messageText = this.getNodeParameter('messageText', itemIndex) as string;
	
	console.log('🔐 MegaAPI Credentials loaded');
	console.log(`📋 Operation: sendMessageGroup (item ${itemIndex + 1})`);
	console.log(`📱 Instance Key: ${instanceKey}`);
	console.log(`🏷️ Group JID: ${groupJid}`);
	console.log(`💬 Message Text: ${messageText.substring(0, 50)}${messageText.length > 50 ? '...' : ''}`);
	
	try {
		// Validate group JID format
		if (!groupJid || !groupJid.includes('@g.us')) {
			throw new NodeOperationError(this.getNode(), 'Group JID must be in format: group_id@g.us (e.g., 125485541258@g.us)', { itemIndex });
		}
		
		// Validate message text
		if (!messageText || messageText.trim().length === 0) {
			throw new NodeOperationError(this.getNode(), 'Message text is required and cannot be empty', { itemIndex });
		}
		
		// Prepare request body
		const requestBody = {
			messageData: {
				to: groupJid.trim(),
				text: messageText.trim()
			}
		};
		
		// Make the send message request
		const apiUrl = `/rest/sendMessage/${instanceKey}/text`;
		
		console.log(`🌐 Full URL: ${credentials.host}${apiUrl}`);
		console.log('📤 Request Options');
		console.log(`   Method: POST`);
		console.log(`   Authorization: Bearer ${(credentials.token as string)?.substring(0, 10)}...`);
		console.log(`   Content-Type: application/json`);
		console.log('📋 Request Body:', JSON.stringify(requestBody, null, 2));
		
		console.log('📋 Sending text message to WhatsApp group via MegaAPI...');
		
		const response = await megaapiRequest.call(this, 'POST', apiUrl, requestBody);
		
		console.log('📥 Response received', typeof response === 'string' ? response.substring(0, 50) + '...' : response);
		
		// Process the response
		let messageData;
		if (typeof response === 'string') {
			try {
				messageData = JSON.parse(response);
			} catch {
				messageData = { message: response, status: 'unknown' };
			}
		} else {
			messageData = response;
		}
		
		// Extract message information for logging
		let messageId = 'Unknown';
		let messageStatus = 'Unknown';
		let deliveryStatus = 'Unknown';
		
		if (messageData && typeof messageData === 'object') {
			if (messageData.key && messageData.key.id) {
				messageId = messageData.key.id;
			} else if (messageData.messageId || messageData.id) {
				messageId = messageData.messageId || messageData.id;
			}
			
			if (messageData.status) {
				messageStatus = messageData.status;
			}
			
			if (messageData.message && messageData.message.status) {
				deliveryStatus = messageData.message.status;
			}
		}
		
		console.log(`✅ Message sent to group successfully`);
		console.log(`   Group JID: ${groupJid}`);
		console.log(`   Message ID: ${messageId}`);
		console.log(`   Message Status: ${messageStatus}`);
		console.log(`   Delivery Status: ${deliveryStatus}`);
		console.log(`   Message Length: ${messageText.length} characters`);
		
		return {
			json: {
				success: true,
				operation: 'sendMessageGroup',
				instanceKey,
				groupJid,
				messageId,
				messageStatus,
				deliveryStatus,
				messageText: messageText.substring(0, 100) + (messageText.length > 100 ? '...' : ''),
				messageLength: messageText.length,
				message: `Text message sent successfully to group ${groupJid}`,
				data: messageData,
				timestamp: new Date().toISOString(),
			},
			pairedItem: { item: itemIndex },
		};
		
	} catch (error) {
		console.log('💥 Error in MegaAPI Send Message Group operation');
		console.log(error);
		
		throw error;
	}
}
