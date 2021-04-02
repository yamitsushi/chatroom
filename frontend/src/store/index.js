import Vue from 'vue'
import Vuex from 'vuex'

import { createStore } from 'vuex-extensions'

import user from './modules/user'
import contacts from './modules/contacts'
import chats from './modules/chats'

Vue.use(Vuex)

export default createStore(Vuex.Store, {
	modules: {
		user,
		contacts,
		chats
	}
})