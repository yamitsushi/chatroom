import auth from './middleware/auth'
import guest from './middleware/guest'

import Login from "@/views/Login"
import Register from "@/views/Register"

import Template from "@/components/Template"

import Dashboard from "@/views/Dashboard"
import Setting from "@/views/Setting"

import Contact from "./route/Contact"
import Chat from "./route/Chat"

export default [
	{
		path: '/register',
		name: 'register',
		component: Register,
		meta: { middleware: guest }
	},
	{
		path: '/login',
		name: 'login',
		component: Login,
		meta: { middleware: guest }
	},
	{
		path: '/',
		component: Template,
		children: [
			{
				path: '/',
				name: 'dashboard',
				component: Dashboard,
				meta: { middleware: auth }
			},
			{
				path: '/settings',
				name: 'setting',
				component: Setting,
				meta: { middleware: auth }
			},

			Contact,
			Chat
		]
	}
]