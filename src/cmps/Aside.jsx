import { Navbar } from './Navbar'
import { Library } from "./Library";
export function Aside() {
    return <nav className='aside'>
        <Navbar />
        <Library />
    </nav>
}