export default {
	setUsers (state, payload) {
		payload.map(data => state.users.push(data))
	},
	setUsersLoaded: (state, payload) => state.usersLoaded = payload,


	setContacts (state, payload) {
		payload.map(data => state.contacts.push(data))
	},
	setContactsLoaded: (state, payload) => state.contactsLoaded = payload,

	
	addContact (state, payload) {
		state.contacts.push(payload)
	},
	updateContact (state, payload) {
		Object.assign(state.contacts[payload.index], payload.contact)
	},
	deleteContact (state, payload) {
		state.contacts.splice(payload, 1)
	}
}