import type { INodeProperties } from 'n8n-workflow';

export const createGroupProperties: INodeProperties[] = [
	{
		displayName: 'Group Name',
		name: 'groupName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['createGroup'],
			},
		},
		default: '',
		placeholder: 'Nome do Grupo',
		description: 'The name for the new WhatsApp group',
	},
	{
		displayName: 'Participants',
		name: 'participants',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['createGroup'],
			},
		},
		default: '',
		placeholder: '551199999999@s.whatsapp.net,552199999999@s.whatsapp.net',
		description: 'Comma-separated list of participant phone numbers in WhatsApp format (e.g., 551199999999@s.whatsapp.net). Each number should include country code and end with @s.whatsapp.net.',
	},
	{
		displayName: 'Information',
		name: 'information',
		type: 'notice',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['createGroup'],
			},
		},
		default: '',
		description: '📋 This will create a new WhatsApp group with the specified name and participants. The response will include the new group JID, creation status, and group details. Note: You need to have the participants as contacts and they must have WhatsApp accounts.',
	},
];
