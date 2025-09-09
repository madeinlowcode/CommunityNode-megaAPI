import type { INodeProperties } from 'n8n-workflow';

export const logoutProperties: INodeProperties[] = [
	{
		displayName: 'Informações',
		name: 'notice',
		type: 'notice',
		default: '',
		displayOptions: {
			show: {
				resource: ['instance'],
				operation: ['logout'],
			},
		},
		typeOptions: {
			theme: 'warning',
		},
	},
];
