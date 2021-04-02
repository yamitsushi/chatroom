import Vue from 'vue'

let api = Vue.prototype

export default {
	getUsers: async ({commit}, payload) => {
		await api.$axios.get("/contacts/users/" + payload).then(response => {
			commit('setUsers', response.data)
			commit('setUsersLoaded', response.data.length < 1000)
		}).catch(error => {
			commit('setUsersLoaded', true)
			alert(error.response.data.message)
		})
	},
	getContacts: async ({commit}, payload) => {
		await api.$axios.get("/contacts/" + payload).then(response => {
			commit('setContacts', response.data)
			commit('setContactsLoaded', response.data.length < 1000)
		}).catch(error => {
			commit('setContactsLoaded', true)
			alert(error.response.data.message)
		})
	},
	addContact: async ({commit}, payload) => {
		await api.$axios.post("/contacts", payload).then(response => {
			commit('addContact', response.data)
		}).catch(error => {
			alert(error.response.data.message)
		})
	},
	updateContact: async ({commit}, payload) => {
		await api.$axios.patch("/contacts/" + payload.id, payload).then(response => {
			commit('updateContact', {
				index: payload.index,
				contact: response.data
			})
		}).catch(error => {
			alert(error.response.data.message)
		})
	},
	deleteContact: async ({commit}, payload) => {
		await api.$axios.delete("/contacts/" + payload.id).then(() => {
			commit('deleteContact', payload.index)
		}).catch(error => {
			alert(error.response.data.message)
		})
	}
}