import React from 'react'
import "./styles.css"
import { useState } from "react"
import { useEffect } from "react"
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie'
const cookies = new Cookies()

function Card(props) {
    const [verMas, setVerMas] = useState(false);
    const [fav, setFav] = useState(false);

    function info() {
        setVerMas(verMas ? false : true)
    }

    useEffect(() => {
        let favCate = props.type == 'movie' ? "favPeliculas" : "favSeries"
        let storage = localStorage.getItem(favCate)

        if (storage !== null) {
            let storageParseado = JSON.parse(storage)

            let resultado = storageParseado.filter(idGuardado => idGuardado == props.id)

            if (resultado.length > 0) {
                setFav(true)
            }
        }
    }, [])

    function agregarFav(id) {
        let favCate = props.type == 'movie' ? "favPeliculas" : "favSeries"
        let storage = localStorage.getItem(favCate)

        if (storage == null) {

            let primerValor = [id]
            let primerValorString = JSON.stringify(primerValor)
            localStorage.setItem(favCate, primerValorString)
        } else {
            let storageParseado = JSON.parse(storage)
            storageParseado.push(id)
            let storageString = JSON.stringify(storageParseado)
            localStorage.setItem(favCate, storageString)
        }

        setFav(true)
    }

    function sacarFav(id) {
        let favCate = props.type == 'movie' ? "favPeliculas" : "favSeries"
        let storage = localStorage.getItem(favCate)
        let storageParseado = JSON.parse(storage)
        let storageFiltrado = storageParseado.filter(i => i !== id)
        let storageString = JSON.stringify(storageFiltrado)
        localStorage.setItem(favCate, storageString)


        setFav(false)
    }

    let textoBoton = "Ver más"

    if (verMas === true) {
        textoBoton = "Ver menos"
    }

    return (
        <article className="single-card-movie">
            <Link to={`/Detalles/${props.type}/${props.id}`}>
                <img src={`https://image.tmdb.org/t/p/w500${props.img}`} className="card-img-top" alt="..." />
            </ Link>
            <div className="cardBody">
                <h5 className="card-title">{props.titulo}</h5>
                <p className={verMas === true ? "card-text mostrar" : "card-text ocultar"}>{props.desc}</p>
                <button onClick={() => info()} href="movie.html" className="boton">{textoBoton}</button>
                {cookies.get('user-auth-cookie') == null ? null : <button onClick={() => { fav === true ? sacarFav(props.id) : agregarFav(props.id) }} className="botonFav"> {fav === true ? "♥️" : "🩶"} </button>}
            </div>
        </article>
    )
}

export default Card