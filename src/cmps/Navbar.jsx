import { Link, NavLink } from "react-router-dom"

import(Link)
export function Navbar() {
    return <div className="navbar-container flex justify-left align-center">
        <ul className="navbar clean-list">
            <li className="navbar-li">
                <NavLink to="/">
                    <img className="navbar-li-img" src="public/img/spotify android icons 24px (Community)/Home Icon.png" alt="" />
                    <span className="nav-link">Home</span>
                </NavLink>
            </li>
            <li className="navbar-li">
                <NavLink to='/search'>
                    <img className="navbar-li-img" src="public/img/spotify android icons 24px (Community)/Search Icon.png" alt="" />
                    <span className="nav-link" >Search</span>
                </NavLink>
            </li>
        </ul>
    </div>
}