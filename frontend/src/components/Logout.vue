<template>
	<v-dialog
		v-model="dialog"
		width="500"
		persistent
	>
		<template v-slot:activator="{ on, attrs }">
			<v-list>
				<v-list-item
					v-bind="attrs"
					v-on="on"
				>
					<v-list-item-content>
						<v-list-item-title>Logout</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</template>
		
		<v-card>
			<v-card-title>Ready to Leave?</v-card-title>
			
			<v-card-text>Select "Logout" below if you are ready to end your current session.</v-card-text>
			
			<v-card-actions class="justify-end">
				<v-btn
					color="secondary"
					@click="dialog = false"
				>
					Cancel
				</v-btn>
				
				<v-btn
					color="primary"
					@click="logout"
				>
					Logout
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
	import store from '@/store'
	import router from '@/router'
	
	export default {
		data: () => ({
			dialog : false
		}),
		methods: {
			logout() {
				this.$axios.get('/logout').then(() => {
					store.reset()
					router.push({ name: 'login' })
				}).catch(() => {
					alert("Logout Failed")
				})
			}
		}
	}
</script>