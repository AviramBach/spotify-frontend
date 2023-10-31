import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect } from "react";

export function AppHeader() {
    const currColor = useSelector(storeState => storeState.colorModule.currColor)
    const navigate = useNavigate();
    useEffect(() => {
        console.log('currColor', currColor)
    }, [currColor])
    const goBack = () => {
        navigate(-1);
    };
    const goForward = () => {
        navigate(1);
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

            <div>
                <a className='signup-a' href="#">sign up</a>
                <button className='login-button'>
                    <span>login</span>
                </button>
            </div>
        </header>
    )
}