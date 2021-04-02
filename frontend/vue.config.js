
process.env.VUE_APP_NAME = require('./package.json').name
process.env.VUE_APP_VERSION = require('./package.json').version
process.env.VUE_APP_URL = "http://localhost:8000/"
process.env.VUE_PUSHER_APP_KEY = require('./package.json').version
process.env._APP_CLUSTER = require('./package.json').name

module.exports = {
	transpileDependencies: [
		'vuetify'
	],
	devServer: {
		port: 80
	}
}
