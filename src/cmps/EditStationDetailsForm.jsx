export function EditStationDetailsForm({ station, onUpdateStationDetails }) {
    return <form
        className="modal-station-form"
        onSubmit={(ev) => {
            ev.preventDefault();
            onUpdateStationDetails()
        }}
    >
        <button className="modal-station-img-btn" onClick={(ev) => {
            ev.preventDefault()
            onUpdateStationImg()
        }
        }>
            <img className="modal-station-img" src={station.imgUrl} alt="" />
        </button>
        <input className="modal-station-title" type="text" name="" id="" value={station.name} onChange={() => onUpdateStationDetails} />
        <textarea className="modal-station-description" name="" id="" cols="50" rows="20" placeholder="Add an optional description" onChange={() => onUpdateStationdesc} ></textarea>
        <button className="modal-save-button">
            save
        </button>
        <p className="modal-station-disclaimer">
            By proceeding, you agree to give Spotify access to the image you choose to upload. Please make sure you have the right to upload the image.
        </p>
    </form>
}