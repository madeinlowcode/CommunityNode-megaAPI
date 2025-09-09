import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { megaapiRequest } from '../megaapiRequest';

export async function sendListMessage(this: IExecuteFunctions, itemIndex: number): Promise<INodeExecutionData> {
	// Get credentials
	const credentials = await this.getCredentials('megaApiCredentialsApi');
	
	// Get parameters
	const instanceKey = credentials.instanceKey as string;
	const to = this.getNodeParameter('to', itemIndex) as string;
	const buttonText = this.getNodeParameter('buttonText', itemIndex) as string;
	const text = this.getNodeParameter('text', itemIndex) as string;
	const title = this.getNodeParameter('title', itemIndex) as string;
	const description = this.getNodeParameter('description', itemIndex) as string;
	const sectionsInput = this.getNodeParameter('sections', itemIndex) as string | object;
	const listType = this.getNodeParameter('listType', itemIndex) as number;
	
	console.log('🔐 MegaAPI Credentials loaded');
	console.log(`📋 Operation: sendListMessage (item ${itemIndex + 1})`);
	console.log(`📱 Instance Key: ${instanceKey}`);
	console.log(`👤 To: ${to}`);
	console.log(`🔘 Button Text: ${buttonText}`);
	console.log(`💬 Text: ${text}`);
	console.log(`📝 Title: ${title}`);
	console.log(`📄 Description: ${description}`);
	console.log(`🔢 List Type: ${listType}`);
	
	try {
		// Parse sections if it's a string
		let sections;
		if (typeof sectionsInput === 'string') {
			try {
				sections = JSON.parse(sectionsInput);
			} catch (error) {
				throw new NodeOperationError(this.getNode(), `Invalid JSON format in sections field: ${error}`, { itemIndex });
			}
		} else {
			sections = sectionsInput;
		}
		
		// Validate sections structure
		if (!Array.isArray(sections)) {
			throw new NodeOperationError(this.getNode(), 'Sections must be an array', { itemIndex });
		}
		
		// Validate each section
		for (let i = 0; i < sections.length; i++) {
			const section = sections[i];
			if (!section.title || !section.rows || !Array.isArray(section.rows)) {
				throw new NodeOperationError(this.getNode(), `Section ${i + 1} must have 'title' and 'rows' array`, { itemIndex });
			}
			
			// Validate each row
			for (let j = 0; j < section.rows.length; j++) {
				const row = section.rows[j];
				if (!row.title || !row.description || !row.rowId) {
					throw new NodeOperationError(this.getNode(), `Row ${j + 1} in section ${i + 1} must have 'title', 'description', and 'rowId'`, { itemIndex });
				}
			}
		}
		
		console.log(`📋 Sections: ${sections.length} sections with ${sections.reduce((total: number, section: any) => total + section.rows.length, 0)} total rows`);
		
		// Prepare the request body
		const requestBody = {
			messageData: {
				to: to,
				buttonText: buttonText,
				text: text,
				title: title,
				description: description,
				sections: sections,
				listType: listType,
			},
		};
		
		// Make the send list message request
		const apiUrl = `/rest/sendMessage/${instanceKey}/listMessage`;
		
		console.log(`🌐 Full URL: ${credentials.host}${apiUrl}`);
		console.log('📤 Request Options');
		console.log(`   Method: POST`);
		console.log(`   Authorization: Bearer ${(credentials.token as string)?.substring(0, 10)}...`);
		console.log(`   Content-Type: application/json`);
		console.log('📦 Request Body:', JSON.stringify(requestBody, null, 2));
		
		console.log('📋 Sending list message via MegaAPI...');
		
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
		
		console.log('✅ List message sent successfully', typeof messageData === 'string' ? messageData.substring(0, 50) + '...' : 'Object received');
		
		return {
			json: {
				success: true,
				operation: 'sendListMessage',
				instanceKey,
				to,
				buttonText,
				text,
				title,
				description,
				sectionsCount: sections.length,
				totalRows: sections.reduce((total: number, section: any) => total + section.rows.length, 0),
				listType,
				message: 'List message sent successfully',
				data: messageData,
				timestamp: new Date().toISOString(),
			},
			pairedItem: { item: itemIndex },
		};
		
	} catch (error) {
		console.log('💥 Error in MegaAPI Send List Message operation');
		console.log(error);
		
		throw error;
	}
}
