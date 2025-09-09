import type { INodeProperties } from 'n8n-workflow';

export const downloadMediaMessageProperties: INodeProperties[] = [

	{
		displayName: 'Media Key',
		name: 'mediaKey',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['instance'],
				operation: ['downloadMediaMessage'],
			},
		},
		default: '',
		description: 'The media key for the message',
	},
	{
		displayName: 'Direct Path',
		name: 'directPath',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['instance'],
				operation: ['downloadMediaMessage'],
			},
		},
		default: '',
		description: 'The direct path for the media',
	},
	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['instance'],
				operation: ['downloadMediaMessage'],
			},
		},
		default: '',
		description: 'The URL for the media',
	},
	{
		displayName: 'Mimetype',
		name: 'mimetype',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['instance'],
				operation: ['downloadMediaMessage'],
			},
		},
		default: '',
		description: 'The mimetype of the media (e.g., image/jpeg, audio/mp3, video/mp4, application/pdf)',
	},
	{
		displayName: 'Message Type',
		name: 'messageType',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['instance'],
				operation: ['downloadMediaMessage'],
			},
		},
		options: [
			{
				name: 'Image',
				value: 'image',
				description: 'Image file',
			},
			{
				name: 'Audio',
				value: 'audio',
				description: 'Audio file',
			},
			{
				name: 'Video',
				value: 'video',
				description: 'Video file',
			},
			{
				name: 'Document',
				value: 'document',
				description: 'Document file',
			},
		],
		default: 'image',
		description: 'The type of media message to download',
	},
	{
		displayName: 'Information',
		name: 'information',
		type: 'notice',
		displayOptions: {
			show: {
				resource: ['instance'],
				operation: ['downloadMediaMessage'],
			},
		},
		default: '',
		description: '📥 This will download media content from a WhatsApp message using the provided media keys and information',
	},
];
