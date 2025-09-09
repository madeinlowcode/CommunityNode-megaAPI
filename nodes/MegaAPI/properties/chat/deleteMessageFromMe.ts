import type { INodeProperties } from 'n8n-workflow';

export const deleteMessageFromMeProperties: INodeProperties[] = [
	{
		displayName: 'To (Contact)',
		name: 'to',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['deleteMessageFromMe'],
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
				operation: ['deleteMessageFromMe'],
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
		displayName: 'Message Timestamp',
		name: 'messageTimestamp',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['deleteMessageFromMe'],
			},
		},
		default: 0,
		placeholder: '1750604787',
		description: 'The timestamp of the message to delete (Unix timestamp in seconds)',
	},
	{
		displayName: 'Information',
		name: 'information',
		type: 'notice',
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['deleteMessageFromMe'],
			},
		},
		default: '',
		description: '🗑️ This will delete a specific message sent by you using the message key and timestamp. This operation is specifically for messages sent by your instance (fromMe: true). The timestamp helps identify the exact message to delete.',
	},
];
