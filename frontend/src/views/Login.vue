<template>
	<v-app>
		<v-card width="400" class="mx-auto mt-5">
			<v-card-title>
				<h3>Welcome Back!</h3>
			</v-card-title>
			<v-card-text>
				<v-form>
					<v-text-field
						label="Username"
						v-model="loginData.username"
						prepend-icon="mdi-account-circle"
					/>
					<v-text-field
						:type="showPassword ? 'text' : 'password'"
						label="Password"
						v-model="loginData.password"
						prepend-icon="mdi-lock"
						:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
						@click:append="showPassword = !showPassword"
					/>
				</v-form>
			</v-card-text>
			<v-divider/>
			<v-card-actions>
				<v-btn
					color="info"
					:to="{name: 'register'}"
				>
					Register
				</v-btn>
				<v-spacer/>
				<v-btn
					color="success"
					@click="login(loginData)"
				>
					Login
				</v-btn>
			</v-card-actions>
		</v-card>
		
		<Loading/>
	</v-app>
</template>

<script>
	import { mapActions } from 'vuex'
	import router from '@/router'

	import Loading from '@/components/Loading.vue'

	export default {
		components: {
			Loading
		},
		data: () => ({
			loginData : {
				username : null,
				password : null
			},
			showPassword: false,
			url: process.env.VUE_APP_URL
		}),
		methods: {
			...mapActions('user', [
				'setUsername',
				'login'
			])
		},
		mounted() {
			this.$axios.get('/sanctum/csrf-cookie', {baseURL: this.url}).then(() => {
				this.$axios.get('/user').then(response => {
					this.setUsername(response.data)
					router.push({ name: 'dashboard' })
				})
			}).catch((error) => {
				alert('System Error')
			})
		}
	}
</script>