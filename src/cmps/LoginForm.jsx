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

    return <div>
        <h1>login</h1>
        <form className="login-form" onSubmit={(ev) => {
            ev.preventDefault()
            setLoginEmail("")
            setLoginPassword("")
            onLogin(loginEmail, loginPassword)
        }} >
            <input className="login-email" type="text"
                placeholder="Email"
                value={loginEmail}
                onInput={(ev) => setLoginEmail(ev.target.value)}
            />
            <input
                className="login-password"
                type="password"
                placeholder="password"
                value={loginPassword}
                onInput={(ev) => setLoginPassword(ev.target.value)}
            />

            <button>
                login
            </button>

        </form>
    </div>
}

