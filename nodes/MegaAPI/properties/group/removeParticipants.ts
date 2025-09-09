import type { INodeProperties } from 'n8n-workflow';

export const removeParticipantsProperties: INodeProperties[] = [
	{
		displayName: 'Group JID',
		name: 'groupJid',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['removeParticipants'],
			},
		},
		default: '',
		placeholder: '120363041490582303@g.us',
		description: 'The WhatsApp Group JID (Group ID) to remove participants from. Format: group_id@g.us (e.g., 120363041490582303@g.us).',
	},
	{
		displayName: 'Participants',
		name: 'participants',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['removeParticipants'],
			},
		},
		default: '',
		placeholder: '551188888888@s.whatsapp.net, 552199999999@s.whatsapp.net',
		description: 'Phone numbers of participants to remove from the group. Use format: 551188888888@s.whatsapp.net. Separate multiple participants with commas.',
		typeOptions: {
			rows: 3,
		},
	},
	{
		displayName: 'Information',
		name: 'information',
		type: 'notice',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['removeParticipants'],
			},
		},
		default: '',
		description: '📋 This will remove participants from an existing WhatsApp group. The response will include the operation status and details about removed participants. Note: You must be an admin of the group to remove participants.',
	},
];
