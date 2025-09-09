import type { INodeProperties } from 'n8n-workflow';

export const deleteMessageProperties: INodeProperties[] = [
	{
		displayName: 'To (Contact)',
		name: 'to',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['deleteMessage'],
			},
		},
		default: '',
		placeholder: '551199999999@s.whatsapp.net',
		description: 'The WhatsApp contact where the message should be deleted. Format: phone_number@s.whatsapp.net (e.g., 551199999999@s.whatsapp.net).',
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
				resource: ['chat'],
				operation: ['deleteMessage'],
			},
		},
		default: `{
  "remoteJid": "551199999999@s.whatsapp.net",
  "fromMe": true,
  "id": "message_id_here"
}`,
		description: 'The message key object containing remoteJid, fromMe, and ID fields to identify the message to delete',
	},
	{
		displayName: 'Information',
		name: 'information',
		type: 'notice',
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['deleteMessage'],
			},
		},
		default: '',
		description: '🗑️ This will delete a specific message from the chat. You need to provide the message key object (typically obtained from webhook events). Note: You can only delete messages that were sent by your instance (fromMe: true).',
	},
];
