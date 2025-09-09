import type { INodeProperties } from 'n8n-workflow';

export const sendMediaUrlGroupProperties: INodeProperties[] = [
	{
		displayName: 'Group JID',
		name: 'groupJid',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['sendMediaUrlGroup'],
			},
		},
		default: '',
		placeholder: '123456789545@g.us',
		description: 'The WhatsApp Group JID (Group ID) to send the media to. Format: group_id@g.us (e.g., 123456789545@g.us).',
	},
	{
		displayName: 'Media URL',
		name: 'mediaUrl',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['sendMediaUrlGroup'],
			},
		},
		default: '',
		placeholder: 'https://www.example.com/file.pdf',
		description: 'The URL of the media file to send to the WhatsApp group',
	},
	{
		displayName: 'File Name',
		name: 'fileName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['sendMediaUrlGroup'],
			},
		},
		default: '',
		placeholder: 'example.pdf',
		description: 'The name of the file as it will appear in WhatsApp',
	},
	{
		displayName: 'Media Type',
		name: 'mediaType',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['sendMediaUrlGroup'],
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
				description: 'Send as image (JPEG, PNG, etc.)',
			},
			{
				name: 'PTT (Voice Message)',
				value: 'ptt',
				description: 'Send as voice message (Push-to-Talk)',
			},
			{
				name: 'Video',
				value: 'video',
				description: 'Send as video file',
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
				resource: ['group'],
				operation: ['sendMediaUrlGroup'],
			},
		},
		options: [
			{
				name: 'Audio (OGG)',
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
				description: 'SQL script file format',
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
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['sendMediaUrlGroup'],
			},
		},
		default: '',
		placeholder: 'Optional caption for the media',
		description: 'Optional caption text to accompany the media file',
		typeOptions: {
			rows: 3,
		},
	},
	{
		displayName: 'Information',
		name: 'information',
		type: 'notice',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['sendMediaUrlGroup'],
			},
		},
		default: '',
		description: '📋 This will send a media file from a URL to a specific WhatsApp group. The response will include the message status, message ID, and delivery confirmation. Note: You must be a member of the group and the URL must be publicly accessible.',
	},
];
