import store from '@/store'

export default function auth({ next }) {
	if (!store.getters['user/username']) return next({ name: 'login' })
	else return next();
}