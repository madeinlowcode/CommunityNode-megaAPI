import type { INodeProperties } from 'n8n-workflow';

export const sendMediaUrlProperties: INodeProperties[] = [
	{
		displayName: 'To (Contact)',
		name: 'to',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['sendMediaUrl'],
			},
		},
		default: '',
		placeholder: '5511999999999@s.whatsapp.net',
		description: 'The WhatsApp contact to send the media to. Format: phone_number@s.whatsapp.net (e.g., 5511999999999@s.whatsapp.net).',
	},
	{
		displayName: 'Media URL',
		name: 'url',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['sendMediaUrl'],
			},
		},
		default: '',
		placeholder: 'https://www.example.com/file.pdf',
		description: 'The URL of the media file to send',
	},
	{
		displayName: 'File Name',
		name: 'fileName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['sendMediaUrl'],
			},
		},
		default: '',
		placeholder: 'example.pdf',
		description: 'The name of the file as it will appear in WhatsApp',
	},
	{
		displayName: 'Media Type',
		name: 'type',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['sendMediaUrl'],
			},
		},
		options: [
			{
				name: 'Audio',
				value: 'audio',
				description: 'Send as audio file',
			},
			{
				name: 'Document',
				value: 'document',
				description: 'Send as document (PDF, Word, Excel, etc.)',
			},
			{
				name: 'Image',
				value: 'image',
				description: 'Send as image',
			},
			{
				name: 'PTT (Voice Message)',
				value: 'ptt',
				description: 'Send as voice message (Push-to-Talk)',
			},
			{
				name: 'Video',
				value: 'video',
				description: 'Send as video',
			},
		],
		default: 'document',
		description: 'The type of media to send',
	},
	{
		displayName: 'MIME Type',
		name: 'mimeType',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['sendMediaUrl'],
			},
		},
		options: [
			{
				name: 'Audio/PTT (OGG)',
				value: 'audio/ogg; codecs=opus',
				description: 'OGG audio format with Opus codec',
			},
			{
				name: 'Binary/Other Files',
				value: 'application/octet-stream',
				description: 'Generic binary format (PHP, BIN, HTML, etc.)',
			},
			{
				name: 'Excel (XLSX)',
				value: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
				description: 'Excel spreadsheet format',
			},
			{
				name: 'Image (JPEG)',
				value: 'image/jpeg',
				description: 'JPEG image format',
			},
			{
				name: 'PDF Document',
				value: 'application/pdf',
				description: 'PDF document format',
			},
			{
				name: 'SQL File',
				value: 'application/x-sql',
				description: 'SQL script format',
			},
			{
				name: 'Video (MP4)',
				value: 'video/mp4',
				description: 'MP4 video format',
			},
			{
				name: 'Word Document',
				value: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
				description: 'Word document format',
			},
		],
		default: 'application/pdf',
		description: 'The MIME type of the media file',
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
				operation: ['sendMediaUrl'],
			},
		},
		default: '',
		placeholder: 'Optional caption for the media file',
		description: 'Optional caption text to accompany the media file',
	},
	{
		displayName: 'Information',
		name: 'information',
		type: 'notice',
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['sendMediaUrl'],
			},
		},
		default: '',
		description: '📎 This will send a media file from a URL to the specified WhatsApp contact. The file will be downloaded from the URL and sent as the specified media type.',
	},
];
