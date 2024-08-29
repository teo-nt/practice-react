import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import { user, admin } from '../Models/user.ts'
import { Link, useNavigate } from 'react-router-dom'
import { authActions } from '../store/UserStore.js'
import { jwtDecode } from 'jwt-decode'
import  bcrypt  from 'bcryptjs'



function LoginPage() {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [failedLogin, setFailedLogin] = useState(false);

    const userName = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);

    async function handleClick() {

        /*if ((userName.current?.value && password.current?.value) === (user.userName && user.password)) {          
            dispatch(authActions.loggedUser())          
            localStorage.setItem('user', 'user1')           
            navigate('/home')              
        } else if ((userName.current?.value && password.current?.value) === (admin.userName && admin.password)) {
            dispatch(authActions.loggedAdmin())
            localStorage.setItem('user', 'admin')
            navigate('/home')   
        } else {
            
            setFailedLogin(true)
            
        }*/
        
        /*const salt = bcrypt.genSaltSync(11);
        console.log(salt)*/
        const hash = bcrypt.hashSync(password.current.value, "$2a$11$test123456789012345678");
        //console.log(hash)
        const response = await fetch('https://localhost:7044/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username: userName.current.value, password: hash }),
            headers: {
                "Content-Type": "application/json",
            },
        })
        if (!response.ok) {
            setFailedLogin(true)
            return
        }
        const token = await response.text()
        localStorage.setItem('token', token)
        
   
        navigate('/home')
    }

    return (

        <div className="mt-5 container">
            <div className="mx-auto col-lg-4 col-md-6 col-sm-8 text-center">
                <h1 className="text-center">Login</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">User name</label>
                        <input ref={userName} type="text" className="form-control" id="username" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input ref={password} type="password" className="form-control" id="password" required />
                    </div>
                    {failedLogin && <div className="alert alert-danger" role="alert">
                        False login credentials
                    </div>}


                    <div className="d-grid mb-3">
                        <button type="button" className="mx-auto mt-2 col-6 btn btn-warning" onClick={handleClick}>Login</button>
                    </div>
                </form>
                <Link to="/register">Don't you have an account? Click here to register</Link>
            </div>
            
        </div>
    )
}

export default LoginPage;