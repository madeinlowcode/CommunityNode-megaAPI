import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeOperationError, NodeConnectionType } from 'n8n-workflow';

import {
	pairingCodeProperties,
	qrCodeProperties,
	logoutProperties,
	restartProperties,
	statusProperties,
	downloadMediaMessageProperties,
	isOnWhatsappProperties,
	getWebhookProperties,
	configWebhookProperties,
	sendTextMessageProperties,
	sendMediaUrlProperties,
	sendMediaBase64Properties,
	sendLocationProperties,
	sendLinkPreviewProperties,
	sendListMessageProperties,
	forwardMessageProperties,
	quoteMessageProperties,
} from './properties';

import {
	presenceUpdateChatProperties,
	deleteMessageProperties,
	deleteMessageFromMeProperties,
} from './properties/chat';

import {
	getGroupsProperties,
	detailsGroupProperties,
	createGroupProperties,
	sendMessageGroupProperties,
	sendMediaUrlGroupProperties,
	sendMediaBase64GroupProperties,
	addParticipantsProperties,
	removeParticipantsProperties,
	leaveGroupProperties,
} from './properties/group';

import {
	generatePairingCode,
	generateQrCode,
	logoutInstance,
	restartInstance,
	getInstanceStatus,
	downloadMediaMessage,
	checkIsOnWhatsapp,
	getWebhookConfig,
	configureWebhook,
	sendTextMessage,
	sendMediaUrl,
	sendMediaBase64,
	sendLocation,
	sendLinkPreview,
	sendListMessage,
	forwardMessage,
	quoteMessage,
} from './execute';

import {
	presenceUpdateChat,
	deleteMessage,
	deleteMessageFromMe,
} from './execute/chat';

import {
	getGroups,
	detailsGroup,
	createGroup,
	sendMessageGroup,
	sendMediaUrlGroup,
	sendMediaBase64Group,
	addParticipants,
	removeParticipants,
	leaveGroup,
} from './execute/group';

