import Vue from 'vue'
import axios from "axios"
import store from "@/store"
import router from "@/router"

const instance = axios.create({
	baseURL: process.env.VUE_APP_URL + "api/",
	headers: {'X-Requested-With': 'XMLHttpRequest'},
	withCredentials : true
})

instance.interceptors.request.use(config => {
	store.dispatch('user/setLoading', true)
	return config
})

instance.interceptors.response.use(response => {
	store.dispatch('user/setLoading', false)
	return response
}, error => {
	store.dispatch('user/setLoading', false)
	if(error.response.status == 401 && store.getters['user/username'] != null) {
		store.reset()
		router.push({ name: 'login' })
	}
	return Promise.reject(error)
})

const axiosPlugin = {
	install(Vue) {
		Vue.prototype.$axios = instance
	}
}

Vue.use(axiosPlugin)

export default axiosPlugin