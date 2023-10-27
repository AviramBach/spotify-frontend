import { NavLink } from "react-router-dom";
import { setCurrColor } from "../store/color.actions.js"

export function NavbarLink({ route, onSelected, isSelected, source, selectedSource, text }) {
    return <li className="navbar-li">
        <NavLink className="nav-link-container" to={route} onClick={() => {
            onSelected
            setCurrColor('18, 18, 18')
        }
        }>
            <img className={`navbar-li-img ${isSelected ? 'active-img' : ''}`} src={isSelected ? selectedSource : source} alt="" />
            <span className={`nav-link ${isSelected ? 'active' : ''}`}>{text}</span>
        </NavLink>
    </li >
}