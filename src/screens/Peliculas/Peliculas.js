import React, { Component } from 'react'
import Card from "../../components/Card/Card"


class Peliculas extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            iterador: 8
        }
    }
    componentDidMount() {
        fetch("https://api.themoviedb.org/3/discover/movie?api_key=34bbb0b5f876dc4dae13f205c0163fd0")
            .then(res => res.json())
            .then(data => this.setState(
                { movies: data.results }))
            .catch(error => console.log(error))
    }

    cargarMas = () => {
        this.setState({
            iterador: this.state.iterador + 4
        })
    }



    render() {
        return (
            <div>
                <h1 className="categoria">Todas las películas</h1>
                <button onClick={this.cargarMas} className="botonCargar">Cargar más</button>
                {this.state.movies.length === 0 ?
                    <h3>Cargando...</h3> :
                    <ul className="contenedorUl">
                        {this.state.movies.filter((pelicula, i) => i < this.state.iterador).map((pelicula, idx) => (
                            <li key={pelicula.title + idx}><Card
                                titulo={pelicula.title}
                                img={pelicula.poster_path}
                                id={pelicula.id}
                                type="movie"
                                desc={pelicula.overview} /></li>
                        )

                        )}
                    </ul>
                }
            </div>
        )
    }
}


export default Peliculas