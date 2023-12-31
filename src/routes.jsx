import { Library } from './cmps/Library.jsx'
import { LoginForm } from './cmps/LoginForm.jsx'
import { SignupForm } from './cmps/SignupForm.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { SearchPage } from './pages/SearchPage.jsx'
import { SongDetails } from './pages/SongDetails.jsx'
import { StationDetails } from './pages/StationDetails.jsx'



// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path: '/',
        component: <HomePage />,
        label: 'Home',
    },
    {
        path: '/search',
        component: <SearchPage />,
        label: 'search'
    },
    {
        path: '/library',
        component: <Library />,
        label: 'library'
    },
    {
        path: 'station/:id',
        component: <StationDetails />,
        label: 'station details'
    },
    {
        path: 'song-details',
        component: <SongDetails />,
        label: 'song details'
    },
    {
        path: "/login",
        component: <LoginForm />,
        label: 'login'
    },
    {
        path: "/signup",
        component: <SignupForm />,
        label: 'sign up'
    },


]

export default routes

