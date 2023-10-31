import { useState } from "react";
import { useSelector } from "react-redux";
import { Popover } from "@mui/material";


export function StationsModal({ onAddSongToStation, song}) {
    const stations = useSelector(storeState => storeState.stationModule.stations)

    const [anchorEl, setAnchorEl] = useState(null)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    function handleAdd(station) {
        setAnchorEl(null)
        onAddSongToStation(station)
    }

    const open = Boolean(anchorEl)
    const id = open ? 'nested-popover' : undefined
    // if (!isOpen) return

    return (
        <section className="stations-modal">
            <button className="add-to-station-btn" onClick={handleClick}>
                <img className='add-icon' src="./../../public/img/plus.svg" alt="" />
                <p>Add to playlist</p>
            </button>
            <button className="add-to-liked-btn">
                <img className='add-icon' src="./../../public/img/plus.svg" alt="" />
                <p>Save to your liked songs</p>
            </button>
            <Popover
                sx={{
                    "& .MuiPopover-paper": {
                        backgroundColor: "#2C2C2C"
                    }
                }}
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                }}
            >
                <ul className="stations-modal-list">
                    {stations.map(station =>
                        <li key={station._id}>
                            <button onClick={() => handleAdd(station)}>
                                {station.name}
                            </button>
                        </li>
                    )}
                </ul>
            </Popover>
        </section>
    )
}