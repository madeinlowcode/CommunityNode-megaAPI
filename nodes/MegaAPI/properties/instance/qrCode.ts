import type { INodeProperties } from 'n8n-workflow';

export const qrCodeProperties: INodeProperties[] = [
	{
		displayName: 'Informações',
		name: 'notice',
		type: 'notice',
		default: '',
		displayOptions: {
			show: {
				resource: ['instance'],
				operation: ['generateQrCode'],
			},
		},
		typeOptions: {
			theme: 'info',
		},
	},
];
