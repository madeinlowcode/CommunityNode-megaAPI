import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { megaapiRequest } from '../megaapiRequest';

export async function sendMediaUrlGroup(this: IExecuteFunctions, itemIndex: number): Promise<INodeExecutionData> {
	// Get credentials
	const credentials = await this.getCredentials('megaApiCredentialsApi');
	
	// Get parameters
	const instanceKey = credentials.instanceKey as string;
	const groupJid = this.getNodeParameter('groupJid', itemIndex) as string;
	const mediaUrl = this.getNodeParameter('mediaUrl', itemIndex) as string;
	const fileName = this.getNodeParameter('fileName', itemIndex) as string;
	const mediaType = this.getNodeParameter('mediaType', itemIndex) as string;
	const mimeType = this.getNodeParameter('mimeType', itemIndex) as string;
	const caption = this.getNodeParameter('caption', itemIndex, '') as string;
	
	console.log('🔐 MegaAPI Credentials loaded');
	console.log(`📋 Operation: sendMediaUrlGroup (item ${itemIndex + 1})`);
	console.log(`📱 Instance Key: ${instanceKey}`);
	console.log(`🏷️ Group JID: ${groupJid}`);
	console.log(`🔗 Media URL: ${mediaUrl}`);
	console.log(`📄 File Name: ${fileName}`);
	console.log(`🎭 Media Type: ${mediaType}`);
	console.log(`🏷️ MIME Type: ${mimeType}`);
	console.log(`💬 Caption: ${caption || 'No caption'}`);
	
	try {
		// Validate group JID format
		if (!groupJid || !groupJid.includes('@g.us')) {
			throw new NodeOperationError(this.getNode(), 'Group JID must be in format: group_id@g.us (e.g., 123456789545@g.us)', { itemIndex });
		}
		
		// Validate media URL
		if (!mediaUrl || mediaUrl.trim().length === 0) {
			throw new NodeOperationError(this.getNode(), 'Media URL is required and cannot be empty', { itemIndex });
		}
		
		// Validate URL format
		try {
			new URL(mediaUrl);
		} catch {
			throw new NodeOperationError(this.getNode(), 'Media URL must be a valid URL (e.g., https://example.com/file.pdf)', { itemIndex });
		}
		
		// Validate file name
		if (!fileName || fileName.trim().length === 0) {
			throw new NodeOperationError(this.getNode(), 'File name is required and cannot be empty', { itemIndex });
		}
		
		// Prepare request body
		const requestBody = {
			messageData: {
				to: groupJid.trim(),
				url: mediaUrl.trim(),
				fileName: fileName.trim(),
				type: mediaType,
				caption: caption.trim(),
				mimeType: mimeType
			}
		};
		
		// Make the send media URL request
		const apiUrl = `/rest/sendMessage/${instanceKey}/mediaUrl`;
		
		console.log(`🌐 Full URL: ${credentials.host}${apiUrl}`);
		console.log('📤 Request Options');
		console.log(`   Method: POST`);
		console.log(`   Authorization: Bearer ${(credentials.token as string)?.substring(0, 10)}...`);
		console.log(`   Content-Type: application/json`);
		console.log('📋 Request Body:', JSON.stringify(requestBody, null, 2));
		
		console.log('📋 Sending media URL to WhatsApp group via MegaAPI...');
		
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
		
		console.log(`✅ Media URL sent to group successfully`);
		console.log(`   Group JID: ${groupJid}`);
		console.log(`   Message ID: ${messageId}`);
		console.log(`   Message Status: ${messageStatus}`);
		console.log(`   Delivery Status: ${deliveryStatus}`);
		console.log(`   Media Type: ${mediaType}`);
		console.log(`   File Name: ${fileName}`);
		console.log(`   MIME Type: ${mimeType}`);
		
		return {
			json: {
				success: true,
				operation: 'sendMediaUrlGroup',
				instanceKey,
				groupJid,
				messageId,
				messageStatus,
				deliveryStatus,
				mediaUrl,
				fileName,
				mediaType,
				mimeType,
				caption: caption || null,
				message: `Media URL sent successfully to group ${groupJid}`,
				data: messageData,
				timestamp: new Date().toISOString(),
			},
			pairedItem: { item: itemIndex },
		};
		
	} catch (error) {
		console.log('💥 Error in MegaAPI Send Media URL Group operation');
		console.log(error);
		
		throw error;
	}
}
