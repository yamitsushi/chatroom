<template>
	<v-dialog
		v-model="loading"
		width="300"
		persistent
	>
		<v-card
			color="primary"
			dark
		>
			<v-card-text>
				Please stand by
				<v-progress-linear
					indeterminate
					color="white"
					class="mb-0"
				/>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script>
	import { mapGetters } from 'vuex'
	
	export default {
		computed: {
			...mapGetters('user', [
				'loading'
			])
		}
	}
</script>