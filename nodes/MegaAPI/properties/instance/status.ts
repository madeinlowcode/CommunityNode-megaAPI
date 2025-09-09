import type { INodeProperties } from 'n8n-workflow';

export const statusProperties: INodeProperties[] = [
	{
		displayName: 'Information',
		name: 'information',
		type: 'notice',
		displayOptions: {
			show: {
				resource: ['instance'],
				operation: ['status'],
			},
		},
		default: '',
		description: 'ℹ️ This will retrieve the current status and information of your WhatsApp instance',
	},
];
