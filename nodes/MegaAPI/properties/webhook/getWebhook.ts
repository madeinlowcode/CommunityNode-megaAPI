import type { INodeProperties } from 'n8n-workflow';

export const getWebhookProperties: INodeProperties[] = [
	{
		displayName: 'Information',
		name: 'information',
		type: 'notice',
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['getWebhook'],
			},
		},
		default: '',
		description: '🔗 This will retrieve the current webhook configuration for your WhatsApp instance',
	},
];
