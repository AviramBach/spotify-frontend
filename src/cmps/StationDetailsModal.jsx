import { EditStationDetailsForm } from "./EditStationDetailsForm";

export function StationDetailsModal({ station, handleClose, onUpdateStationName, onUpdateStationdesc, onUpdateStationImage }) {
    return <div className="modal-container" >
        <div className="modal">
            <div className="modal-header">
                <h1 className="modal-headline">Edit details</h1>
                <button className="modal-close-button" onClick={() => { handleClose }}>
                    <img className="modal-close-button-img" src="./../../public/img/x.svg" alt="" onClick={() => handleClose} />
                </button>
            </div>
            <div className="modal-body">
                <EditStationDetailsForm
                    station={station}
                    handleClose={handleClose}
                    onUpdateStationName={onUpdateStationName}
                    onUpdateStationdesc={onUpdateStationdesc}
                    onUpdateStationImage={onUpdateStationImage}
                />
            </div>
        </div>
    </div>
}