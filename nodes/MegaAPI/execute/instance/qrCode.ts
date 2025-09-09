import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { megaapiRequest } from '../megaapiRequest';

export async function generateQrCode(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData> {
	const credentials = await this.getCredentials('megaApiCredentialsApi');

	this.logger.info('📱 Generating QR Code for WhatsApp connection');

	try {
		// Construir endpoint
		const endpoint = `/rest/instance/qrcode_base64/${credentials.instanceKey}`;
		
		// Fazer requisição
		const response = await megaapiRequest.call(
			this,
			'GET',
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

		// Process response
		let qrCodeData;
		if (typeof response === 'string') {
			// If response is a string, it might be the base64 directly
			qrCodeData = response;
		} else if (response && typeof response === 'object') {
			// If response is an object, look for common fields
			qrCodeData = response.qrcode || response.qr_code || response.data || response.base64 || response;
		} else {
			qrCodeData = response;
		}

		this.logger.info('✅ QR Code generated successfully', {
			qrCodeLength: typeof qrCodeData === 'string' ? qrCodeData.length : 'Object received',
		});

		return {
			json: {
				success: true,
				qrCode: qrCodeData,
				qrCodeBase64: qrCodeData,
				message: response.message || 'QR Code generated successfully',
				instanceKey: credentials.instanceKey,
				timestamp: new Date().toISOString(),
				...response,
			},
			pairedItem: { item: index },
		};
	} catch (error) {
		this.logger.error('💥 Error generating QR code', {
			error: error.message,
		});
		throw error;
	}
}
