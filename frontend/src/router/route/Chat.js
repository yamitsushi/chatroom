import auth from '../middleware/auth'

import Preload from "@/views/Chat/Preload"
import Rooms from "@/views/Chat/Room"

import Message from "@/views/Chat/Message"

export default {
    path: 'room',
    component: Preload,
    children: [
        {
            path: '/',
            name: 'chat.room',
            component: Rooms,
            meta: { middleware: auth }
        },
        {
            path: ':id',
            name: 'chat.message',
            component: Message,
            meta: { middleware: auth }
        }
    ]
}