<template>
	<router-view/>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'

	export default {
		methods: {
			...mapActions('chats', [
				'getRooms',
				'getContacts'
				])
		},
		computed :{
			...mapGetters('chats', [
				'roomsLoaded',
				'contactsLoaded'
				])
		},
		async mounted() {
			let loading = 0
			while(!this.roomsLoaded) {
				await this.getRooms(loading)
				loading+=1000
			}

			loading = 0
			while(!this.contactsLoaded) {
				await this.getContacts(loading)
				loading+=1000
			}
			/* Listen here */
		}
	}
</script>