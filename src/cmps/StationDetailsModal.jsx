import { EditStationDetailsForm } from "./EditStationDetailsForm";

export function StationDetailsModal({ station, handleClose, onUpdateStationDetails, onUpdateStationImage }) {
    return <div className="modal-container" >
        <div className="modal">
            <div className="modal-header">
                <h1 className="modal-headline">Edit details</h1>
                <button className="modal-close-button" onClick={() => { handleClose }}>
                    <img className="modal-close-button-img" src="https://res.cloudinary.com/dollaguij/image/upload/v1699194245/svg/x_ti24ab.svg" alt="" onClick={() => handleClose} />
                </button>
            </div>
            <div className="modal-body">
                <EditStationDetailsForm
                    station={station}
                    handleClose={handleClose}
                    onUpdateStationDetails={onUpdateStationDetails}
                    onUpdateStationImage={onUpdateStationImage}
                />
            </div>
        </div>
    </div>
}