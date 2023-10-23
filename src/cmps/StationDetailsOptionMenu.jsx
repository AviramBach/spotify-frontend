export function StationDetailsOptionMenu({ onRemoveStation, onUpdateStation, onUpdateStationDetails, isOption, setIsOption }) {
    return <div className="station-details-option-menu-container">
        <ul className="clean-list station-details-option-menu">

            <li onClick={() => { onUpdateStation() }}>
                <p>Add song</p>
            </li>
            <li onClick={() => onUpdateStationDetails()}>
                <p>Edit station</p>
            </li>
            <li onClick={() => {
                onRemoveStation()
            }}>
                <p>Remove station</p>
            </li>
        </ul>
    </div >
}