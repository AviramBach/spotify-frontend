import { Link, useNavigate } from "react-router-dom";
import { Draggable } from "react-beautiful-dnd";

export function StationPreview({ station, index }) {
    const navigate = useNavigate()
    return (
        <Draggable draggableId={station._id} index={index}>
            {(provided) => (

                <article
                    onClick={() => navigate(`/station/${station._id}`)}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    innerRef={provided.innerRef}
                >
                    {station.imgUrl && <img src={station.imgUrl} alt="" />}
                    {!station.imgUrl && <img src="public/img/spotify.png" alt="" />}
                    <div>
                        <h1>{station.name}</h1>
                        <p>{station.songs.length} {(station.songs.length === 1) ? ' song' : ' songs'} <span>- {station.createdBy}</span> </p>
                    </div>
                </article>
            )}
        </Draggable>
    )
}