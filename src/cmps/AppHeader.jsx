import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect } from "react";
import { logout } from "./../store/user.actions.js"
import { setCurrColor } from "../store/color.actions.js";

export function AppHeader() {
    const currUser = useSelector(storeState => storeState.userModule.user)
    const currColor = useSelector(storeState => storeState.colorModule.currColor)
    const navigate = useNavigate();

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
                <button className="user-menu-btn" onClick={() => { logout() }}>
                    <img src={currUser.imgUrl} alt="" />
                </button>
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