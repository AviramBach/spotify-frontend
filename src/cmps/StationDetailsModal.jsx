import { EditStationDetailsForm } from "./EditStationDetailsForm";

export function StationDetailsModal({ station, handleClose, onUpdateStationImg, onUpdateStationName, onUpdateStationdesc }) {

    return <div className="modal-container" >
        <div className="modal">
            <div className="modal-header">
                <h1>Edit details</h1>
                <button className="modal-close-button">
                    <img className="modal-close-button-img" src="./../../public/img/x.svg" alt="" onClick={() => handleClose} />
                </button>
            </div>
            <div className="modal-body">
                <EditStationDetailsForm />
            </div>
        </div>
    </div>
}