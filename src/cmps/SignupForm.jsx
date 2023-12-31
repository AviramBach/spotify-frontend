import { useEffect, useState } from "react"
import { loadUsers, signup } from "./../store/user.actions.js"
import { useNavigate } from "react-router"
import { socketService } from "../services/socket.service.js"
export function SignupForm() {
    const [signupEmail, setSignupEmail] = useState("")
    const [signupfullname, setSignupfullname] = useState("")
    const [signupPassword, setSignupPassword] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        loadUsers()
    }, [])


    async function onSignup(email, fullname, password) {
        const user = await signup(email, fullname, password)
        socketService.login(user._id)
        navigate("/")
    }

    return <div className="signup-page" >
        <div className="signup-form-container">
            <h1>Sign up to Songify</h1>
            <form className="signup-form" onSubmit={(ev) => {
                ev.preventDefault()
                setSignupEmail("")
                setSignupfullname("")
                setSignupPassword("")
                onSignup(signupEmail, signupfullname, signupPassword)
            }} >
                <label htmlFor="email">Email</label>
                <input className="signup-email"
                    required
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={signupEmail}
                    onInput={(ev) => setSignupEmail(ev.target.value)}
                />

                <label htmlFor="fullname">Full name</label>
                <input className="signup-fullname"
                    required
                    type="text"
                    name="fullname"
                    placeholder="Full name"
                    value={signupfullname}
                    onInput={(ev) => setSignupfullname(ev.target.value)}
                />
                <label htmlFor="passwoed">Password</label>
                <input
                    className="signup-password"
                    required
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={signupPassword}
                    onInput={(ev) => setSignupPassword(ev.target.value)}
                />

                <button className="login-signup-btn">
                    Sign up
                </button>
            </form>
            <a className="login-signup-link" href="/login">Already have an account? login to songify</a>
        </div>
    </div>
}
