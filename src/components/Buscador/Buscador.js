import React from 'react';
import {useState} from "react"
import { withRouter } from "react-router-dom";
import './styles.css'

function Buscador(props){
    const [valor, setValor] = useState("")
    const [tipo, setTipo] = useState("")

    function evitarSubmit(e) {
        e.preventDefault();
        props.history.push(
            `/resultados/${tipo}/${valor}`
        )
    }

    function controlarCambios(e) {
        setValor(e.target.value) 
    }

    function tipoDeBusquedaSerie(e) {
        setTipo("tv")
    }

    function tipoDeBusquedaPelicula(e) {
        setTipo("movie")
    }

    return (
        <form className="search-form" onSubmit={(e) => evitarSubmit(e)}>
            <input onChange={(e) => controlarCambios(e)} type="text" className="barra" name="searchData" placeholder="Buscar..." value={valor} />
            <button type="submit" className="btn btn-success btn-sm">Buscar</button>
            <section className='opciones'>
                <input onChange={(e) => tipoDeBusquedaPelicula(e)} type='radio' value='movie' name='searchType' className='radios' />
                <label>Películas</label>
                <input onChange={(e) => tipoDeBusquedaSerie(e)} type='radio' value='tv' name='searchType' className='radios' />
                <label>Series</label>
            </section>
        </form>
    )
}

export default withRouter(Buscador);