import type { INodeProperties } from 'n8n-workflow';

export const detailsGroupProperties: INodeProperties[] = [
	{
		displayName: 'Group JID',
		name: 'jid',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['detailsGroup'],
			},
		},
		default: '',
		placeholder: '12345678910@g.us',
		description: 'The WhatsApp Group JID (Group ID) to get details for. Format: group_id@g.us (e.g., 12345678910@g.us).',
	},
	{
		displayName: 'Information',
		name: 'information',
		type: 'notice',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['detailsGroup'],
			},
		},
		default: '',
		description: '📋 This will retrieve detailed information about a specific WhatsApp group. The response will include group metadata such as name, description, participants list, admin status, creation date, and other group settings.',
	},
];
