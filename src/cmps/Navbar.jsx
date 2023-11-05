import { useState } from "react"
import { NavbarLink } from "./NavbarLink"
export function Navbar() {
    const [selected, setSelected] = useState('home');
    return <div className="navbar-container flex justify-left align-center">
        <ul className="navbar clean-list">
            <NavbarLink route='/'
                onSelected={() => setSelected('home')}
                isSelected={selected === 'home'} selectedSource=".https://res.cloudinary.com/dollaguij/image/upload/v1699194283/svg/selected-home_sdspes.svg" source="https://res.cloudinary.com/dollaguij/image/upload/v1699194264/svg/home_l4p7sr.svg" text="Home" />
            <NavbarLink route='/search'
                onSelected={() => setSelected('search')}
                isSelected={selected === 'search'} selectedSource="https://res.cloudinary.com/dollaguij/image/upload/v1699194284/svg/selected-search_t3upeo.svg" source="https://res.cloudinary.com/dollaguij/image/upload/v1699194280/svg/search_icsjot.svg" text="Search" />
            <div className="library-nav-link">
                <NavbarLink route='/library'
                    onSelected={() => setSelected('library')}
                    isSelected={selected === 'library'} selectedSource="https://res.cloudinary.com/dollaguij/image/upload/v1699194220/svg/empty-library_vbnmu6.svg" source="https://res.cloudinary.com/dollaguij/image/upload/v1699194265/svg/library_ipsfnu.svg" text="Library" />
            </div>
        </ul>
    </div >
}