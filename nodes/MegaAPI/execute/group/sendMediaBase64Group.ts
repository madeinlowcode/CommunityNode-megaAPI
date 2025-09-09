import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { megaapiRequest } from '../megaapiRequest';

export async function sendMediaBase64Group(this: IExecuteFunctions, itemIndex: number): Promise<INodeExecutionData> {
	// Get credentials
	const credentials = await this.getCredentials('megaApiCredentialsApi');
	
	// Get parameters
	const instanceKey = credentials.instanceKey as string;
	const groupJid = this.getNodeParameter('groupJid', itemIndex) as string;
	const base64Data = this.getNodeParameter('base64Data', itemIndex) as string;
	const fileName = this.getNodeParameter('fileName', itemIndex) as string;
	const mediaType = this.getNodeParameter('mediaType', itemIndex) as string;
	const mimeType = this.getNodeParameter('mimeType', itemIndex) as string;
	const caption = this.getNodeParameter('caption', itemIndex, '') as string;
	
	console.log('🔐 MegaAPI Credentials loaded');
	console.log(`📋 Operation: sendMediaBase64Group (item ${itemIndex + 1})`);
	console.log(`📱 Instance Key: ${instanceKey}`);
	console.log(`🏷️ Group JID: ${groupJid}`);
	console.log(`📄 File Name: ${fileName}`);
	console.log(`🎭 Media Type: ${mediaType}`);
	console.log(`🏷️ MIME Type: ${mimeType}`);
	console.log(`💬 Caption: ${caption || 'No caption'}`);
	console.log(`📊 Base64 Data Length: ${base64Data.length} characters`);
	
	try {
		// Validate group JID format
		if (!groupJid || !groupJid.includes('@g.us')) {
			throw new NodeOperationError(this.getNode(), 'Group JID must be in format: group_id@g.us (e.g., 123456789545@g.us)', { itemIndex });
		}
		
		// Validate base64 data
		if (!base64Data || base64Data.trim().length === 0) {
			throw new NodeOperationError(this.getNode(), 'Base64 data is required and cannot be empty', { itemIndex });
		}
		
		// Validate base64 format (should start with data: or be pure base64)
		const trimmedBase64 = base64Data.trim();
		if (!trimmedBase64.startsWith('data:') && !trimmedBase64.match(/^[A-Za-z0-9+/]+=*$/)) {
			throw new NodeOperationError(this.getNode(), 'Base64 data must be properly formatted. Use data URI format (data:image/png;base64,...) or pure base64 string', { itemIndex });
		}
		
		// Validate file name
		if (!fileName || fileName.trim().length === 0) {
			throw new NodeOperationError(this.getNode(), 'File name is required and cannot be empty', { itemIndex });
		}
		
		// Prepare request body
		const requestBody = {
			messageData: {
				to: groupJid.trim(),
				base64: trimmedBase64,
				fileName: fileName.trim(),
				type: mediaType,
				caption: caption.trim(),
				mimeType: mimeType
			}
		};
		
		// Make the send media base64 request
		const apiUrl = `/rest/sendMessage/${instanceKey}/mediaBase64`;
		
		console.log(`🌐 Full URL: ${credentials.host}${apiUrl}`);
		console.log('📤 Request Options');
		console.log(`   Method: POST`);
		console.log(`   Authorization: Bearer ${(credentials.token as string)?.substring(0, 10)}...`);
		console.log(`   Content-Type: application/json`);
		console.log('📋 Request Body (base64 truncated):', JSON.stringify({
			...requestBody,
			messageData: {
				...requestBody.messageData,
				base64: `${trimmedBase64.substring(0, 50)}... (${trimmedBase64.length} chars total)`
			}
		}, null, 2));
		
		console.log('📋 Sending media base64 to WhatsApp group via MegaAPI...');
		
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
		
		console.log(`✅ Media base64 sent to group successfully`);
		console.log(`   Group JID: ${groupJid}`);
		console.log(`   Message ID: ${messageId}`);
		console.log(`   Message Status: ${messageStatus}`);
		console.log(`   Delivery Status: ${deliveryStatus}`);
		console.log(`   Media Type: ${mediaType}`);
		console.log(`   File Name: ${fileName}`);
		console.log(`   MIME Type: ${mimeType}`);
		console.log(`   Base64 Length: ${base64Data.length} characters`);
		
		return {
			json: {
				success: true,
				operation: 'sendMediaBase64Group',
				instanceKey,
				groupJid,
				messageId,
				messageStatus,
				deliveryStatus,
				fileName,
				mediaType,
				mimeType,
				caption: caption || null,
				base64Length: base64Data.length,
				message: `Media base64 sent successfully to group ${groupJid}`,
				data: messageData,
				timestamp: new Date().toISOString(),
			},
			pairedItem: { item: itemIndex },
		};
		
	} catch (error) {
		console.log('💥 Error in MegaAPI Send Media Base64 Group operation');
		console.log(error);
		
		throw error;
	}
}
