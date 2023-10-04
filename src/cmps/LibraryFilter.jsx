import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service"

export function LibraryFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    // onSetFilter = useRef(utilService.debounce(onSetFilter))

    useEffect(() => {
        // onSetFilter.current(filterByToEdit)
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function setNewFilter({ target }) {
        const field = target.name
        const value = target.value
        const newFilter = { ...filterBy, [field]: value }
        setFilterByToEdit(newFilter)
    }
    return (
        <section className="library-filter">
            <label htmlFor="txt">
                🔎
                <input type="text" name="txt" id="txt" placeholder="Search in Your Library" onInput={setNewFilter} />
            </label>
            <select name="sortBy" onChange={setNewFilter}>
                <option value="createdAt">Recents</option>
                <option value="name">Alphabetical</option>
            </select>
        </section>
    )
}