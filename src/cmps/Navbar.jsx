import { useState } from "react"
import { NavbarLink } from "./NavbarLink"
export function Navbar() {
    const [selected, setSelected] = useState('home');
    return <div className="navbar-container flex justify-left align-center">
        <ul className="navbar clean-list">
            <NavbarLink route='/' onSelected={() => setSelected('home')} isSelected={selected === 'home'} selectedSource="./../../public/img/selected-home.svg" source="./../../public/img/home.svg" text="Home" />
            <NavbarLink route='/search' onSelected={() => setSelected('search')} isSelected={selected === 'search'} selectedSource="./../../public/img/selected-search.svg" source="./../../public/img/search.svg" text="Search" />
        </ul>
    </div >
}