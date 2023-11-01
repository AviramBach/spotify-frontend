import { useEffect, useState } from "react"
import { loadUsers, login } from "./../store/user.actions.js"
import { useNavigate } from "react-router"


export function LoginForm() {
    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        loadUsers()
    }, [])


    async function onLogin(loginEmail, loginPassword) {
        login(loginEmail, loginPassword)
        navigate("/")
    }

    return <div className="login-page">
        <div className="login-form-container">
            <h1 className="login-headline">Login to Songify</h1>
            <form className="login-form" onSubmit={(ev) => {
                ev.preventDefault()
                setLoginEmail("")
                setLoginPassword("")
                onLogin(loginEmail, loginPassword)
            }} >
                <label htmlFor="email">Email</label>
                <input className="login-email"
                    stype="text"
                    name="email"
                    placeholder="Email"
                    value={loginEmail}
                    onInput={(ev) => setLoginEmail(ev.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                    className="login-password"
                    type="password"
                    name="password"
                    placeholder="password"
                    value={loginPassword}
                    onInput={(ev) => setLoginPassword(ev.target.value)}
                />

                <button className="login-signup-btn">
                    login
                </button>

            </form>
            <a className="login-signup-link" href="/signup">Don't have an account? join songify</a>
        </div>
    </div>
}

