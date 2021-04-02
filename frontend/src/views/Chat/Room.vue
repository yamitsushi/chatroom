<template>
	<v-container>
		<h2>Channels Listing</h2>
		<v-card>
			<v-card-title>
				<v-spacer/>
				<v-btn
					color="success"
					@click="addDialog = true"
				>
					Add Room
				</v-btn>
			</v-card-title>
			<v-card-text>
				<vue-good-table
					:columns="columns"
					:rows="this.roomLists"
					:search-options="{enabled: true}"
					:pagination-options="{
						enabled: true,
						perPage: 10,
    					perPageDropdownEnabled: false
					}"
				>
					<template slot="table-row" slot-scope="props" >
						<span v-if="props.column.field == 'users'">
							<v-chip-group column>
								<v-chip v-for="user in props.row.users" :key="user.id">{{ user.name }}</v-chip>
							</v-chip-group>
						</span>
						<span v-else-if="props.column.field == 'action'">
							<v-btn
								color="info"
								@click="showUpdateDialog(props.row)"
							>
								Update Room
							</v-btn>
							<v-btn
								color="success"
								:to="{ name:'chat.message', params: { id: props.row.id } }"
							>
								Join Room
							</v-btn>
						</span>
						<span v-else>{{ props.formattedRow[props.column.field] }}</span>
					</template>
				</vue-good-table>
			</v-card-text>
		</v-card>

		<v-dialog
			v-model="addDialog"
			max-width="750"
			persistent
		>
			<v-card class="pa-2">
				<v-card-title>Add New Channel</v-card-title>
				<v-divider/>
				<v-card-text>
					<v-form>
						<v-text-field
							v-model="addData.name"
							label="Channel Name"
						/>
						<v-autocomplete
							v-model="addData.tempUser"
							label="Channel Users"
							:items="this.contactLists.map(contact => contact.name)"
							v-on:keyup.enter="addDialogUser"
						/>
						<v-chip-group column>
							<v-chip
								v-for="(item, index) in addData.users"
								:key="item"
								@click="addData.users.splice(index, 1)"
							>
								{{ item }}
							</v-chip>
						</v-chip-group>
					</v-form>
				</v-card-text>
				<v-divider/>
				<v-card-actions class="justify-end">
					<v-btn
						color="secondary"
						@click="addDialog = false"
					>
						Cancel
					</v-btn>
					<v-btn
						color="success"
						@click="addRoom(addData)"
					>
						Add
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<v-dialog
			v-model="updateDialog"
			max-width="750"
			persistent
		>
			<v-card class="pa-2">
				<v-card-title>Update Supplier</v-card-title>
				<v-divider/>
				<v-card-text>
					<v-form>
						<v-text-field
							v-model="updateData.name"
							label="Channel Name"
						/>
						<v-autocomplete
							v-model="updateData.tempUser"
							label="Channel Users"
							:items="this.contactLists.map(contact => contact.name)"
							v-on:keyup.enter="updateDialogUser"
						/>
						<v-chip-group column>
							<v-chip
								v-for="(item, index) in updateData.users"
								:key="item"
								@click="updateData.users.splice(index, 1)"
							>
								{{ item }}
							</v-chip>
						</v-chip-group>
					</v-form>
				</v-card-text>
				<v-divider/>
				<v-card-actions class="justify-end">
					<v-btn
						@click="updateDialog = false"
						color="secondary"
					>
						Cancel
					</v-btn>
					<v-btn
						:color="'info'"
						@click="updateRoom(updateData)"
					>
						{{ 'Update' }}
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-container>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex'

	export default {
		data: () => ({
			columns: [
				{
					label: 'Name',
					field: 'name',
					tdClass: 'text-center',
					thClass: 'text-center',
					width: '150px'
				},
				{
					label: 'Nickname',
					field: 'name',
					tdClass: 'text-center',
					thClass: 'text-center'
				},
				{
					label: 'Associated Users',
					field: 'users',
					tdClass: 'text-center',
					thClass: 'text-center'
				},
				{
					label: 'Action',
					field: 'action',
					sortable: false,
					thClass: 'text-center',
					width: '300px',
				}
			],

			addDialog: false,
			addData: {
				name: null,
				users:[]
			},

			updateDialog: false,
			updateData: {
				name: null,
				users:[]
			}
		}),
		computed: {
			...mapGetters('chats', [
				'contactLists',
                'roomLists'
			])
		},
		methods: {
			...mapActions('chats', [
				'addRoom',
				'updateRoom'
			]),

			showUpdateDialog(data) {
				this.updateData.index = data.originalIndex
				this.updateData.id = data.id
				this.updateData.name = data.name
				this.updateData.users = data.users.map(user => user.name)
				this.updateDialog = true
			},

			addDialogUser() {
				if(!this.addData.users.includes(this.addData.tempUser)){
					this.addData.users.push(this.addData.tempUser)
					this.addData.tempUser= null
				}
			},

			updateDialogUser() {
				if(!this.updateData.users.includes(this.updateData.tempUser)){
					this.updateData.users.push(this.updateData.tempUser)
					this.updateData.tempUser = null
				}
			},
		}
	}
</script>