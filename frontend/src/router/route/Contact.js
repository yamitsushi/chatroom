import auth from '../middleware/auth'

import Preload from "@/views/Contact/Preload"
import Contacts from "@/views/Contact/Book"

export default {
    path: 'contacts',
    component: Preload,
    children: [
        {
            path: '/',
            name: 'contact.book',
            component: Contacts,
            meta: { middleware: auth }
        }
    ]
}