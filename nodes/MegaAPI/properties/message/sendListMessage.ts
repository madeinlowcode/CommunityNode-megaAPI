import type { INodeProperties } from 'n8n-workflow';

export const sendListMessageProperties: INodeProperties[] = [
	{
		displayName: 'To (Contact)',
		name: 'to',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['sendListMessage'],
			},
		},
		default: '',
		placeholder: '551199999999@s.whatsapp.net',
		description: 'The WhatsApp contact to send the list message to. Format: phone_number@s.whatsapp.net (e.g., 551199999999@s.whatsapp.net).',
	},
	{
		displayName: 'Button Text',
		name: 'buttonText',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['sendListMessage'],
			},
		},
		default: '',
		placeholder: 'Escolha',
		description: 'The text that appears on the list button',
	},
	{
		displayName: 'Text',
		name: 'text',
		type: 'string',
		typeOptions: {
			rows: 3,
		},
		required: true,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['sendListMessage'],
			},
		},
		default: '',
		placeholder: 'Testando',
		description: 'The main text content of the list message',
	},
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['sendListMessage'],
			},
		},
		default: '',
		placeholder: 'Teste',
		description: 'The title of the list message',
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		typeOptions: {
			rows: 2,
		},
		required: true,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['sendListMessage'],
			},
		},
		default: '',
		placeholder: 'Selecione uma forma de pagamento',
		description: 'The description text that appears below the title',
	},
	{
		displayName: 'Sections (JSON)',
		name: 'sections',
		type: 'json',
		typeOptions: {
			rows: 10,
		},
		required: true,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['sendListMessage'],
			},
		},
		default: `[
  {
    "title": "PIX",
    "rows": [
      {
        "title": "PIX",
        "description": "pagamento via pix",
        "rowId": "01"
      }
    ]
  },
  {
    "title": "Cartao",
    "rows": [
      {
        "title": "Cartao de Credito",
        "description": "Pagamento via cartao de credito",
        "rowId": "02"
      }
    ]
  }
]`,
		description: 'The sections array in JSON format. Each section can have multiple rows. You can add as many sections and rows as needed.',
	},
	{
		displayName: 'List Type',
		name: 'listType',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['sendListMessage'],
			},
		},
		options: [
			{
				name: 'Single Select (0)',
				value: 0,
				description: 'User can select only one option',
			},
			{
				name: 'Multi Select (1)',
				value: 1,
				description: 'User can select multiple options',
			},
		],
		default: 0,
		description: 'The type of list selection behavior',
	},
	{
		displayName: 'Information',
		name: 'information',
		type: 'notice',
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['sendListMessage'],
			},
		},
		default: '',
		description: '📋 This will send an interactive list message to WhatsApp. Users can select from the provided options. The sections field accepts JSON format with multiple sections and rows.',
	},
];
