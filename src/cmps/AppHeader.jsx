import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import routes from '../routes'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/user.actions.js'
import { LoginSignup } from './LoginSignup.jsx'

export function AppHeader() {
    return (
        <header className="app-header flex">
            <div className='arrow-button-container flex'>
                <button className='arrow-button'>
                    <img className='arrow-button-icon' src="public/img/spotify android icons 24px (Community)/Back Navigation.png" alt="" />
                </button>
                <button className='arrow-button'>
                    <img className='arrow-button-icon' src="public/img/spotify android icons 24px (Community)/Forward Navigation.png" alt="" />
                </button>
            </div>

            <div>
                <a className='signup-a' href="#">sign up</a>
                <button className='login-button'>
                    <span>login</span>
                </button>
            </div>
        </header>
    )
}