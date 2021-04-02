import Vue from 'vue'
import Moment from 'moment'

const  momentPlugin = {
	install(Vue) {
		Vue.prototype.$moment = Moment
	}
}

Vue.use(momentPlugin)

export default momentPlugin