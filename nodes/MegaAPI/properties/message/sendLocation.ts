import type { INodeProperties } from 'n8n-workflow';

export const sendLocationProperties: INodeProperties[] = [
	{
		displayName: 'To (Contact)',
		name: 'to',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['sendLocation'],
			},
		},
		default: '',
		placeholder: '551199999999@s.whatsapp.net',
		description: 'The WhatsApp contact to send the location to. Format: phone_number@s.whatsapp.net (e.g., 551199999999@s.whatsapp.net).',
	},
	{
		displayName: 'Address',
		name: 'address',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['sendLocation'],
			},
		},
		default: '',
		placeholder: 'QD 04 Lote 25',
		description: 'The address or location description',
	},
	{
		displayName: 'Latitude',
		name: 'latitude',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['sendLocation'],
			},
		},
		default: 0,
		placeholder: '157470795',
		description: 'The latitude coordinate of the location (can be in decimal format like -15.7470795 or integer format like 157470795)',
	},
	{
		displayName: 'Longitude',
		name: 'longitude',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['sendLocation'],
			},
		},
		default: 0,
		placeholder: '482982315',
		description: 'The longitude coordinate of the location (can be in decimal format like -48.2982315 or integer format like 482982315)',
	},
	{
		displayName: 'Caption',
		name: 'caption',
		type: 'string',
		typeOptions: {
			rows: 3,
		},
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['sendLocation'],
			},
		},
		default: '',
		placeholder: 'Escola classe',
		description: 'Optional caption text to accompany the location',
	},
	{
		displayName: 'Information',
		name: 'information',
		type: 'notice',
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['sendLocation'],
			},
		},
		default: '',
		description: '📍 This will send a location message to the specified WhatsApp contact. You can use decimal coordinates (e.g., -15.7470795) or integer format (e.g., 157470795).',
	},
];
