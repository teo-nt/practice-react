import { useSelector } from 'react-redux'
import { redirect, useLoaderData, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {Movie} from '../Models/Movie'

import { movieActions } from '../store/Movies'
import NavBar from "./NavBar";
import MovieTemplate from '../components/MovieTemplate'
import { jwtDecode } from 'jwt-decode'
import { useState } from 'react'

export async function loader() {
    const token = localStorage.getItem('token')
    if (!token) {
        return redirect('/')
    }
    /*if (localStorage.getItem('user') !== 'admin' && localStorage.getItem('user') !== 'user1') {
        return redirect('/')
    }*/
    const response = await fetch('https://localhost:7044/api/Movie', {
        method: 'GET',   
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })
    if (!response.ok) {
        return redirect('/')
    }

    return await response.json()   
}

function ViewPage() {
    //const movies = useSelector(state => state.movie)
    const movies: Movie[] = useLoaderData()
    const [loadedMovies, setLoadedMovies] = useState(movies)
    

    const role = jwtDecode(localStorage.getItem('token')).role
    const isAdmin = role === 'admin'

    const navigate = useNavigate();
    const dispatch = useDispatch();

    function createHandler() {
        navigate('/newMovie')
    }

    function handleDelete(id) {
        if (window.confirm('Are you sure?')) {
            //dispatch(movieActions.delete({ id }))
            fetch(`https://localhost:7044/api/Movie/${id}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            setLoadedMovies(prevMovies => prevMovies.filter(m => m.id !== id))
        }
       
        
    }

    function handleEdit(id) {
        navigate(`/edit/${id}`)
    }

    function handleAddToCart(movie: Movie) {
        dispatch(movieActions.addToCart(movie))
    }

    
    return (
        <>
            <NavBar />
            <div className="container mt-4">
                {isAdmin && (
                    <div className="mb-4 d-flex justify-content-start">
                        <button type="button" className="btn btn-warning" onClick={createHandler}>
                            Create New Movie
                        </button>
                    </div>)}
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {loadedMovies.map((movie) => (
                        <MovieTemplate key={movie.id} id={movie.id} title={movie.title} url={movie.url} price={movie.price}>
                            {isAdmin ? (
                                <div className="d-flex justify-content-between mt-3">
                                    <button type="button" className="btn btn-warning mx-1" onClick={() => handleEdit(movie.id)}>
                                        Edit
                                    </button>
                                    <button type="button" className="btn btn-danger mx-1" onClick={() => handleDelete(movie.id)}>
                                        Delete
                                    </button>
                                </div>) : (
                                    <div className="d-flex justify-content-center">
                                        <button type="button" className="btn btn-warning mx-auto" onClick={() => handleAddToCart(movie) }>Add to Cart</button>
                                    </div>
                                    
                                )}
                        </MovieTemplate>))}
                </div>
            </div>
        </>
    );
}

export default ViewPage;