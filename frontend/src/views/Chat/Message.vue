<template>
    <v-card width="1200" class="mx-auto mt-5">
        <v-card-title>
            <h3>{{nickname}} test</h3>
        </v-card-title>
        <v-divider/>
        <v-card-text>
            <ul class="list-unstyled" style="height:300px; overflow-y:scroll" v-chat-scroll>
                <li class="p-2" v-for="message in messages" :key="message.id" >
                    <strong>{{ message.user.name }}</strong>
                    {{ message.message }}
                </li>
            </ul>
        </v-card-text>
        <v-divider/>
        <v-card-actions>
            <v-text-field
                @keyup.enter="sendMessage"
                type="text"
                name="message"
                v-model="addMessage.message"
                placeholder="Enter your message..."
                class="form-control"
            />
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        data: () => ({
            messages: [],
            addMessage: {message: null},
            nickname: "test"
        }),
        created() {
            this.loadMessage()
            this.EchoListen()
        },

        methods: {
            loadMessage() {
                this.$axios.get('/rooms/' + this.$route.params.id + '/messages').then(response => this.messages = response.data)
            },
            EchoListen() {
                this.$echo.channel('room.' + this.$route.params.id)
                .listen('SendMessage', (response) => {
                    this.messages.push(response.message)
                });
            },
            sendMessage() {
                this.$axios.post('/rooms/' + this.$route.params.id + '/messages', this.addMessage).then(() => this.addMessage.message = null)
            }
        }
    }
</script>