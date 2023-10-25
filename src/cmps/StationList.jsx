import { useNavigate } from "react-router"
import { setCurrSong, setCurrStation, setNextSong, setPrevSong, toggelIsPlaying } from "../store/player.actions"
import { StationPreview } from "./StationPreview"
import { useSelector } from "react-redux"
import { DragDropContext } from "react-beautiful-dnd"
import { Droppable } from "react-beautiful-dnd"
import { useRef } from "react"

export function StationList({ stations, dropId }) {
    const navigate = useNavigate()
    const myRef = useRef(null)

    function onPlaySongFromStation(station, song, ev) {
        ev.stopPropagation()

        if (!song) song = station.songs[0]
        setCurrStation(station)
        setCurrSong(song)
        setNextSong(song, station)
        setPrevSong(song, station)
        toggelIsPlaying(false)
    }

    function onDragEnd() {
        console.log('drag end')
    }

    if (!stations) return <h1>Loading...</h1>
    return (
        <DragDropContext onDragEnd={() => onDragEnd()}>
            <Droppable droppableId={dropId}>
                {(provided) => (
                    <ul className="station-list"
                        innerRef={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {!stations.length && <h1>No Stations Found</h1>}
                        {stations.map((station, index) =>
                            <li className="station-preview" key={station._id} onClick={() => navigate(`/station/${station._id}`)}>
                                <StationPreview station={station} index={index} />
                                <button className="primary-play-button" onClick={(ev) => onPlaySongFromStation(station, null, ev)}>
                                    <img className="primary-play-button-img" src="./../../public/img/play.svg" alt="" />
                                </button>
                            </li>
                        )}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
    )
}