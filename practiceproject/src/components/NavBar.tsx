import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, redirect } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { MovieStore } from '../Models/Movie'
import { movieActions } from '../store/Movies'
import { jwtDecode } from 'jwt-decode'
import { OrderToSubmit } from "../Models/Order";
import { useState } from "react";



function NavBar() {
    const movies = useSelector(state => state.movie)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [successMessage, setSuccessMessage] = useState('')

    const role = jwtDecode(localStorage.getItem('token')).role
    const isAdmin = role === 'admin'

    function handleClick() {
        dispatch(movieActions.clearCart())
        localStorage.clear()
        navigate('/')    
    }

    function addItemToCart(movie: MovieStore) {
        dispatch(movieActions.addToCart(movie))
    }

    function removeItemFromCart(movie: MovieStore) {
        dispatch(movieActions.removeItemFromCart(movie))
    }

    async function submitOrder() {
        const order: OrderToSubmit = {
            userId: Number(jwtDecode(localStorage.getItem('token')).nameid),
            moviesToOrder: movies
        }
        
        const response = await fetch('https://localhost:7044/api/orders', {
            method: 'POST',
            body: JSON.stringify(order),      
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json",
            }
        })
        if (response.ok) {
            document.getElementById('close').click()
            setSuccessMessage("Order was submitted!")
            setTimeout(() => {
                setSuccessMessage("")
            }, 4000)
            
            dispatch(movieActions.clearCart())
        }
    }

    return (
        <>
            {successMessage && <div style={{
                position: "absolute",
                top: 10,
               
                left: "45vw",
                right: "auto",
                padding: "0.7rem",
                fontSize: "1.5rem",
                backgroundColor: "white",
                border: "2px solid black",
                borderRadius: "8px",
                zIndex: 5
            }}>
                {successMessage}
            </div>}
            <nav className="px-3 navbar navbar-expand-lg navbar-light bg-warning">

                <a className="navbar-brand">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="w-100 d-flex justify-content-between navbar-nav mr-auto">
                        <div className="d-flex justify-content-lg-start flex-lg-row flex-column">
                            <li className="nav-item active">
                                <NavLink className="nav-link" to='/home'>Home</NavLink>
                            </li>
                            {!isAdmin && <li className="nav-item active">
                                <NavLink className="nav-link" to='/order-history'>Order History</NavLink>
                            </li>}
                        </div>
                        
                        <div>
                            {!isAdmin && (
                                <>
                                    < button type="button" className="btn btn-secondary me-4 align-center" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart align-baseline me-2" viewBox="0 0 16 16">
                                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                                        </svg>
                                        Cart
                                        <span className="badge text-bg-danger ms-2">
                                            {movies.reduce((sum, movie) => sum + movie.quantity, 0)}
                                        </span>
                                    </button>

                                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Cart</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">

                                                    {movies && movies.map((movie: MovieStore) => (
                                                        <li key={movie.id}>
                                                            <div className="d-flex justify-content-between align-items-center my-2">
                                                                <div>{movie.title}</div>

                                                                <div className="d-flex align-items-center">
                                                                    <div className="me-4">{movie.quantity * movie.price}$</div>
                                                                    <button type="button" className="btn btn-warning rounded-circle" onClick={() => removeItemFromCart(movie)}>-</button>
                                                                    <span className="mx-2">{movie.quantity}</span>
                                                                    <button type="button" className="btn btn-danger rounded-circle" onClick={() => addItemToCart(movie)}>+</button>
                                                                </div>

                                                            </div>

                                                        </li>
                                                    ))}
                                                    {movies.length !== 0 && (
                                                        <div className="d-flex justify-content-end mt-4">
                                                            <div>
                                                                <span className="fw-bold fs-4 me-2">Total:</span>
                                                                <span className="fs-4 me-2">{movies.reduce((sum, movie) => sum + movie.price * movie.quantity, 0)}$</span>

                                                            </div>
                                                        </div>


                                                    )}
                                                    {movies.length === 0 && (
                                                        <div className="text-center">Cart is empty!</div>
                                                    )}
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" id="close" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                                    <button type="button" className="btn btn-warning" disabled={movies.length === 0} onClick={submitOrder}>Submit Order</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </>
                            )}

                            <button type='button' className='btn btn-danger' onClick={handleClick}>Logout</button>
                        </div>

                    </ul>
                </div>
            </nav>
        </>
        
    );
}

export default NavBar;