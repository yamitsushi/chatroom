<template>
	<v-container>
		<h2>Account Settings</h2>
		<v-card max-width="500">
			<v-card-title>Change Password</v-card-title>
			<v-card-subtitle>
				<v-alert
					v-if="changePasswordSuccess"
					type="success"
					dismissible
				>
					Change Password Successul
				</v-alert>
			</v-card-subtitle>
			<v-card-text>
				<v-form>
					<v-text-field
						v-model="changePasswordData.old_password"
						label="Old Password"
						:type="showOldPassword ? 'text' : 'password'"
						prepend-icon="mdi-lock"
						:append-icon="showOldPassword ? 'mdi-eye' : 'mdi-eye-off'"
						@click:append="showOldPassword = !showOldPassword"
					/>

					<v-text-field
						v-model="changePasswordData.password"
						label="New Password"
						:type="showPassword ? 'text' : 'password'"
						prepend-icon="mdi-lock"
						:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
						@click:append="showPassword = !showPassword"
					/>

					<v-text-field
						v-model="changePasswordData.password_confirmation"
						label="Confirm Password"
						:type="showPasswordConfirmation ? 'text' : 'password'"
						prepend-icon="mdi-lock"
						:append-icon="showPasswordConfirmation ? 'mdi-eye' : 'mdi-eye-off'"
						@click:append="showPasswordConfirmation = !showPasswordConfirmation"
					/>
				</v-form>
			</v-card-text>
			<v-card-actions>
				<v-btn
					color="primary"
					@click="changePassword()"
				>
					Change Password
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-container>
</template>

<script>
	export default {
		data: () => ({
			showOldPassword: false,
			showPassword: false,
			showPasswordConfirmation: false,
			changePasswordData: {
				old_password: null,
				password: null,
				password_confirmation: null
			},
			changePasswordSuccess: false
		}),
		methods: {
			changePassword() {
				this.$axios.post('/change-password', this.changePasswordData).then(() => {
					this.changePasswordSuccess = true
				}).catch(error => {
					alert(error.response.data.message)
				})
			}
		}
	}
</script>