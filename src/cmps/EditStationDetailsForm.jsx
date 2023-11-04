import { useState } from "react";

export function EditStationDetailsForm({ station, handleClose, onUpdateStationDetails, onUpdateStationImage }) {
    const [titleInput, setTitleInput] = useState(station.name)
    const [descInput, setDescInput] = useState(station.desc)
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = (ev) => {
                const base64Image = ev.target.result;
                onUpdateStationImage(base64Image)
            };

            reader.readAsDataURL(file);
        }
    };
    return <form
        className="modal-station-form"
        onSubmit={(ev) => {
            ev.preventDefault();
            handleClose()
            onUpdateStationDetails(titleInput, descInput)
        }}
    >
        <label className="modal-station-img-btn" htmlFor="file-input">
            <input
                id="file-input"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
            />
            <img className="modal-station-img" src={station.imgUrl} alt="" />
        </label>
        <input className="modal-station-title"
            type="text"
            value={titleInput}
            onInput={(ev) => {
                ev.stopPropagation()
                setTitleInput(ev.target.value)
            }} />
        <textarea className="modal-station-description"
            cols="50"
            rows="20"
            placeholder="Add an optional description"
            value={descInput}
            onInput={(ev) => setDescInput(ev.target.value)} >
        </textarea>

        <button className="modal-save-button">
            Save
        </button>

        <p className="modal-station-disclaimer">
            By proceeding, you agree to give Spotify access to the image you choose to upload. Please make sure you have the right to upload the image.
        </p>
    </form>
}