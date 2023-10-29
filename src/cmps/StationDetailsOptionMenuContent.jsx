import { useState } from "react";
import { StationDetailsModal } from "./StationDetailsModal";
import { Modal } from '@mui/material';
import { Box } from '@mui/material';
// import { Typography } from '@mui/material';

export function StationDetailsOptionMenuContent({ station, onRemoveStation, onUpdateStationDetails }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    };

    return <div>
        <ul className="clean-list station-details-option-menu">
            <li className="station-details-option-menu-li" onClick={handleOpen}>
                <img src="./../../public/img/edit.svg" alt="" />
                <p>Edit station</p>
            </li>
            <li className="station-details-option-menu-li" onClick={() => onRemoveStation()}>
                <img src="./../../public/img/delete.svg" alt="" />
                <p>Remove station</p>
            </li>
        </ul>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <StationDetailsModal station={station} handleClose={handleClose} onUpdateStationDetails={onUpdateStationDetails} />
            </Box>
        </Modal>
    </div>
}
