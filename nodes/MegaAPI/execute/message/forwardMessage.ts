import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { megaapiRequest } from '../megaapiRequest';

export async function forwardMessage(this: IExecuteFunctions, itemIndex: number): Promise<INodeExecutionData> {
	// Get credentials
	const credentials = await this.getCredentials('megaApiCredentialsApi');
	
	// Get parameters
	const instanceKey = credentials.instanceKey as string;
	const to = this.getNodeParameter('to', itemIndex) as string;
	const keyInput = this.getNodeParameter('key', itemIndex) as string | object;
	const messageInput = this.getNodeParameter('message', itemIndex) as string | object;
	
	console.log('🔐 MegaAPI Credentials loaded');
	console.log(`📋 Operation: forwardMessage (item ${itemIndex + 1})`);
	console.log(`📱 Instance Key: ${instanceKey}`);
	console.log(`👤 To: ${to}`);
	
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
		
		// Parse message if it's a string
		let message;
		if (typeof messageInput === 'string') {
			try {
				message = JSON.parse(messageInput);
			} catch (error) {
				throw new NodeOperationError(this.getNode(), `Invalid JSON format in message field: ${error}`, { itemIndex });
			}
		} else {
			message = messageInput;
		}
		
		// Validate key structure
		if (!key || typeof key !== 'object') {
			throw new NodeOperationError(this.getNode(), 'Key must be a valid object', { itemIndex });
		}
		
		if (!key.remoteJid || !key.hasOwnProperty('fromMe') || !key.id) {
			throw new NodeOperationError(this.getNode(), 'Key must contain remoteJid, fromMe, and id fields', { itemIndex });
		}
		
		// Validate message structure
		if (!message || typeof message !== 'object') {
			throw new NodeOperationError(this.getNode(), 'Message must be a valid object', { itemIndex });
		}
		
		console.log(`🔑 Key: remoteJid=${key.remoteJid}, fromMe=${key.fromMe}, id=${key.id}`);
		console.log(`💬 Message: ${JSON.stringify(message).substring(0, 100)}${JSON.stringify(message).length > 100 ? '...' : ''}`);
		
		// Prepare the request body
		const requestBody = {
			messageData: {
				to: to,
				key: key,
				message: message,
			},
		};
		
		// Make the forward message request
		const apiUrl = `/rest/sendMessage/${instanceKey}/forwardMessage`;
		
		console.log(`🌐 Full URL: ${credentials.host}${apiUrl}`);
		console.log('📤 Request Options');
		console.log(`   Method: POST`);
		console.log(`   Authorization: Bearer ${(credentials.token as string)?.substring(0, 10)}...`);
		console.log(`   Content-Type: application/json`);
		console.log('📦 Request Body:', JSON.stringify(requestBody, null, 2));
		
		console.log('↗️ Forwarding message via MegaAPI...');
		
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
		
		console.log('✅ Message forwarded successfully', typeof messageData === 'string' ? messageData.substring(0, 50) + '...' : 'Object received');
		
		return {
			json: {
				success: true,
				operation: 'forwardMessage',
				instanceKey,
				to,
				originalMessageId: key.id,
				originalRemoteJid: key.remoteJid,
				originalFromMe: key.fromMe,
				message: 'Message forwarded successfully',
				data: messageData,
				timestamp: new Date().toISOString(),
			},
			pairedItem: { item: itemIndex },
		};
		
	} catch (error) {
		console.log('💥 Error in MegaAPI Forward Message operation');
		console.log(error);
		
		throw error;
	}
}
