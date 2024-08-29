import { useDispatch, useSelector } from 'react-redux'
import { useLoaderData, useNavigate, useParams } from 'react-router-dom'


import { redirect } from "react-router-dom";
import { movieActions } from '../store/Movies'
import NavBar from "../components/NavBar";
import { jwtDecode } from 'jwt-decode';
import CustomInput from '../Custom Forms/CustomInput';
import { useRef } from 'react';
import { MovieReadUpdateDTO } from '../Models/MovieReadUpdateDTO';


export async function loader({params }) {
    /*if (localStorage.getItem('user') !== 'admin') {
        return redirect('/')
    }*/
    const token = localStorage.getItem('token')
    if (!token) {
        return redirect('/')
    }
    const role = jwtDecode(token).role
    if (role !== 'admin') {
        localStorage.removeItem('token')
        return redirect('/')
    }
    const response = await fetch(`https://localhost:7044/api/Movie/${params.id}`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })
    if (!response.ok) {
        return {}
    }
    return await response.json()
}

function EditMovieComponent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams()
    //const movie = useSelector(state => state.movie).find(m => m.id === Number(id))

    const title = useRef<{
        getValue: () => string | undefined,
        focus: () => void,
        setRequiredError: () => void,
        setSpecificError: (error: string) => void,
        getError: () => string
    }>()
    const url = useRef<{
        getValue: () => string | undefined,
        focus: () => void,
        setRequiredError: () => void,
        setSpecificError: (error: string) => void,
        getError: () => string
    }>()
    const price = useRef<{
        getValue: () => string | undefined,
        focus: () => void,
        setRequiredError: () => void,
        setSpecificError: (error: string) => void,
        getError: () => string
    }>()
    const rate = useRef<{
        getValue: () => string | undefined,
        focus: () => void,
        setRequiredError: () => void,
        setSpecificError: (error: string) => void,
        getError: () => string
    }>()
    const releaseDate = useRef<{
        getValue: () => string | undefined,
        focus: () => void,
        setRequiredError: () => void,
        setSpecificError: (error: string) => void,
        getError: () => string
    }>()
    const screenYear = useRef<{
        getValue: () => string | undefined,
        focus: () => void,
        setRequiredError: () => void,
        setSpecificError: (error: string) => void,
        getError: () => string
    }>()
    const genre = useRef<{
        getValue: () => string | undefined,
        focus: () => void,
        setRequiredError: () => void,
        setSpecificError: (error: string) => void,
        getError: () => string
    }>()
    const director = useRef<{
        getValue: () => string | undefined,
        focus: () => void,
        setRequiredError: () => void,
        setSpecificError: (error: string) => void,
        getError: () => string
    }>()
    const plot = useRef<{
        getValue: () => string | undefined,
        focus: () => void,
        setRequiredError: () => void,
        setSpecificError: (error: string) => void,
        getError: () => string
    }>()
    const country = useRef<{
        getValue: () => string | undefined,
        focus: () => void,
        setRequiredError: () => void,
        setSpecificError: (error: string) => void,
        getError: () => string
    }>()
    const writer = useRef<{
        getValue: () => string | undefined,
        focus: () => void,
        setRequiredError: () => void,
        setSpecificError: (error: string) => void,
        getError: () => string
    }>()
    const language = useRef<{
        getValue: () => string | undefined,
        focus: () => void,
        setRequiredError: () => void,
        setSpecificError: (error: string) => void,
        getError: () => string
    }>()
    const description = useRef<{
        getValue: () => string | undefined,
        focus: () => void,
        setRequiredError: () => void,
        setSpecificError: (error: string) => void,
        getError: () => string
    }>()
    const leadActor = useRef<{
        getValue: () => string | undefined,
        focus: () => void,
        setRequiredError: () => void,
        setSpecificError: (error: string) => void,
        getError: () => string
    }>()
    const type = useRef<{
        getValue: () => string | undefined,
        focus: () => void,
        setRequiredError: () => void,
        setSpecificError: (error: string) => void,
        getError: () => string
    }>()

    const movie = useLoaderData()
   

    if (Object.keys(movie).length === 0) {
        return (
            <>
                <NavBar />
                <div className="d-flex justify-content-center mx-auto mt-3 text-center">
                    <p className="mb-0 alert alert-danger">
                        Movie not found!
                    </p>
                </div>
            </>
        )      
    }
    
    async function editMovie() {
        
        let hasErrors = false

        if (country.current.getValue().length === 0) {
            country.current.setRequiredError()
            country.current.focus()
            hasErrors = true
        }

        if (plot.current.getValue().length === 0) {
            plot.current.setRequiredError()
            plot.current.focus()
            hasErrors = true
        }

        if (director.current.getValue().length === 0) {
            director.current.setRequiredError()
            director.current.focus()
            hasErrors = true
        }

        if (genre.current.getValue().length === 0) {
            genre.current.setRequiredError()
            genre.current.focus()
            hasErrors = true
        }

        if (+screenYear.current.getValue() < 1950 || +screenYear.current.getValue() > 2100) {
            screenYear.current.setSpecificError("Screen Year should be 1950 - 2100.")
            screenYear.current.focus()
            hasErrors = true
        }

        if (screenYear.current.getValue().length === 0) {
            screenYear.current.setRequiredError()
            screenYear.current.focus()
            hasErrors = true
        }

        if (releaseDate.current.getValue().length === 0) {
            releaseDate.current.setRequiredError()
            releaseDate.current.focus()
            hasErrors = true
        }

        if (rate.current.getValue().length === 0) {
            rate.current.setRequiredError()
            rate.current.focus()
            hasErrors = true
        }

        if (+rate.current.getValue() < 0 || +rate.current.getValue() > 10 || ((+rate.current.getValue() * 10) % 1) / 10 !== 0) {
            rate.current.setSpecificError("Acceptable values are 0.0 - 10.0")
            rate.current.focus()
            hasErrors = true
        }

        if (+price.current.getValue() <= 0 || (+price.current.getValue() * 100 % 1) / 100 !== 0) {
            price.current.setSpecificError("Price should be >0 with 2 decimals max allowed.")
            price.current.focus()
            hasErrors = true
        }

        if (price.current.getValue().length === 0) {
            price.current.setRequiredError()
            price.current.focus()
            hasErrors = true
        }

        if (url.current.getValue().length === 0) {
            url.current.setRequiredError()
            url.current.focus()
            hasErrors = true
        }

        if (title.current.getValue().length === 0) {
            title.current.setRequiredError()
            title.current.focus()
            hasErrors = true
        }

        if (hasErrors) {
            return
        }

        const movieToUpdate: MovieReadUpdateDTO = {
            id: +id,
            title: title.current.getValue(),
            url: url.current.getValue(),
            price: +price.current.getValue(),
            rate: +rate.current.getValue(),
            releaseDate: releaseDate.current.getValue(),
            screenYear: +screenYear.current.getValue(),
            genre: genre.current.getValue() || '',
            director: director.current.getValue() || '',
            plot: plot.current.getValue() || '',
            country: country.current.getValue() || '',
            writer: writer.current.getValue() || '',
            language: language.current.getValue() || '',
            description: description.current.getValue() || '',
            leadActor: leadActor.current.getValue() || '',
            type: type.current.getValue() || '',
        }
        
        //console.log(data)
        //dispatch(movieActions.edit(data))
        const response = await fetch('https://localhost:7044/api/Movie', {
            method: 'PUT',
            body: JSON.stringify(movieToUpdate),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            
        })
        //console.log(await response.json())
        navigate('/home')
    }

    return (
        <>
            <NavBar />
            <form>
                <div className='d-flex flex-column align-items-center justify-content-center'>
                    <CustomInput ref={title} type="text" id="title" label="Title" name="title" defaultValue={movie.title } />
                    <CustomInput ref={url} type="text" id="url" label="Url" name="url" defaultValue={movie.url} />
                    <CustomInput ref={price} type='number' id="price" label="Price" name="price" defaultValue={movie.price} />
                    <CustomInput ref={rate} type='number' id="rate" label="Rate" name="rate" defaultValue={movie.rate} />
                    <CustomInput ref={releaseDate} type='date' id="releaseDate" label="Release Date" name="releaseDate" defaultValue={movie.releaseDate }/>
                    <CustomInput ref={screenYear} type='number' id="screenYear" label="Screen Year" name="screenYear" defaultValue={movie.screenYear }/>
                    <CustomInput ref={genre} type="text" id="genre" label="Genre" name="genre" defaultValue={movie.genre }/>
                    <CustomInput ref={director} type="text" id="director" label="Director" name="director" defaultValue={movie.director }/>
                    <CustomInput ref={plot} type="text" id="plot" label="Plot" name="plot" defaultValue={movie.plot }/>
                    <CustomInput ref={country} type="text" id="country" label="Country" name="country" defaultValue={movie.country }/>
                    <CustomInput ref={writer} type="text" id="writer" label="Writer" name="writer" defaultValue={movie.writer }/>
                    <CustomInput ref={language} type="text" id="language" label="Language" name="language" defaultValue={movie.language }/>
                    <CustomInput ref={description} type="text" id="description" label="Description" name="description" defaultValue={movie.description }/>
                    <CustomInput ref={leadActor} type="text" id="leadActor" label="Lead Actor" name="leadActor" defaultValue={movie.leadActor }/>
                    <CustomInput ref={type} type="text" id="type" label="Type" name="type" defaultValue={movie.type} />
                    <button type='button' className='btn btn-warning' onClick={editMovie}>Submit</button>
                </div>
            </form>
        </>
    );
}

export default EditMovieComponent;