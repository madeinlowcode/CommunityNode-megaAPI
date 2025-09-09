import type { INodeProperties } from 'n8n-workflow';

export const presenceUpdateChatProperties: INodeProperties[] = [
	{
		displayName: 'To (Contact)',
		name: 'to',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['presenceUpdateChat'],
			},
		},
		default: '',
		placeholder: '551199999999@s.whatsapp.net',
		description: 'The WhatsApp contact number to update presence status. Format: phone number without @ (e.g., 556195562618).',
	},
	{
		displayName: 'Presence Option',
		name: 'option',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['presenceUpdateChat'],
			},
		},
		options: [
			{
				name: 'Composing...',
				value: 'composing',
				description: 'Show "typing..." status in the chat',
			},
			{
				name: 'Last Seen Today at...',
				value: 'unavailable',
				description: 'Show "last seen today at..." status',
			},
			{
				name: 'Online',
				value: 'available',
				description: 'Show "online" status',
			},
			{
				name: 'Pause Typing',
				value: 'pause',
				description: 'Pause the typing status',
			},
			{
				name: 'Recording Audio...',
				value: 'recording',
				description: 'Show "recording audio..." status in the chat',
			},
		],
		default: 'composing',
		description: 'The presence status to show in the chat',
	},
	{
		displayName: 'Information',
		name: 'information',
		type: 'notice',
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['presenceUpdateChat'],
			},
		},
		default: '👁️ This will update your presence status in the chat. The contact will see indicators like "typing...", "recording audio...", "online", etc. Use this to create more natural conversation flows in automated chats.',
		description: '👁️ This will update your presence status in the chat. The contact will see indicators like "typing...", "recording audio...", "online", etc. Use this to create more natural conversation flows in automated chats.',
	},
];
