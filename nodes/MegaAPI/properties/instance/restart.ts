import type { INodeProperties } from 'n8n-workflow';

export const restartProperties: INodeProperties[] = [

	{
		displayName: 'Confirmation',
		name: 'confirmation',
		type: 'notice',
		displayOptions: {
			show: {
				resource: ['instance'],
				operation: ['restart'],
			},
		},
		default: '',
		description: '⚠️ This will restart your WhatsApp instance. All active connections will be terminated and the instance will need to reconnect.',
	},
];