export class MegaApi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'MegaAPI',
		name: 'megaApi',
		icon: 'file:megaapi.svg',
		group: ['communication'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with MegaAPI WhatsApp service',
		defaults: {
			name: 'MegaAPI',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'megaApiCredentialsApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.host}}',
			headers: {
				Authorization: '=Bearer {{$credentials.token}}',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Chat',
						value: 'chat',
						description: 'Chat management operations',
					},
					{
						name: 'Group',
						value: 'group',
						description: 'Group management operations',
					},
					{
						name: 'Instance',
						value: 'instance',
						description: 'WhatsApp instance operations',
					},
					{
						name: 'Message',
						value: 'message',
						description: 'Message sending operations',
					},
					{
						name: 'Webhook',
						value: 'webhook',
						description: 'Webhook configuration operations',
					},
				],
				default: 'group',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['chat'],
					},
				},
				options: [
					{
						name: 'Delete Message From Me',
						value: 'deleteMessageFromMe',
						description: 'Delete a specific message sent by you using message key and timestamp',
						action: 'Delete message from me',
					},
					{
						name: 'Delete Message',
						value: 'deleteMessage',
						description: 'Delete a specific message from the chat',
						action: 'Delete message',
					},
					{
						name: 'Presence Update Chat',
						value: 'presenceUpdateChat',
						description: 'Update presence status in a chat (typing, recording, online, etc.)',
						action: 'Update presence status',
					},
				],
				default: 'deleteMessageFromMe',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['group'],
					},
				},
				options: [
					{
						name: 'Add Participants',
						value: 'addParticipants',
						description: 'Add participants to an existing WhatsApp group',
						action: 'Add participants to group',
					},
					{
						name: 'Create Group',
						value: 'createGroup',
						description: 'Create a new WhatsApp group with specified name and participants',
						action: 'Create new group',
					},
					{
						name: 'Details Group',
						value: 'detailsGroup',
						description: 'Get detailed information about a specific WhatsApp group',
						action: 'Get group details',
					},
					{
						name: 'Get Groups',
						value: 'getGroups',
						description: 'Get a list of all groups that your WhatsApp instance is a member of',
						action: 'Get groups list',
					},
					{
						name: 'Leave Group',
						value: 'leaveGroup',
						description: 'Leave an existing WhatsApp group',
						action: 'Leave group',
					},
					{
						name: 'Remove Participants',
						value: 'removeParticipants',
						description: 'Remove participants from an existing WhatsApp group',
						action: 'Remove participants from group',
					},
					{
						name: 'Send Media Base64 Group',
						value: 'sendMediaBase64Group',
						description: 'Send a media file from base64 data to a specific WhatsApp group',
						action: 'Send media base64 to group',
					},
					{
						name: 'Send Media URL Group',
						value: 'sendMediaUrlGroup',
						description: 'Send a media file from URL to a specific WhatsApp group',
						action: 'Send media URL to group',
					},
					{
						name: 'Send Message Group',
						value: 'sendMessageGroup',
						description: 'Send a text message to a specific WhatsApp group',
						action: 'Send message to group',
					},
				],
				default: 'leaveGroup',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['instance'],
					},
				},
				options: [
					{
						name: 'Download Media Message',
						value: 'downloadMediaMessage',
						description: 'Download media content from a WhatsApp message',
						action: 'Download media message',
					},
					{
						name: 'Generate Pairing Code',
						value: 'generatePairingCode',
						description: 'Generate a pairing code for WhatsApp connection',
						action: 'Generate a pairing code',
					},
					{
						name: 'Generate QR Code',
						value: 'generateQrCode',
						description: 'Generate a QR code for WhatsApp connection',
						action: 'Generate a QR code',
					},
					{
						name: 'Is On WhatsApp',
						value: 'isOnWhatsapp',
						description: 'Check if a contact is registered on WhatsApp',
						action: 'Check if contact is on whatsapp',
					},
					{
						name: 'Logout',
						value: 'logout',
						description: 'Logout from WhatsApp instance',
						action: 'Logout from instance',
					},
					{
						name: 'Restart',
						value: 'restart',
						description: 'Restart WhatsApp instance',
						action: 'Restart instance',
					},
					{
						name: 'Status',
						value: 'status',
						description: 'Get WhatsApp instance status',
						action: 'Get instance status',
					},
				],
				default: 'generatePairingCode',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['message'],
					},
				},
				options: [
					{
						name: 'Forward Message',
						value: 'forwardMessage',
						description: 'Forward an existing WhatsApp message to another contact',
						action: 'Forward message',
					},
					{
						name: 'Quote Message',
						value: 'quoteMessage',
						description: 'Send a text message as a reply/quote to an existing WhatsApp message',
						action: 'Quote message',
					},
					{
						name: 'Send Link Preview',
						value: 'sendLinkPreview',
						description: 'Send a message with a link that WhatsApp will preview automatically',
						action: 'Send link with preview',
					},
					{
						name: 'Send List Message',
						value: 'sendListMessage',
						description: 'Send an interactive list message with selectable options to a WhatsApp contact',
						action: 'Send interactive list',
					},
					{
						name: 'Send Location',
						value: 'sendLocation',
						description: 'Send a location message to a WhatsApp contact',
						action: 'Send location',
					},
					{
						name: 'Send Media Base64',
						value: 'sendMediaBase64',
						description: 'Send a media file from base64 data to a WhatsApp contact',
						action: 'Send media from base64',
					},
					{
						name: 'Send Media URL',
						value: 'sendMediaUrl',
						description: 'Send a media file from URL to a WhatsApp contact',
						action: 'Send media from URL',
					},
					{
						name: 'Send Text Message',
						value: 'sendTextMessage',
						description: 'Send a text message to a WhatsApp contact',
						action: 'Send text message',
					},
				],
				default: 'quoteMessage',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['webhook'],
					},
				},
				options: [
					{
						name: 'Config Webhook',
						value: 'configWebhook',
						description: 'Configure webhook URL and enable/disable notifications',
						action: 'Configure webhook settings',
					},
					{
						name: 'Get Webhook',
						value: 'getWebhook',
						description: 'Get current webhook configuration',
						action: 'Get webhook configuration',
					},
				],
				default: 'configWebhook',
			},
			...presenceUpdateChatProperties,
			...deleteMessageProperties,
			...deleteMessageFromMeProperties,
			...getGroupsProperties,
			...detailsGroupProperties,
			...createGroupProperties,
			...sendMessageGroupProperties,
			...sendMediaUrlGroupProperties,
			...sendMediaBase64GroupProperties,
			...addParticipantsProperties,
			...removeParticipantsProperties,
			...leaveGroupProperties,
			...pairingCodeProperties,
			...qrCodeProperties,
			...logoutProperties,
			...restartProperties,
			...statusProperties,
			...downloadMediaMessageProperties,
			...isOnWhatsappProperties,
			...getWebhookProperties,
			...configWebhookProperties,
			...sendTextMessageProperties,
			...sendMediaUrlProperties,
			...sendMediaBase64Properties,
			...sendLocationProperties,
			...sendLinkPreviewProperties,
			...sendListMessageProperties,
			...forwardMessageProperties,
			...quoteMessageProperties,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const resource = this.getNodeParameter('resource', 0);
		const operation = this.getNodeParameter('operation', 0);

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: INodeExecutionData;

				if (resource === 'chat') {
					switch (operation) {
						case 'deleteMessageFromMe':
							responseData = await deleteMessageFromMe.call(this, i);
							break;
						case 'deleteMessage':
							responseData = await deleteMessage.call(this, i);
							break;
						case 'presenceUpdateChat':
							responseData = await presenceUpdateChat.call(this, i);
							break;
						default:
							throw new NodeOperationError(this.getNode(), `Unknown chat operation: ${operation}`, { itemIndex: i });
					}
				} else if (resource === 'group') {
					switch (operation) {
						case 'addParticipants':
							responseData = await addParticipants.call(this, i);
							break;
						case 'createGroup':
							responseData = await createGroup.call(this, i);
							break;
						case 'detailsGroup':
							responseData = await detailsGroup.call(this, i);
							break;
						case 'getGroups':
							responseData = await getGroups.call(this, i);
							break;
						case 'leaveGroup':
							responseData = await leaveGroup.call(this, i);
							break;
						case 'removeParticipants':
							responseData = await removeParticipants.call(this, i);
							break;
						case 'sendMediaBase64Group':
							responseData = await sendMediaBase64Group.call(this, i);
							break;
						case 'sendMediaUrlGroup':
							responseData = await sendMediaUrlGroup.call(this, i);
							break;
						case 'sendMessageGroup':
							responseData = await sendMessageGroup.call(this, i);
							break;
						default:
							throw new NodeOperationError(this.getNode(), `Unknown group operation: ${operation}`, { itemIndex: i });
					}
				} else if (resource === 'instance') {
					switch (operation) {
						case 'generatePairingCode':
							responseData = await generatePairingCode.call(this, i);
							break;
						case 'generateQrCode':
							responseData = await generateQrCode.call(this, i);
							break;
						case 'logout':
							responseData = await logoutInstance.call(this, i);
							break;
						case 'restart':
							responseData = await restartInstance.call(this, i);
							break;
						case 'status':
							responseData = await getInstanceStatus.call(this, i);
							break;
						case 'downloadMediaMessage':
							responseData = await downloadMediaMessage.call(this, i);
							break;
						case 'isOnWhatsapp':
							responseData = await checkIsOnWhatsapp.call(this, i);
							break;
						default:
							throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`, { itemIndex: i });
					}
				} else if (resource === 'message') {
					switch (operation) {
						case 'quoteMessage':
							responseData = await quoteMessage.call(this, i);
							break;
						case 'forwardMessage':
							responseData = await forwardMessage.call(this, i);
							break;
						case 'sendListMessage':
							responseData = await sendListMessage.call(this, i);
							break;
						case 'sendLinkPreview':
							responseData = await sendLinkPreview.call(this, i);
							break;
						case 'sendLocation':
							responseData = await sendLocation.call(this, i);
							break;
						case 'sendMediaBase64':
							responseData = await sendMediaBase64.call(this, i);
							break;
						case 'sendMediaUrl':
							responseData = await sendMediaUrl.call(this, i);
							break;
						case 'sendTextMessage':
							responseData = await sendTextMessage.call(this, i);
							break;
						default:
							throw new NodeOperationError(this.getNode(), `Unknown message operation: ${operation}`, { itemIndex: i });
					}
				} else if (resource === 'webhook') {
					switch (operation) {
						case 'configWebhook':
							responseData = await configureWebhook.call(this, i);
							break;
						case 'getWebhook':
							responseData = await getWebhookConfig.call(this, i);
							break;
						default:
							throw new NodeOperationError(this.getNode(), `Unknown webhook operation: ${operation}`, { itemIndex: i });
					}
			} else {
				throw new NodeOperationError(this.getNode(), `Unknown resource: ${resource}`, { itemIndex: i });
			}

				returnData.push(responseData);
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: error.message,
						},
						pairedItem: { item: i },
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
