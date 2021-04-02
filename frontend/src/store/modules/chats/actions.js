import Vue from 'vue'

let api = Vue.prototype

export default {
	getContacts: async ({commit}, payload) => {
		await api.$axios.get("/contacts/" + payload).then(response => {
			commit('setContacts', response.data)
			commit('setContactsLoaded', response.data.length < 1000)
		}).catch(error => {
			commit('setContactsLoaded', true)
			alert(error.response.data.message)
		})
	},
	getRooms: async ({commit}, payload) => {
		await api.$axios.get("/rooms/" + payload).then(response => {
			commit('setRooms', response.data)
			commit('setRoomsLoaded', response.data.length < 1000)
		}).catch(error => {
			commit('setRoomsLoaded', true)
			alert(error.response.data.message)
		})
	},
	addRoom: async ({commit}, payload) => {
		await api.$axios.post("/rooms", payload).then(response => {
			commit('addRoom', response.data)
		}).catch(error => {
			alert(error.response.data.message)
		})
	},
	updateRoom: async ({commit}, payload) => {
		await api.$axios.patch("/rooms/" + payload.id, payload).then(response => {
			commit('updateRoom', {
				index: payload.index,
				room: response.data
			})
		}).catch(error => {
			alert(error.response.data.message)
		})
	}
}