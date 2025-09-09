import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { megaapiRequest } from '../megaapiRequest';

export async function generatePairingCode(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData> {
	const credentials = await this.getCredentials('megaApiCredentialsApi');
	const phoneNumber = this.getNodeParameter('phoneNumber', index) as string;

	this.logger.info(`📱 Generating pairing code for phone: ${phoneNumber}`);

	try {
		// Construir endpoint
		const endpoint = `/rest/instance/pairingCode/${credentials.instanceKey}`;
		
		// Fazer requisição
		const response = await megaapiRequest.call(
			this,
			'GET',
			endpoint,
			{},
			{ phoneNumber }
		);

		if (response.error) {
			this.logger.error('❌ MegaAPI returned error', response);
			throw new NodeOperationError(
				this.getNode(),
				`MegaAPI Error: ${response.message || 'Unknown error'}`,
				{ itemIndex: index }
			);
		}

		this.logger.info('✅ Pairing code generated successfully', {
			pairingCode: response.pairingCode || response.code,
		});

		return {
			json: {
				success: true,
				pairingCode: response.pairingCode || response.code,
				message: response.message || 'Pairing code generated successfully',
				instanceKey: credentials.instanceKey,
				phoneNumber,
				timestamp: new Date().toISOString(),
				...response,
			},
			pairedItem: { item: index },
		};
	} catch (error) {
		this.logger.error('💥 Error generating pairing code', {
			error: error.message,
			phoneNumber,
		});
		throw error;
	}
}
