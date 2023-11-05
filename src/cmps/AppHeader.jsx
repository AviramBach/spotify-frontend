import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect } from "react";
import { logout } from "./../store/user.actions.js"
import { setCurrColor } from "../store/color.actions.js";
import { SOCKET_EMIT_REQUEST_STATUS, SOCKET_EMIT_SEND_INVITE, SOCKET_EVENT_INVITE_ANSWER, SOCKET_EVENT_INVITE_REQUEST, socketService } from "../services/socket.service.js";
import { addStation } from "../store/station.actions.js";
import { stationService } from "../services/station.service.js";

export function AppHeader() {
    const currUser = useSelector(storeState => storeState.userModule.user)
    const currColor = useSelector(storeState => storeState.colorModule.currColor)
    const navigate = useNavigate();

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
        const accept = confirm(`${user.fullname} invited you to make a joint playlist`)
        if (!accept) {
            socketService.emit(SOCKET_EMIT_REQUEST_STATUS, { currUser, user, status: accept })
            return
        }
        const jointStation = await onCreateJointStation(user)
        socketService.emit(SOCKET_EMIT_REQUEST_STATUS, { jointStation, currUser, user, status: accept })

    }

    function onSendInvite() {
        const userEmail = prompt('Enter user Email', 'Enter Email')
        const data = { userEmail, currUser }
        socketService.emit(SOCKET_EMIT_SEND_INVITE, data)
        console.log('sending request')
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
                    <img className='arrow-button-icon' src="./../../public/img/back.svg" alt="" />
                </button>
                <button onClick={goForward} className='arrow-button'>
                    <img className='arrow-button-icon' src="./../../public/img/forward.svg" alt="" />
                </button>
            </div>
            {currUser ?
                <div className="logged-in-btn-container">
                    <button className="blend-btn" onClick={() => onSendInvite()}>Invite friend</button>
                    <button className="user-menu-btn" onClick={() => { logout() }}>
                        <img src={currUser.imgUrl} alt="" />
                    </button>
                </div>
                : <div>
                    <a className='signup-a' href="/signup">sign up</a>
                    <button className='login-button' onClick={() => navigate('/login')}>
                        <span>login</span>
                    </button>
                </div>
            }


        </header>
    )
}