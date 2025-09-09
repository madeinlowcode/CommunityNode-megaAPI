import type { INodeProperties } from 'n8n-workflow';

export const sendTextMessageProperties: INodeProperties[] = [
	{
		displayName: 'To (Contact)',
		name: 'to',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['sendTextMessage'],
			},
		},
		default: '',
		placeholder: '556195562618@s.whatsapp.net',
		description: 'The WhatsApp contact to send the message to. Format: phone_number@s.whatsapp.net (e.g., 556195562618@s.whatsapp.net).',
	},
	{
		displayName: 'Text Message',
		name: 'text',
		type: 'string',
		typeOptions: {
			rows: 4,
		},
		required: true,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['sendTextMessage'],
			},
		},
		default: '',
		placeholder: 'Hello! This is a test message.',
		description: 'The text message content to send',
	},
	{
		displayName: 'Information',
		name: 'information',
		type: 'notice',
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['sendTextMessage'],
			},
		},
		default: '',
		description: '💬 This will send a text message to the specified WhatsApp contact. Use the format: phone_number@s.whatsapp.net for the contact field.',
	},
];
