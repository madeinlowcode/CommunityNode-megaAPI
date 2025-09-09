import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { megaapiRequest } from '../megaapiRequest';

export async function deleteMessageFromMe(this: IExecuteFunctions, itemIndex: number): Promise<INodeExecutionData> {
	// Get credentials
	const credentials = await this.getCredentials('megaApiCredentialsApi');
	
	// Get parameters
	const instanceKey = credentials.instanceKey as string;
	const to = this.getNodeParameter('to', itemIndex) as string;
	const keyInput = this.getNodeParameter('key', itemIndex) as string | object;
	const messageTimestamp = this.getNodeParameter('messageTimestamp', itemIndex) as number;
	
	console.log('🔐 MegaAPI Credentials loaded');
	console.log(`📋 Operation: deleteMessageFromMe (item ${itemIndex + 1})`);
	console.log(`📱 Instance Key: ${instanceKey}`);
	console.log(`👤 To: ${to}`);
	console.log(`⏰ Message Timestamp: ${messageTimestamp}`);
	
	try {
		// Parse key if it's a string
		let key;
		if (typeof keyInput === 'string') {
			try {
				key = JSON.parse(keyInput);
			} catch (error) {
				throw new NodeOperationError(this.getNode(), `Invalid JSON format in key field: ${error}`, { itemIndex });
			}
		} else {
			key = keyInput;
		}
		
		// Validate key structure
		if (!key || typeof key !== 'object') {
			throw new NodeOperationError(this.getNode(), 'Key must be a valid object', { itemIndex });
		}
		
		if (!key.remoteJid || !key.hasOwnProperty('fromMe') || !key.id) {
			throw new NodeOperationError(this.getNode(), 'Key must contain remoteJid, fromMe, and id fields', { itemIndex });
		}
		
		// Validate timestamp
		if (!messageTimestamp || messageTimestamp <= 0) {
			throw new NodeOperationError(this.getNode(), 'Message timestamp must be a valid positive number', { itemIndex });
		}
		
		console.log(`🔑 Key: remoteJid=${key.remoteJid}, fromMe=${key.fromMe}, id=${key.id}`);
		
		// Check if message is from the current instance
		if (!key.fromMe) {
			console.log('⚠️ Warning: Attempting to delete message not sent by this instance (fromMe: false)');
		}
		
		// Convert timestamp to readable date for logging
		const messageDate = new Date(messageTimestamp * 1000).toISOString();
		console.log(`📅 Message Date: ${messageDate}`);
		
		// Prepare the request body
		const requestBody = {
			messageData: {
				to: to,
				key: key,
				messageTimestamp: messageTimestamp,
			},
		};
		
		// Make the delete message from me request
		const apiUrl = `/rest/chat/${instanceKey}/deleteMessageFromMe`;
		
		console.log(`🌐 Full URL: ${credentials.host}${apiUrl}`);
		console.log('📤 Request Options');
		console.log(`   Method: POST`);
		console.log(`   Authorization: Bearer ${(credentials.token as string)?.substring(0, 10)}...`);
		console.log(`   Content-Type: application/json`);
		console.log('📦 Request Body:', JSON.stringify(requestBody, null, 2));
		
		console.log('🗑️ Deleting message from me via MegaAPI...');
		
		const response = await megaapiRequest.call(this, 'POST', apiUrl, requestBody);
		
		console.log('📥 Response received', typeof response === 'string' ? response.substring(0, 50) + '...' : response);
		
		// Process the response
		let deleteData;
		if (typeof response === 'string') {
			try {
				deleteData = JSON.parse(response);
			} catch {
				deleteData = { message: response, status: 'unknown' };
			}
		} else {
			deleteData = response;
		}
		
		console.log('✅ Message deletion from me request sent successfully', typeof deleteData === 'string' ? deleteData.substring(0, 50) + '...' : 'Object received');
		
		return {
			json: {
				success: true,
				operation: 'deleteMessageFromMe',
				instanceKey,
				to,
				messageId: key.id,
				remoteJid: key.remoteJid,
				fromMe: key.fromMe,
				messageTimestamp,
				messageDate,
				message: 'Message deletion from me request sent successfully',
				data: deleteData,
				timestamp: new Date().toISOString(),
			},
			pairedItem: { item: itemIndex },
		};
		
	} catch (error) {
		console.log('💥 Error in MegaAPI Delete Message From Me operation');
		console.log(error);
		
		throw error;
	}
}
