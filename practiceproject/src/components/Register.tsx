import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs'

export default function Register() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('')

    const userName = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);

    async function handleRegister() {
        if (userName.current.value.length === 0 || password.current.value.length === 0) {
            setErrorMessage("Username or password is empty")
        }
        const hash = bcrypt.hashSync(password.current.value, "$2a$11$test123456789012345678");
        //console.log(hash)
        const response = await fetch('https://localhost:7044/api/Users/register', {
            method: 'POST',
            body: JSON.stringify({ username: userName.current.value, password: hash }),
            headers: {
                "Content-Type": "application/json",
            },
        })
        if (!response.ok) {
            const message = await response.text()
            setErrorMessage(message)
            return
        }  
        navigate('/')
    }

    return (
        <div className="mt-5 container">
            <div className="mx-auto col-lg-4 col-md-6 col-sm-8 text-center">
                <h1 className="text-center">Register</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">User name</label>
                        <input ref={userName} type="text" className="form-control" id="username" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input ref={password} type="password" className="form-control" id="password" required />
                    </div>
                    {errorMessage && <div className="alert alert-danger" role="alert">
                        {errorMessage}
                    </div>}
                    
                    <div className="d-grid mb-3">
                        <button type="button" className="mx-auto mt-2 col-6 btn btn-warning" onClick={handleRegister}>Register</button>
                    </div>
                </form>
                <Link to="/">Do you have an account? Click here to log in</Link>
            </div>

        </div>
    )
}