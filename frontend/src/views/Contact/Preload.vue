<template>
	<router-view/>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'

	export default {
		methods: {
			...mapActions('contacts', [
				'getContacts',
				'getUsers'
				])
		},
		computed :{
			...mapGetters('contacts', [
				'contactsLoaded',
				'usersLoaded'
				])
		},
		async mounted() {
			let loading = 0
			while(!this.contactsLoaded) {
				await this.getContacts(loading)
				loading+=1000
			}

			loading = 0
			while(!this.usersLoaded) {
				await this.getUsers(loading)
				loading+=1000
			}
		}
	}
</script>