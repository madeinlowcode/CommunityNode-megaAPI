import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { megaapiRequest } from '../megaapiRequest';

export async function checkIsOnWhatsapp(this: IExecuteFunctions, itemIndex: number): Promise<INodeExecutionData> {
	// Get credentials
	const credentials = await this.getCredentials('megaApiCredentialsApi');
	
	// Get parameters
	const instanceKey = credentials.instanceKey as string;
	const jid = this.getNodeParameter('jid', itemIndex) as string;
	
	console.log('🔐 MegaAPI Credentials loaded');
	console.log(`📋 Operation: isOnWhatsapp (item ${itemIndex + 1})`);
	console.log(`📱 Instance Key: ${instanceKey}`);
	console.log(`👤 Contact JID: ${jid}`);
	
	try {
		// Make the isOnWhatsapp request
		const url = `/rest/instance/isOnWhatsApp/${instanceKey}`;
		const queryParams = { jid };
		
		console.log(`🌐 Full URL: ${credentials.host}${url}`);
		console.log('📤 Request Options');
		console.log(`   Method: GET`);
		console.log(`   Authorization: Bearer ${(credentials.token as string)?.substring(0, 10)}...`);
		console.log(`   Content-Type: application/json`);
		console.log(`   Query Params:`, queryParams);
		
		console.log('🔍 Checking if contact is on WhatsApp...');
		
		const response = await megaapiRequest.call(this, 'GET', url, {}, queryParams);
		
		console.log('📥 Response received', typeof response === 'string' ? response.substring(0, 50) + '...' : response);
		
		// Process the response
		let whatsappData;
		if (typeof response === 'string') {
			try {
				whatsappData = JSON.parse(response);
			} catch {
				whatsappData = { message: response, status: 'unknown' };
			}
		} else {
			whatsappData = response;
		}
		
		console.log('✅ WhatsApp contact check completed successfully', typeof whatsappData === 'string' ? whatsappData.substring(0, 50) + '...' : 'Object received');
		
		return {
			json: {
				success: true,
				operation: 'isOnWhatsapp',
				instanceKey,
				contactJid: jid,
				message: 'WhatsApp contact check completed successfully',
				data: whatsappData,
				timestamp: new Date().toISOString(),
			},
			pairedItem: { item: itemIndex },
		};
		
	} catch (error) {
		console.log('💥 Error in MegaAPI isOnWhatsapp operation');
		console.log(error);
		
		throw error;
	}
}
