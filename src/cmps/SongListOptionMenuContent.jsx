export function SongListOptionMenuContent({ onRemoveSongFromStation, songId, setIsSongOption, isSongOption }) {
    return <ul className="clean-list station-details-option-menu">

        <li className="station-details-option-menu-li" onClick={(ev) => {
            ev.stopPropagation()
            onRemoveSongFromStation(songId)
            setIsSongOption(!isSongOption)
        }}>
            <img src="./../../public/img/delete.svg" alt="" />
            <p>Remove song from station</p>
        </li>
    </ul>
}