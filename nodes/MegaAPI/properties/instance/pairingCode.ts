import type { INodeProperties } from 'n8n-workflow';

export const pairingCodeProperties: INodeProperties[] = [
	{
		displayName: 'Phone Number',
		name: 'phoneNumber',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['instance'],
				operation: ['generatePairingCode'],
			},
		},
		default: '',
		placeholder: '5561995562618',
		description: 'Phone number with country code (no + or spaces)',
	},
	{
		displayName: 'Informações',
		name: 'notice',
		type: 'notice',
		default: '',
		displayOptions: {
			show: {
				resource: ['instance'],
				operation: ['generatePairingCode'],
			},
		},
		typeOptions: {
			theme: 'info',
		},
	},
];
