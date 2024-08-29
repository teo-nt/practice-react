import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { redirect } from "react-router-dom";
import { movieActions } from '../store/Movies'
import NavBar from "../components/NavBar";
import { jwtDecode } from 'jwt-decode';
import { useRef, useState } from 'react';
import CustomInput from '../Custom Forms/CustomInput';
import { current } from '@reduxjs/toolkit';
import { MovieCreateDTO } from '../Models/MovieCreateDTO';


export function loader() {
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
    return null
}

function CreateMovie() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)

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


    async function submitMovie() {
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

        if (+rate.current.getValue() < 0 || +rate.current.getValue() > 10 || ((+rate.current.getValue() * 10) % 1) / 10 !== 0 ) {
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

        const movieToCreate: MovieCreateDTO = {
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
        
        /*const fd = new FormData(event.target)
        const data = Object.fromEntries(fd.entries())*/

        //dispatch(movieActions.create(data))

        setIsLoading(true)
        const response = await fetch('https://localhost:7044/api/Movie', {
            method: 'POST',
            body: JSON.stringify(movieToCreate),
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
                    <CustomInput ref={title} type="text" id="title" label="Title" name="title" />
                    <CustomInput ref={url} type="text" id="url" label="Url" name="url" />
                    <CustomInput ref={price} type='number' id="price" label="Price" name="price" />
                    <CustomInput ref={rate} type='number' id="rate" label="Rate" name="rate" />
                    <CustomInput ref={releaseDate} type='date' id="releaseDate" label="Release Date" name="releaseDate" />
                    <CustomInput ref={screenYear} type='number' id="screenYear" label="Screen Year" name="screenYear" />
                    <CustomInput ref={genre} type="text" id="genre" label="Genre" name="genre" />
                    <CustomInput ref={director} type="text" id="director" label="Director" name="director" />
                    <CustomInput ref={plot} type="text" id="plot" label="Plot" name="plot" />
                    <CustomInput ref={country} type="text" id="country" label="Country" name="country" />
                    <CustomInput ref={writer} type="text" id="writer" label="Writer" name="writer" />
                    <CustomInput ref={language} type="text" id="language" label="Language" name="language" />
                    <CustomInput ref={description} type="text" id="description" label="Description" name="description" />
                    <CustomInput ref={leadActor} type="text" id="leadActor" label="Lead Actor" name="leadActor" />
                    <CustomInput ref={type} type="text" id="type" label="Type" name="type" />
                    <button type='button' className='btn btn-warning mb-3' onClick={submitMovie}>{isLoading ? 'Submitting...' : 'Submit'}</button>
                </div>
            </form>
        </>
    );
}

/*function hasErrors(title, url, price, rate, releaseDate, screenYear, genre, director, plot, country, writer, language, description, leadActor, type) {
    if (title.current.getError() || url.current.getError() || price.current.getError() || rate.current.getError() ||
        releaseDate.current.getError() || screenYear.current.getError() || genre.current.getError() || director.current.getError() ||
        plot.current.getError() || country.current.getError() || writer.current.getError() || language.current.getError() ||
        description.current.getError() || leadActor.current.getError() || type.current.getError()) {
            return true;
        }
}*/

export default CreateMovie;