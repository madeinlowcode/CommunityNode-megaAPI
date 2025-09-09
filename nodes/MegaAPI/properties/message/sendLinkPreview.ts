import type { INodeProperties } from 'n8n-workflow';

export const sendLinkPreviewProperties: INodeProperties[] = [
	{
		displayName: 'To (Contact)',
		name: 'to',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['sendLinkPreview'],
			},
		},
		default: '',
		placeholder: '551199999999@s.whatsapp.net',
		description: 'The WhatsApp contact to send the link preview to. Format: phone_number@s.whatsapp.net (e.g., 551199999999@s.whatsapp.net).',
	},
	{
		displayName: 'Text with Link',
		name: 'textWithLink',
		type: 'string',
		typeOptions: {
			rows: 4,
		},
		required: true,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['sendLinkPreview'],
			},
		},
		default: '',
		placeholder: 'https://www.youtube.com/watch?v=dYZa4AclBsg',
		description: 'The text message containing the link. WhatsApp will automatically generate a preview for supported links (YouTube, websites, etc.).',
	},
	{
		displayName: 'Information',
		name: 'information',
		type: 'notice',
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['sendLinkPreview'],
			},
		},
		default: '',
		description: '🔗 This will send a message with a link that WhatsApp will automatically preview. Works with YouTube videos, websites, articles, and other supported link types. You can include additional text along with the link.',
	},
];
