export function SongListOptionMenuContent({ onRemoveSongFromStation, songId, setIsSongOption, isSongOption }) {
    return <ul className="clean-list station-details-option-menu">

        <li className="station-details-option-menu-li" onClick={(ev) => {
            ev.stopPropagation()
            onRemoveSongFromStation(songId)
            setIsSongOption(!isSongOption)
        }}>
            <img src="https://res.cloudinary.com/dollaguij/image/upload/v1699194257/svg/delete_iwpynt.svg" alt="" />
            <p>Remove song from station</p>
        </li>
    </ul>
}