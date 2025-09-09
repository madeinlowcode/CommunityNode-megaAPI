import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { megaapiRequest } from '../megaapiRequest';

export async function logoutInstance(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData> {
	const credentials = await this.getCredentials('megaApiCredentialsApi');

	this.logger.info('🚪 Logging out from WhatsApp instance');

	try {
		// Construir endpoint
		const endpoint = `/rest/instance/${credentials.instanceKey}/logout`;
		
		// Fazer requisição
		const response = await megaapiRequest.call(
			this,
			'DELETE',
			endpoint
		);

		if (response.error) {
			this.logger.error('❌ MegaAPI returned error', response);
			throw new NodeOperationError(
				this.getNode(),
				`MegaAPI Error: ${response.message || 'Unknown error'}`,
				{ itemIndex: index }
			);
		}

		this.logger.info('✅ Logout completed successfully', {
			message: response.message,
			instanceKey: credentials.instanceKey,
		});

		return {
			json: {
				success: true,
				message: response.message || 'Logout completed successfully',
				instanceKey: credentials.instanceKey,
				timestamp: new Date().toISOString(),
				...response,
			},
			pairedItem: { item: index },
		};
	} catch (error) {
		this.logger.error('💥 Error during logout', {
			error: error.message,
		});
		throw error;
	}
}
