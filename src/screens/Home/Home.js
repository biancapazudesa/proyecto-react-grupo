import React from 'react'
import { useState } from "react"
import { useEffect } from "react"
import Card from "../../components/Card/Card"
import Buscador from '../../components/Buscador/Buscador'
import Header from "../../components/Header/Header"

function Home (props){
    const [populares, setPopulares] = useState([])
    const [cartel, setCartel] = useState([])
    const [seriesPopulares, setSeriesPopulares] = useState([])
    const [seriesCartel, setSeriesCartel] = useState([]) 

    useEffect( ()=> {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=34bbb0b5f876dc4dae13f205c0163fd0")
            .then(response => response.json())
            .then(data => setPopulares(data.results))
            .catch(error => console.log(error))

        fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=34bbb0b5f876dc4dae13f205c0163fd0")
            .then(response => response.json())
            .then(data => setCartel(data.results))
            .catch(error => console.log(error))

        fetch("https://api.themoviedb.org/3/tv/popular?api_key=34bbb0b5f876dc4dae13f205c0163fd0")
            .then(response => response.json())
            .then(data => setSeriesPopulares(data.results))
            .catch(error => console.log(error))

        fetch("https://api.themoviedb.org/3/tv/airing_today?api_key=34bbb0b5f876dc4dae13f205c0163fd0")
            .then(response => response.json())
            .then(data => setSeriesCartel(data.results))
            .catch(error => console.log(error))

    },[])

        return (
            <>
                <Header />
                <Buscador />
                <section className='sectionCard'>
                    <h1 className="categoria">Películas más populares</h1>
                    {populares.length === 0 ?
                        <h3>Cargando...</h3> :
                        <ul className="contenedorUl">
                            {populares.filter((pelicula, i) => i < 4).map((pelicula, idx) => (
                                <li key={pelicula.title + idx}><Card
                                    titulo={pelicula.title}
                                    img={pelicula.poster_path}
                                    desc={pelicula.overview}
                                    id={pelicula.id}
                                    type="movie" /></li>
                            )
                            )}
                        </ul>
                    }

                    <h1 className="categoria">Películas en cartel</h1>
                    {cartel.length === 0 ?
                        <h3>Cargando...</h3> :
                        <ul className="contenedorUl">
                            {cartel.filter((pelicula, i) => i < 4).map((pelicula) => (
                                <li><Card
                                    key={pelicula.id}
                                    titulo={pelicula.title}
                                    img={pelicula.poster_path}
                                    desc={pelicula.overview}
                                    id={pelicula.id}
                                    type="movie" /></li>
                            )
                            )}
                        </ul>
                    }

                    <h1 className="categoria2">Series mas populares</h1>
                    {seriesPopulares.length === 0 ?
                        <h3>Cargando...</h3> :
                        <ul className="contenedorUl">
                            {seriesPopulares.filter((serie, i) => i < 4).map((serie) => (
                                <li><Card
                                    key={serie.id}
                                    titulo={serie.name}
                                    img={serie.poster_path}
                                    desc={serie.overview}
                                    id={serie.id}
                                    type="tv" /></li>
                            )
                            )}
                        </ul>
                    }

                    <h1 className="categoria2">Series en cartel</h1>
                    {seriesCartel.length === 0 ?
                        <h3>Cargando...</h3> :
                        <ul className="contenedorUl">
                            {seriesCartel.filter((serie, i) => i < 4).map((serie) => (
                                <li><Card
                                    key={serie.id}
                                    titulo={serie.name}
                                    img={serie.poster_path}
                                    desc={serie.overview}
                                    id={serie.id}
                                    type="tv" /></li>
                            )
                            )}
                        </ul>
                    }
                </section></>
        )
    }


export default Home