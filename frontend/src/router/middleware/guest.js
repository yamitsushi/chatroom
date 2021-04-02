import store from '@/store'

export default function guest({ next }) {
	if (store.getters['user/username']) return next({ name: 'dashboard' })
	else return next();
}