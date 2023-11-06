import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react";
import { logout } from "./../store/user.actions.js"
import { setCurrColor } from "../store/color.actions.js";
import { SOCKET_EMIT_REQUEST_STATUS, SOCKET_EMIT_SEND_INVITE, SOCKET_EVENT_INVITE_ANSWER, SOCKET_EVENT_INVITE_REQUEST, socketService } from "../services/socket.service.js";
import { addStation } from "../store/station.actions.js";
import { stationService } from "../services/station.service.js";
import { Popover } from "@mui/material";

export function AppHeader() {
    const currUser = useSelector(storeState => storeState.userModule.user)
    const currColor = useSelector(storeState => storeState.colorModule.currColor)
    const navigate = useNavigate();

    const [anchorEl1, setAnchorEl1] = useState(null);
    const [anchorEl2, setAnchorEl2] = useState(null);
    const [userInvite, setUserInvite] = useState(null);
    const handleClick1 = (event) => {
        setAnchorEl1(event.currentTarget);
    };
    const handleClose1 = () => {
        setAnchorEl1(null);
    };
    const open1 = Boolean(anchorEl1);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '54%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgb(40, 40, 40)',
        boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
        borderRadius: '8px',
    };

    useEffect(() => {
        socketService.on(SOCKET_EVENT_INVITE_REQUEST, onInviteRequest)
        socketService.on(SOCKET_EVENT_INVITE_ANSWER, onInviteAnswer)

        return () => {
            socketService.off(SOCKET_EVENT_INVITE_REQUEST, onInviteRequest)
        }
    }, [])

    useEffect(() => {
    }, [currColor])
    const goBack = () => {
        navigate(-1);
        if (navigate(-1) === "/" || "/search") {
            setCurrColor("18,18,18")
        }
    };
    const goForward = () => {
        navigate(1);
        if (navigate(1) === "/" || "/search") {
            setCurrColor("18,18,18")
        }
    };

    async function onInviteRequest(user) {
        setUserInvite(user)
    }

    async function sendAnswer(accept) {
        setUserInvite(null)
        if (!accept) {
            return
        }
        const jointStation = await onCreateJointStation(userInvite)
        socketService.emit(SOCKET_EMIT_REQUEST_STATUS, { jointStation, currUser, user: userInvite, status: accept })
    }

    function onSendInvite(ev) {
        ev.preventDefault()
        const form = ev.target
        const userEmail = form['email'].value
        const data = { userEmail, currUser }
        socketService.emit(SOCKET_EMIT_SEND_INVITE, data)
        console.log(`sending request to ${userEmail}`)
        handleClose1()
    }

    function onInviteAnswer(answer) {
        if (!answer.status) {
            alert('sorry your invitation was declined :(')
            return
        }
        console.log(answer)
        navigate(`/station/${answer.jointStation._id}`)
    }

    async function onCreateJointStation(user) {
        const jointStation = stationService.getJointStation(currUser, user)
        jointStation.createdAt = Date.now()
        try {
            const savedStation = await addStation(jointStation)
            navigate(`/station/${savedStation._id}`)
            return savedStation
            // showSuccessMsg(`Station added (id: ${savedStation._id})`)
        } catch (err) {
            // showErrorMsg('Cannot add station')
        }

    }
    return (
        <header className="app-header flex" style={{ backgroundColor: `rgb(${currColor ?? "0,0,0"})` }}>
            <div className='arrow-button-container flex'>
                <button onClick={goBack} className='arrow-button'>
                    <img className='arrow-button-icon' src="https://res.cloudinary.com/dollaguij/image/upload/v1699194252/back_zfwsnj.svg" alt="" />
                </button>
                <button onClick={goForward} className='arrow-button'>
                    <img className='arrow-button-icon' src="https://res.cloudinary.com/dollaguij/image/upload/v1699194261/forward_ohmney.svg" alt="" />
                </button>
            </div>
            {currUser ?
                <div className="logged-in-btn-container">
                    <button className="blend-btn" onClick={(ev) => handleClick1(ev)}>Invite friend</button>
                    <button className="user-menu-btn" onClick={() => { logout() }}>
                        <img src={currUser.imgUrl} alt="" />
                    </button>
                    <Popover
                        sx={{
                            "& .MuiPopover-paper": {
                                // position: 'absolute',
                                // top: '50%',
                                // left: '54%',
                                transform: 'translate(-50%, -50%)',
                                backgroundColor: 'rgb(40, 40, 40)',
                                boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
                                borderRadius: '8px',

                            }
                        }}
                        onClick={ev => ev.stopPropagation()}
                        className={"send-invite-popover"}
                        open={open1}
                        anchorEl={anchorEl1}
                        onClose={handleClose1}
                        anchorReference="anchorPosition"
                        anchorPosition={{ top: 300, left: 650 }}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        <div style={
                            {
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: "center",
                            }
                        }>
                            <h3 className="invitation-header">invite a friend to create a blend</h3>
                            <form onSubmit={onSendInvite}>
                                <input className="invitation-input" type="text" name="email" placeholder="Enter User Email" />
                            </form>
                        </div>
                    </Popover>
                    {
                        userInvite && <div className="invitation-container">
                            <p>{`${userInvite.fullname} invited you to make a blended playlist`}</p>
                            <div className="invitation-btn-container">
                                <button className="invitation-btn" onClick={() => sendAnswer(true)}>
                                    Accept
                                </button>
                                <button className="invitation-btn" onClick={() => sendAnswer(false)}>
                                    Decline
                                </button>
                            </div>
                        </div>
                    }

                </div >
                : <div>
                    <a className='signup-a' href="/signup">sign up</a>
                    <button className='login-button' onClick={() => navigate('/login')}>
                        <span>login</span>
                    </button>
                </div>
            }


        </header >
    )
}