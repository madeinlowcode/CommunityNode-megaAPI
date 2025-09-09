import type { INodeProperties } from 'n8n-workflow';

export const isOnWhatsappProperties: INodeProperties[] = [
	{
		displayName: 'Contact JID',
		name: 'jid',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['instance'],
				operation: ['isOnWhatsapp'],
			},
		},
		default: '',
		placeholder: '5511999999999@s.whatsapp.net',
		description: 'The WhatsApp JID (contact identifier) to check. Format: phone_number@s.whatsapp.net (e.g., 5511999999999@s.whatsapp.net).',
	},
	{
		displayName: 'Information',
		name: 'information',
		type: 'notice',
		displayOptions: {
			show: {
				resource: ['instance'],
				operation: ['isOnWhatsapp'],
			},
		},
		default: '',
		description: '🔍 This will check if a contact/phone number is registered on WhatsApp. Use the format: phone_number@s.whatsapp.net.',
	},
];
