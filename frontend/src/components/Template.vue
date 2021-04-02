<template>
	<v-app id="inspire">
		<v-navigation-drawer
			v-model="drawer"
			app
		>
			<v-list-item>
				<v-list-item-title class="pa-2">
					<v-list-item-title class="title font-weight-bold text-uppercase">{{ appName }}</v-list-item-title>
					<v-list-item-subtitle class="overline grey--text">{{ appVersion }}</v-list-item-subtitle>
				</v-list-item-title>
			</v-list-item>
			
			<v-divider/>
			
			<Routes/>
		</v-navigation-drawer>
		
		<v-app-bar app>
			<v-app-bar-nav-icon @click="drawer = !drawer"/>
			
			<v-spacer/>
			
			<v-menu>
				<template v-slot:activator="{ on, attrs }">
					<span v-bind="attrs" v-on="on">{{ username }}</span>
				</template>
				
				<v-card>
					<v-list>
						<v-list-item :to="{ name: 'setting' }">
							<v-list-item-content>
								<v-list-item-title>Setting</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</v-list>
					
					<Logout/>
				</v-card>
			</v-menu>
		</v-app-bar>
		
		<v-main>
			<router-view/>
			
			<Loading/>
		</v-main>
		
		<v-footer>
			<v-row
				justify="center"
				no-gutters
			>
				<v-col
					class="lighten-2 py-2 text-center"
					cols="12"
				>
					2021 - <strong>{{ appName }}</strong>
				</v-col>
			</v-row>
		</v-footer>
	</v-app>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	
	import Routes from './Routes.vue'
	import Loading from './Loading.vue'
	import Logout from './Logout.vue'
	
	export default {
		components: {
			Routes,
			Loading,
			Logout
		},
		data: () => ({
			drawer: true,
			appName: process.env.VUE_APP_NAME,
			appVersion: process.env.VUE_APP_VERSION
		}),
		computed: {
			...mapGetters('user', [
				'username'
			])
		}
	}
</script>