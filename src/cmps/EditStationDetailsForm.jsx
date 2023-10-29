import { useState } from "react";

export function EditStationDetailsForm({ station, handleClose, onUpdateStationDetails }) {
    const [titleInput, setTitleInput] = useState(station.name)
    return <form
        className="modal-station-form"
        onSubmit={(ev) => {
            ev.preventDefault();
            handleClose()
            onUpdateStationDetails(titleInput)
        }}
    >
        <button className="modal-station-img-btn" onClick={(ev) => {
            ev.preventDefault()
        }
        }>
            <img className="modal-station-img" src={station.imgUrl} alt="" />
        </button>
        <input className="modal-station-title" type="text" name="" id="" value={titleInput} onInput={(ev) => setTitleInput(ev.target.value)} />
        <textarea className="modal-station-description" name="" id="" cols="50" rows="20" placeholder="Add an optional description" onChange={() => onUpdateStationdesc} ></textarea>
        <button className="modal-save-button">
            Save
        </button>
        <p className="modal-station-disclaimer">
            By proceeding, you agree to give Spotify access to the image you choose to upload. Please make sure you have the right to upload the image.
        </p>
    </form>
}