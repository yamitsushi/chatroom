<template>
	<v-container>
		<h2>Contact Listing</h2>
		<v-card>
			<v-card-title>
				<v-spacer/>
				<v-btn
					color="success"
					@click="addDialog = true"
				>
					Add Contact
				</v-btn>
			</v-card-title>
			<v-card-text>
				<vue-good-table
					:columns="columns"
					:rows="this.contactLists"
					:search-options="{enabled: true}"
					:pagination-options="{
						enabled: true,
						perPage: 10,
    					perPageDropdownEnabled: false
					}"
				>
					<template slot="table-row" slot-scope="props" >
						<span v-if="props.column.field == 'action'">
							<v-btn
								width="100"
								color="info"
								@click="showUpdateDialog(props.row)"
							>
								Update
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
				<v-card-title>Add New Contact</v-card-title>
				<v-divider/>
				<v-card-text>
					<v-form>
						<v-autocomplete
							v-model="addData.name"
							label="Account Name"
							:items="this.userLists.map(user => user.name)"
						/>
						<v-text-field
							v-model="addData.nickname"
							label="Nickname"
						/>
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
						@click="addContact(addData)"
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
				<v-card-title>Update Contact</v-card-title>
				<v-divider/>
				<v-card-text>
					<v-form>
						<v-text-field
							v-model="updateData.name"
							label="Account Name"
							readonly
						/>
						<v-text-field
							v-model="updateData.nickname"
							label="Nickname"
						/>
						<v-checkbox
							v-model="updateData.delete"
							label="Delete"
						/>
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
						:color="updateData.delete ? 'error':'info'"
						@click="updateData.delete ? deleteContact(updateData) : updateContact(updateData)"
					>
						{{ updateData.delete ?  "Delete" : 'Update' }}
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
					field: 'nickname',
					tdClass: 'text-center',
					thClass: 'text-center'
				},
				{
					label: 'Action',
					field: 'action',
					sortable: false,
					tdClass: 'text-center',
					thClass: 'text-center',
					width: '100px',
				}
			],

			addDialog: false,
			addData: {
				name: null,
                nickname: null
			},

			updateDialog: false,
			updateData: {
				name: null,
                nickname: null,
                delete: false
			}
		}),
		computed: {
			...mapGetters('contacts', [
				'contactLists',
                'userLists'
			])
		},
		methods: {
			...mapActions('contacts', [
				'addContact',
				'updateContact',
                'deleteContact'
			]),

			showUpdateDialog(data) {
				this.updateData.index = data.originalIndex
				this.updateData.id = data.id
				this.updateData.name = data.name
				this.updateData.nickname = data.nickname
				this.updateDialog = true
			}
		}
	}
</script>