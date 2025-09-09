import type { INodeProperties } from 'n8n-workflow';

export const leaveGroupProperties: INodeProperties[] = [
	{
		displayName: 'Group JID',
		name: 'groupJid',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['leaveGroup'],
			},
		},
		default: '',
		placeholder: '120363042979163716@g.us',
		description: 'The WhatsApp Group JID (Group ID) to leave. Format: group_id@g.us (e.g., 120363042979163716@g.us).',
	},
	{
		displayName: 'Information',
		name: 'information',
		type: 'notice',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['leaveGroup'],
			},
		},
		default: '',
		description: '📋 This will make your WhatsApp instance leave the specified group. The response will include the operation status. Note: Once you leave a group, you will need to be re-invited to join again.',
	},
];
