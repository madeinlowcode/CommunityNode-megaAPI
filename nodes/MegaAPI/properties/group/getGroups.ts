import type { INodeProperties } from 'n8n-workflow';

export const getGroupsProperties: INodeProperties[] = [
	{
		displayName: 'Information',
		name: 'information',
		type: 'notice',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['getGroups'],
			},
		},
		default: '',
		description: '📋 This will retrieve a list of all groups that your WhatsApp instance is a member of. The response will include group details such as group ID, name, description, participants count, and other group metadata.',
	},
];
