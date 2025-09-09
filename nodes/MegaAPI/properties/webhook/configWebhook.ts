import type { INodeProperties } from 'n8n-workflow';

export const configWebhookProperties: INodeProperties[] = [
	{
		displayName: 'Webhook URL',
		name: 'webhookUrl',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['configWebhook'],
			},
		},
		default: '',
		placeholder: 'https://your-webhook-url.com/webhook',
		description: 'The URL where webhook notifications will be sent',
	},
	{
		displayName: 'Webhook Enabled',
		name: 'webhookEnabled',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['configWebhook'],
			},
		},
		options: [
			{
				name: 'Enabled',
				value: true,
				description: 'Enable webhook notifications',
			},
			{
				name: 'Disabled',
				value: false,
				description: 'Disable webhook notifications',
			},
		],
		default: true,
		description: 'Whether to enable or disable webhook notifications',
	},
	{
		displayName: 'Information',
		name: 'information',
		type: 'notice',
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['configWebhook'],
			},
		},
		default: '',
		description: '⚙️ This will configure the webhook URL and enable/disable webhook notifications for your WhatsApp instance',
	},
];
