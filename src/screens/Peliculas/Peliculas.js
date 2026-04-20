import React, { Component } from 'react'
import Card from "../../components/Card/Card"
import Filtro from "../../components/Filtro/Filtro"
import Header from "../../components/Header/Header"


class Peliculas extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            page: 1
        }
    }

    componentDidMount() {
        fetch("https://api.themoviedb.org/3/discover/movie?api_key=34bbb0b5f876dc4dae13f205c0163fd0")
            .then(res => res.json())
            .then(data => this.setState(
                {
                    movies: data.results,
                    backup: data.results
                }
            ))
            .catch(error => console.log(error))
    }

    cargarMas = () => {
        let nuevaPage = this.state.page + 1
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=34bbb0b5f876dc4dae13f205c0163fd0&page=${nuevaPage}`)
            .then(res => res.json())
            .then(data => this.setState(
                {
                    movies: this.state.movies.concat(data.results),
                    backup: this.state.movies.concat(data.results),
                    page: nuevaPage
                }
            ))
            .catch(error => console.log(error))
    }

    filtrar(inputUsuario) {
        const moviesFiltradas = this.state.backup.filter((elemento) => elemento.title.toLowerCase().includes(inputUsuario.toLowerCase()))
        this.setState({
            movies: moviesFiltradas
        })
    }

    render() {
        return (
            <div>
                <Header/>
                <h1 className="categoria">Todas las películas</h1>
                <Filtro filtrar={(input) => this.filtrar(input)} />
                {this.state.movies.length === 0 ?
                    <h3>Cargando...</h3> :
                    <ul className="contenedorUl">
                        {this.state.movies.map((pelicula, idx) => (
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
                <button onClick={this.cargarMas} className="botonCargar">Cargar más</button>

            </div>
        )
    }
}


export default Peliculas