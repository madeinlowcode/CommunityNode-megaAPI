import type { INodeProperties } from 'n8n-workflow';

export const addParticipantsProperties: INodeProperties[] = [
	{
		displayName: 'Group JID',
		name: 'groupJid',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['addParticipants'],
			},
		},
		default: '',
		placeholder: '120363360763649404@g.us',
		description: 'The WhatsApp Group JID (Group ID) to add participants to. Format: group_id@g.us (e.g., 120363360763649404@g.us).',
	},
	{
		displayName: 'Participants',
		name: 'participants',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['addParticipants'],
			},
		},
		default: '',
		placeholder: '551188888888@s.whatsapp.net, 552199999999@s.whatsapp.net',
		description: 'Phone numbers of participants to add to the group. Use format: 551188888888@s.whatsapp.net. Separate multiple participants with commas.',
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
				operation: ['addParticipants'],
			},
		},
		default: '',
		description: '📋 This will add participants to an existing WhatsApp group. The response will include the operation status and details about added participants. Note: You must be an admin of the group to add participants, and the participants must have WhatsApp accounts.',
	},
];
