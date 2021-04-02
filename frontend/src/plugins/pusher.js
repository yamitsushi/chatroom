import Vue from 'vue'
import Echo from 'laravel-echo'

window.Pusher = require('pusher-js');

const instance = new Echo({
    authEndpoint : process.env.VUE_APP_URL + 'laravel-websockets/auth',
    broadcaster: 'pusher',
    key: "asdfasdf",
    cluster: "mt1",
    wsHost: "localhost",
    wsPort: 6001,
    forceTLS: false,
    disableStats: true
})

const  pusherPlugin = {
	install(Vue) {
		Vue.prototype.$echo = instance;
	}
}

Vue.use(pusherPlugin)

export default pusherPlugin