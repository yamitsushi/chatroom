import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueGoodTable from './plugins/vue-good-table'
import axios from './plugins/axios'
import moment from './plugins/moment'

import pusher from './plugins/pusher'

Vue.config.productionTip = false

new Vue({
	vuetify,
	VueGoodTable,
	axios,
	moment,
	router,
	store,
	vuetify,
	pusher,
	render: h => h(App)
}).$mount('#app')
