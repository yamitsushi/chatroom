<template>
	<v-list>
		<v-list-item
			:to="{ name: 'dashboard' }"
			exact
		>
			<v-list-item-icon>
				<v-icon>mdi-gauge</v-icon>
			</v-list-item-icon>
			<v-list-item-title>Dashboard</v-list-item-title>
		</v-list-item>
		<v-subheader>Interface</v-subheader>
		<template v-for="route in routeList">
			<v-list-group
				:key="route.title"
				:prepend-icon="route.icon"
			>
				<template v-slot:activator>
					<v-list-item-content>
						<v-list-item-title>{{ route.title }}</v-list-item-title>
					</v-list-item-content>
				</template>
				<v-subheader>{{ route.subHeader }}</v-subheader>
				<template v-for="item in route.sub">
					<v-list-item
						:key="item.title"
						:to="{ name: item.route }"
						exact
					>
						<v-list-item-icon>
							<v-icon>{{ item.icon }}</v-icon>
						</v-list-item-icon>
						<v-list-item-title>{{ item.title }}</v-list-item-title>
					</v-list-item>
				</template>
			</v-list-group>
		</template>
	</v-list>
</template>

<script>
	export default {
		data: () => ({
			routeList: [
				{
					title: 'Contacts',
					icon: 'mdi-book',
					subHeader: 'Contact List',
					sub: [
						{
							title: 'Contact Book',
							icon: 'mdi-book-account',
							route: 'contact.book'
						}
					]
				},
				{
					title: 'Rooms',
					icon: 'mdi-google-classroom',
					subHeader: 'Room List',
					sub: [
						{
							title: 'Channels',
							icon: 'mdi-android-message',
							route: 'chat.room'
						}
					]
				}
			]
		})
	}
</script>