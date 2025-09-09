import type { INodeProperties } from 'n8n-workflow';

export const quoteMessageProperties: INodeProperties[] = [
	{
		displayName: 'To (Contact)',
		name: 'to',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['quoteMessage'],
			},
		},
		default: '',
		placeholder: '551199999999@s.whatsapp.net',
		description: 'The WhatsApp contact to send the quoted message to. Format: phone_number@s.whatsapp.net (e.g., 551199999999@s.whatsapp.net).',
	},
	{
		displayName: 'Text',
		name: 'text',
		type: 'string',
		typeOptions: {
			rows: 4,
		},
		required: true,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['quoteMessage'],
			},
		},
		default: '',
		placeholder: 'Mensagem',
		description: 'The text message to send as a reply/quote to the original message',
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
				operation: ['quoteMessage'],
			},
		},
		default: `{
  "remoteJid": "551199999999@s.whatsapp.net",
  "fromMe": false,
  "id": "message_id_here"
}`,
		description: 'The message key object containing remoteJid, fromMe, and ID fields to identify the message to quote',
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
				operation: ['quoteMessage'],
			},
		},
		default: `{
  "conversation": "Original message content here",
  "messageTimestamp": "1234567890"
}`,
		description: 'The original message object containing the message content and metadata to quote',
	},
	{
		displayName: 'Information',
		name: 'information',
		type: 'notice',
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['quoteMessage'],
			},
		},
		default: '',
		description: '💬 This will send a text message as a reply/quote to an existing WhatsApp message. The original message will appear quoted above your new text. You need to provide the message key and message object from the original message (typically obtained from webhook events).',
	},
];
