import Vue from 'vue'
import router from '@/router'

let api = Vue.prototype

export default {
	setLoading: ({commit}, payload) => commit('setLoading', payload),
	
	
	setUsername: ({commit}, payload) => commit('setUsername', payload),
	
	login: ({commit}, payload) => {
		api.$axios.post('/login', payload).then(response => {
			commit('setUsername', response.data)
			router.push({ name:'dashboard' })
		}).catch(() => {
			alert('Login Failed')
		})
	}
}