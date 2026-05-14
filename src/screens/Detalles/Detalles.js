import React from 'react'
import { useState } from "react"
import { useEffect } from "react"
import Header from '../../components/Header/Header'
import './styles.css'
import Cookies from 'universal-cookie'
const cookies = new Cookies()

function Detalles(props) {
    const [detalles, setDetalles] = useState([])
    const [fav, setFav] = useState(false)
    const [id, setId] = useState(props.match.params.id)
    const [type, setType] = useState(props.match.params.type)

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=34bbb0b5f876dc4dae13f205c0163fd0`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setDetalles(data)
            })
            .catch(error => console.log(error))

        let favCate = type == 'movie' ? "favPeliculas" : "favSeries"
        let storage = localStorage.getItem(favCate)

        if (storage !== null) {
            let storageParseado = JSON.parse(storage)

            let resultado = storageParseado.filter(idGuardado => idGuardado == id)

            if (resultado.length > 0) {
                setFav(true)
            }
        }
    }, [])

    function agregarFav(id) {
        let favCate = type == 'movie' ? "favPeliculas" : "favSeries"
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
        let favCate = type == 'movie' ? "favPeliculas" : "favSeries"
        let storage = localStorage.getItem(favCate)
        let storageParseado = JSON.parse(storage)
        let storageFiltrado = storageParseado.filter(i => i !== id)
        let storageString = JSON.stringify(storageFiltrado)
        localStorage.setItem(favCate, storageString)

        setFav(false)

    }


    return (
        <div>
            <Header />
            <h1 className='categoria'>{detalles.title || detalles.name}</h1>
            <section className="row">
                {detalles.length === 0 ?
                    <h3>Cargando...</h3> :
                    <div className='divDetalles'>
                        <img className="col-md-6" src={`https://image.tmdb.org/t/p/w342${detalles.poster_path}`} alt="" />
                        <section className="col-md-6 info">
                            <h3 class='descDetalle'>Descripción</h3>
                            <p className="description">{detalles.overview} </p>
                            <p className="mt-0 mb-0" id="release-date"><strong>Fecha de estreno:</strong> {detalles.first_air_date || detalles.release_date} </p>
                            {type === "movie" ? <p className="mt-0 mb-0 length"><strong>Duración: </strong> {detalles.runtime} </p> : null}
                            <ul className="mt-0 mb-0"><strong className='textoGenero'>Género:</strong>
                                {detalles.genres.map((g, idx) => <li key={idx}>{g.name}</li>)}
                            </ul>
                            <p className="mt-0" id="votes"><strong>Puntuación:</strong> {detalles.vote_average}</p>
                            {cookies.get('user-auth-cookie') == null ? null : <button onClick={() => { fav === true ? sacarFav(Number(id)) : agregarFav(Number(id)) }} className="botonFav"> {fav === true ? "♥️" : "🩶"} </button>}

                        </section>
                    </div>}
            </section>
        </div>
    )

}

export default Detalles