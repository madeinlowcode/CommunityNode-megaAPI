import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class MegaApiCredentialsApi implements ICredentialType {
	name = 'megaApiCredentialsApi';
	displayName = 'megaAPI Credentials API';
	documentationUrl = 'https://doc.mega-api.app.br/';
	properties: INodeProperties[] = [
		{
			displayName: 'Host',
			name: 'host',
			type: 'string',
			default: '',
			placeholder: 'host',
			description: 'Host da API MegaAPI (disponível no seu painel)',
			required: true,
		},
		{
			displayName: 'Instance Key',
			name: 'instanceKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			placeholder: 'instance key',
			description: 'Chave da instância (disponível no seu painel)',
			required: true,
		},
		{
			displayName: 'Token',
			name: 'token',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			placeholder: 'token',
			description: 'Token de autenticação (disponível no seu painel)',
			required: true,
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.token}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.host}}',
			url: '=/rest/instance/{{$credentials.instanceKey}}',
			method: 'GET',
			headers: {
				Authorization: '=Bearer {{$credentials.token}}',
			},
		},
	};
}

// Exportação adicional para compatibilidade com n8n
export { MegaApiCredentialsApi as MegaApiCredentials };
