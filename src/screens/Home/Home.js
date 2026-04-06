import React, { Component } from 'react'
import Card from "../../components/Card/Card"


class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            populares: [],
            cartel: [],
            seriesPopulares: [],
            seriesCartel: []
        }

    }
    componentDidMount() {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=34bbb0b5f876dc4dae13f205c0163fd0")
            .then(response => response.json())
            .then(data => this.setState(
                { populares: data.results }
            ))
            .catch(error => console.log(error))

        fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=34bbb0b5f876dc4dae13f205c0163fd0")
            .then(response => response.json())
            .then(data => this.setState(
                { cartel: data.results }
            ))
            .catch(error => console.log(error))

        fetch("https://api.themoviedb.org/3/tv/popular?api_key=34bbb0b5f876dc4dae13f205c0163fd0")
            .then(response => response.json())
            .then(data => this.setState(
                { seriesPopulares: data.results }
            ))
            .catch(error => console.log(error))

        fetch("https://api.themoviedb.org/3/tv/airing_today?api_key=34bbb0b5f876dc4dae13f205c0163fd0")
            .then(response => response.json())
            .then(data => this.setState(
                { seriesCartel: data.results }
            ))
            .catch(error => console.log(error))

    }

    render() {
        return (
            <section className='sectionCard'>
                <h1 className="categoria">Películas más populares</h1>
                {this.state.populares.length === 0 ?
                    <h3>Cargando...</h3> :
                    <ul className="contenedorUl">
                        {this.state.populares.filter((pelicula, i) => i < 4).map((pelicula) => (
                            <li><Card
                                key={pelicula.id}
                                titulo={pelicula.title}
                                img={pelicula.poster_path}
                                desc={pelicula.overview} /></li>
                        )

                        )}
                    </ul>
                }
                <h1 className="categoria">Películas en cartel</h1>
                {this.state.cartel.length === 0 ?
                    <h3>Cargando...</h3> :
                    <ul className="contenedorUl">
                        {this.state.cartel.filter((pelicula, i) => i < 4).map((pelicula) => (
                            <li><Card
                                key={pelicula.id}
                                titulo={pelicula.title}
                                img={pelicula.poster_path}
                                desc={pelicula.overview} /></li>
                        )

                        )}
                    </ul>
                }

                <h1 className="categoria2">Series mas populares</h1>
                {this.state.seriesPopulares.length === 0 ?
                    <h3>Cargando...</h3> :
                    <ul className="contenedorUl">
                        {this.state.seriesPopulares.filter((serie, i) => i < 4).map((serie) => (
                            <li><Card
                                key={serie.id}
                                titulo={serie.name}
                                img={serie.poster_path}
                                desc={serie.overview} /></li>
                        )

                        )}
                    </ul>
                }
                <h1 className="categoria2">Series en cartel</h1>
                {this.state.seriesCartel.length === 0 ?
                    <h3>Cargando...</h3> :
                    <ul className="contenedorUl">
                        {this.state.seriesCartel.filter((serie, i) => i < 4).map((serie) => (
                            <li><Card
                                key={serie.id}
                                titulo={serie.name}
                                img={serie.poster_path}
                                desc={serie.overview} /></li>
                        )

                        )}
                    </ul>
                }

            </section>
        )
    }
}

export default Home