import { Link } from "react-router-dom"
import { StationPreview } from "./StationPreview"
import { useSelector } from "react-redux"

export function StationList({ stations, onRemoveStation, onUpdateStation }) {
    if(!stations) stations = useSelector(storeState => storeState.stationModule.stations)

    if (!stations) return <h1>Loading...</h1>
    return (
        <ul className="station-list">
            {!stations.length && <h1>No Stations Found</h1>}
            {stations.map(station =>
                <li className="station-preview" key={station._id}>
                    <StationPreview station={station} />
                    <div>
                        <button className="btn-remove" onClick={() => onRemoveStation(station._id)}>X</button>
                        <button className="btn-edit" onClick={() => onUpdateStation(station)}>Add song</button>
                    </div>
                </li>
            )}
        </ul>
    )
}