import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service"
import { addStation } from "../store/station.actions.js";
import { stationService } from "../services/station.service.js";

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

    async function onInviteRequest(user) {
        const accept = confirm(`${user.fullname} invited you to make a joint playlist`)
        if (!accept) {
            socketService.emit(SOCKET_EMIT_REQUEST_STATUS, { currUser, user, status: accept })
            return
        }
        const jointStation = await onCreateJointStation(user)
        socketService.emit(SOCKET_EMIT_REQUEST_STATUS, { jointStation, currUser, user, status: accept })

    }

    function onSendInvite() {
        const userEmail = prompt('Enter user Email', 'Enter Email')
        const data = { userEmail, currUser }
        socketService.emit(SOCKET_EMIT_SEND_INVITE, data)
        console.log('sending request')
    }

    async function onCreateJointStation(user) {
        const jointStation = stationService.getJointStation(currUser, user)
        jointStation.createdAt = Date.now()
        try {
            const savedStation = await addStation(jointStation)
            navigate(`/station/${savedStation._id}`)
            return savedStation
            // showSuccessMsg(`Station added (id: ${savedStation._id})`)
        } catch (err) {
            // showErrorMsg('Cannot add station')
        }

        return (
            <section className="library-filter">
                <label htmlFor="txt">
                    <div className="icon-container">
                        <img className="search-icon" src="https://res.cloudinary.com/dollaguij/image/upload/v1699194280/search_icsjot.svg" alt="" />
                    </div>
                    <input type="text" name="txt" id="txt" onInput={setNewFilter} placeholder="Search" />
                </label>
                <button className="sort" onClick={() => setIsSelect(!isSelect)}>
                    <span>{(filterBy.sortBy === 'createdAt') ? 'Recents' : (filterBy.sortBy === 'name') ? 'Alphabetical' : 'Creator'}</span>
                    <img className="station-details-svg-btn-img" src="https://res.cloudinary.com/dollaguij/image/upload/v1699194287/svg/sort_ys5buy.svg" alt="" />
                </button>
                {isSelect && <section className="select-modal">
                    <button className={`select-option ${(filterBy.sortBy === 'createdAt') ? 'active' : ''}`}
                        onClick={() => setNewFilter({ target: { name: 'sortBy', value: 'createdAt' } })}><span>Recents</span>
                        {(filterBy.sortBy === 'createdAt') &&
                            <img className={"station-details-svg-img"} src="https://res.cloudinary.com/dollaguij/image/upload/v1699194254/svg/checked_paj0fg.svg" alt="" />
                        }
                    </button>
                    <button className={`select-option ${(filterBy.sortBy === 'name') ? 'active' : ''}`}
                        onClick={() => setNewFilter({ target: { name: 'sortBy', value: 'name' } })}><span>Alphabetical</span>
                        {(filterBy.sortBy === 'name') &&
                            <img className={"station-details-svg-img"} src="https://res.cloudinary.com/dollaguij/image/upload/v1699194254/svg/checked_paj0fg.svg" alt="" />
                        }
                    </button>
                    <button className={`select-option ${(filterBy.sortBy === 'creator') ? 'active' : ''}`}
                        onClick={() => setNewFilter({ target: { name: 'sortBy', value: 'creator' } })}><span>Creator</span>
                        {(filterBy.sortBy === 'creator') && <img className={"station-details-svg-img"} src="https://res.cloudinary.com/dollaguij/image/upload/v1699194254/svg/checked_paj0fg.svg" alt="" />
                        }
                    </button>
                </section>}
                {
                    currUser && <section onClick={() => onSendInvite()}>
                        <span >Create new Blend</span>
                    </section>
                }
            </section>
        )
    }
}