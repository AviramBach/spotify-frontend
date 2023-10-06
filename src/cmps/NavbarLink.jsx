import { NavLink } from "react-router-dom";

export function NavbarLink({ route, onSelected, isSelected, source, selectedSource, text }) {
    return <li className="navbar-li">
        <NavLink className="nav-link-container" to={route} onClick={onSelected}>
            <img className={`navbar-li-img ${isSelected ? 'active-img' : ''}`} src={isSelected ? selectedSource : source} alt="" />
            <span className={`nav-link ${isSelected ? 'active' : ''}`}>{text}</span>
        </NavLink>
    </li>
}