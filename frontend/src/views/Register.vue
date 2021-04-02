<template>
	<v-app>
		<v-card width="400" class="mx-auto mt-5">
			<v-card-title>
				<h3>Register Account!</h3>
			</v-card-title>
			<v-card-text>
				<v-form>
					<v-text-field
						label="Username"
						v-model="registerData.username"
						prepend-icon="mdi-account-circle"
					/>
					<v-text-field
						label="Name"
						v-model="registerData.name"
						prepend-icon="mdi-account-circle"
					/>
					<v-text-field
						:type="showPassword ? 'text' : 'password'"
						label="Password"
						v-model="registerData.password"
						prepend-icon="mdi-lock"
						:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
						@click:append="showPassword = !showPassword"
					/>
					<v-text-field
						:type="showPasswordConfirmation ? 'text' : 'password'"
						label="Confirm Password"
						v-model="registerData.password_confirmation"
						prepend-icon="mdi-lock"
						:append-icon="showPasswordConfirmation ? 'mdi-eye' : 'mdi-eye-off'"
						@click:append="showPasswordConfirmation = !showPasswordConfirmation"
					/>
				</v-form>
			</v-card-text>
			<v-divider/>
			<v-card-actions>
				<v-btn
					color="info"
					:to="{ name: 'login' }"
				>
					Back
				</v-btn>
				<v-spacer/>
				<v-btn
					color="success"
					@click="register()"
				>
					Register
				</v-btn>
			</v-card-actions>
		</v-card>
		
		<Loading/>
	</v-app>
</template>

<script>
	import router from '@/router'

	import Loading from '@/components/Loading.vue'

	export default {
		components: {
			Loading
		},
		data: () => ({
			registerData : {
				username : null,
				name : null,
				password : null,
				password_confirmation : null
			},
			showPassword: false,
			showPasswordConfirmation: false,
			url: process.env.VUE_APP_URL
		}),
		methods: {
			register() {
				this.$axios.get('/sanctum/csrf-cookie', {baseURL: this.url}).then(() => {
					this.$axios.post('/register', this.registerData).then(() => {
						alert("Account Registered Successfully")
						router.push({ name: 'login' })
					}).catch(() => alert('Error Found'))
				})
			}
		},
	}
</script>