import { HomePage } from './pages/HomePage.jsx'
import { CarIndex } from './pages/CarIndex.jsx'



// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path: '/',
        component: <HomePage />,
        label: 'Home 🏠',
    },

    {
        path: 'car',
        component: <CarIndex />,
        label: 'Cars'
    },
]

export default routes