import type { INodeProperties } from 'n8n-workflow';

export const forwardMessageProperties: INodeProperties[] = [
	{
		displayName: 'To (Contact)',
		name: 'to',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['forwardMessage'],
			},
		},
		default: '',
		placeholder: '551199999999@s.whatsapp.net',
		description: 'The WhatsApp contact to forward the message to. Format: phone_number@s.whatsapp.net (e.g., 551199999999@s.whatsapp.net).',
	},
	{
		displayName: 'Key (JSON)',
		name: 'key',
		type: 'json',
		typeOptions: {
			rows: 6,
		},
		required: true,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['forwardMessage'],
			},
		},
		default: `{
  "remoteJid": "551199999999@s.whatsapp.net",
  "fromMe": false,
  "id": "message_id_here"
}`,
		description: 'The message key object containing remoteJid, fromMe, and ID fields to identify the message to forward',
	},
	{
		displayName: 'Message (JSON)',
		name: 'message',
		type: 'json',
		typeOptions: {
			rows: 8,
		},
		required: true,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['forwardMessage'],
			},
		},
		default: `{
  "conversation": "Message content here",
  "messageTimestamp": "1234567890"
}`,
		description: 'The message object containing the message content and metadata to forward',
	},
	{
		displayName: 'Information',
		name: 'information',
		type: 'notice',
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['forwardMessage'],
			},
		},
		default: '',
		description: '↗️ This will forward an existing WhatsApp message to another contact. You need to provide the message key (to identify the original message) and the message object (containing the content). These are typically obtained from webhook events or message history.',
	},
];
