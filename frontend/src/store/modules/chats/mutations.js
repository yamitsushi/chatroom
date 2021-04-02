export default {
	setContacts (state, payload) {
		payload.map(data => state.contacts.push(data))
	},
	setContactsLoaded: (state, payload) => state.contactsLoaded = payload,

	setRooms (state, payload) {
		payload.map(data => state.roomLists.push(data))
	},
	setRoomsLoaded: (state, payload) => state.roomsLoaded = payload,

	
	addRoom (state, payload) {
		state.roomLists.push(payload)
	},
	updateRoom (state, payload) {
		Object.assign(state.roomLists[payload.index], payload.room)
	}
}