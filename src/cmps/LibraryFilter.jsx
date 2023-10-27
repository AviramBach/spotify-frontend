import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service"

export function LibraryFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const [isSelect, setIsSelect] = useState(false)
    onSetFilter = useRef(utilService.debounce(onSetFilter))

    useEffect(() => {
        onSetFilter.current(filterByToEdit)

    }, [filterByToEdit])

    function setNewFilter({ target }) {
        setIsSelect(false)
        const field = target.name
        const value = target.value
        const newFilter = { ...filterBy, [field]: value }
        setFilterByToEdit(newFilter)
    }

    return (
        <section className="library-filter">
            <label htmlFor="txt">
                <div className="icon-container">
                    <img className="search-icon" src="./../../public/img/search.svg" alt="" />
                </div>
                <input type="text" name="txt" id="txt" onInput={setNewFilter} placeholder="Search" />
            </label>
            <button className="sort" onClick={() => setIsSelect(!isSelect)}>
                <span>{(filterBy.sortBy === 'createdAt') ? 'Recents' : (filterBy.sortBy === 'name') ? 'Alphabetical' : 'Creator'}</span>
                <img className="station-details-svg-btn-img" src="./../../public/img/options.svg" alt="" />
            </button>
            {isSelect && <section className="select-modal">
                <button className={`select-option ${(filterBy.sortBy === 'createdAt') ? 'active' : ''}`} onClick={() => setNewFilter({ target: { name: 'sortBy', value: 'createdAt' } })}><span>Recents</span>{(filterBy.sortBy === 'createdAt') && <span>✓</span>}</button>
                <button className={`select-option ${(filterBy.sortBy === 'name') ? 'active' : ''}`} onClick={() => setNewFilter({ target: { name: 'sortBy', value: 'name' } })}><span>Alphabetical</span>{(filterBy.sortBy === 'name') && <span>✓</span>}</button>
                <button className={`select-option ${(filterBy.sortBy === 'creator') ? 'active' : ''}`} onClick={() => setNewFilter({ target: { name: 'sortBy', value: 'creator' } })}><span>Creator</span>{(filterBy.sortBy === 'creator') && <span>✓</span>}</button>
            </section>}
        </section>
    )
}