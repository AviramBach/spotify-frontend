export function EditStationDetailsForm({ station, handleClose, onUpdateStationImg, onUpdateStationName, onUpdateStationdesc }) {
    return <form
        onSubmit={(ev) => {
            ev.preventDefault();
            onEditStationDetails(toyService.createToy(name, price, labels, true))
        }}
    >
        <button onClick={(ev) => {
            ev.preventDefault()
            onUpdateStationImg()
        }
        }>
            <img className="modal-station-img" src={station.imgUrl} alt="" />
        </button>
        <input className="modal-station-title" type="text" name="" id="" placeholder={station.title} onChange={() => onUpdateStationName} />
        <textarea className="modal-station-description" name="" id="" cols="30" rows="10" placeholder={station.title} onChange={() => onUpdateStationdesc} ></textarea>
        <button className="modal-save-button">
            save
        </button>
    </form>
}