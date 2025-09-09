import type { INodeProperties } from 'n8n-workflow';

export const sendMessageGroupProperties: INodeProperties[] = [
	{
		displayName: 'Group JID',
		name: 'groupJid',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['sendMessageGroup'],
			},
		},
		default: '',
		placeholder: '125485541258@g.us',
		description: 'The WhatsApp Group JID (Group ID) to send the message to. Format: group_id@g.us (e.g., 125485541258@g.us).',
	},
	{
		displayName: 'Message Text',
		name: 'messageText',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['sendMessageGroup'],
			},
		},
		default: '',
		placeholder: 'Mensagem de Texto',
		description: 'The text message to send to the WhatsApp group',
		typeOptions: {
			rows: 4,
		},
	},
	{
		displayName: 'Information',
		name: 'information',
		type: 'notice',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['sendMessageGroup'],
			},
		},
		default: '',
		description: '📋 This will send a text message to a specific WhatsApp group. The response will include the message status, message ID, and delivery confirmation. Note: You must be a member of the group to send messages.',
	},
];
