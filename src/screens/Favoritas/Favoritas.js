import React from 'react'
import { useState } from "react"
import { useEffect } from "react"
import Card from "../../components/Card/Card"
import './styles.css'
import Header from "../../components/Header/Header"

function Favoritas(props) {
    const [peliculasRecuperadas, setPeliculasRecuperadas] = useState([])
    const [seriesRecuperadas, setSeriesRecuperadas] = useState([])

    useEffect(() => {
        /*Peliculas*/
        let storage = localStorage.getItem("favPeliculas")
        if (storage !== null) {
            let ids = JSON.parse(storage)

            let peliculas = []
            ids.map((id) =>
                fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=34bbb0b5f876dc4dae13f205c0163fd0`)
                    .then(res => res.json())
                    .then(data => {
                        peliculas.push(data)
                        setPeliculasRecuperadas(peliculas)
                    })
                    .catch(e => console.log(e))
            )
        }
    }, [])

    /*Series*/
    let storageSeries = localStorage.getItem("favSeries")

    if (storageSeries !== null) {
        let idsSeries = JSON.parse(storageSeries)
        let series = []

        idsSeries.map(id =>
            fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=34bbb0b5f876dc4dae13f205c0163fd0`)
                .then(res => res.json())
                .then(data => {
                    series.push(data)
                    setSeriesRecuperadas(series)
                })

                .catch(e => console.log(e))
        )
    }

return (
    <div>
        <Header />
        <h1 className="categoria fav">Mis Favoritos ❤️</h1>
        <h2 className="nombreCategoriaFav">Películas</h2>
        {peliculasRecuperadas.length === 0 ? (
            <h3 className="noFav"><strong>No tenés películas favoritas</strong></h3>
        ) : (
            <ul className="contenedorUl">{peliculasRecuperadas.map((pelicula, idx) => (
                <li key={idx + pelicula.title}><Card
                    id={pelicula.id}
                    titulo={pelicula.title}
                    img={pelicula.poster_path}
                    desc={pelicula.overview}
                    type="movie"
                /></li>
            ))}</ul>
        )}

        <h2 className="nombreCategoriaFav">Series</h2>
        {seriesRecuperadas.length === 0 ? (
            <h3 className="noFav"><strong>No tenés series favoritas</strong></h3>
        ) : (
            <ul className="contenedorUl">
                {seriesRecuperadas.map((serie, idx) => (
                    <li key={idx + serie.name}>
                        <Card
                            id={serie.id}
                            titulo={serie.name}
                            img={serie.poster_path}
                            desc={serie.overview}
                            type="tv"
                        />
                    </li>
                ))}
            </ul>
        )}
    </div>
)}

export default Favoritas