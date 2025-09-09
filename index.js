module.exports = {
	loadNodeTypes: function(nodeTypes) {
		nodeTypes.nodes = {
			ClimaNode: require('./dist/nodes/ClimaNode/ClimaNode.node.js'),
			MegaApiPairingCode: require('./dist/nodes/MegaapiNodes/PairingCode/MegaApiPairingCode.node.js')
		};

		return nodeTypes;
	},

	loadCredentialTypes: function(credentialTypes) {
		credentialTypes.credentials = {
			openWeatherMapApi: require('./dist/credentials/OpenWeatherMapApi.credentials.js'),
			megaApiCredentials: require('./dist/credentials/MegaApiCredentials.credentials.js')
		};

		return credentialTypes;
	}
};