import React, { Component } from 'react'
import Card from "../../components/Card/Card"
import './styles.css'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            populares: [],
            cartel: []
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
    }
    render() {
        return (
            <section className='sectionCard'>
                <h1>Home</h1>
                <h2>Peliculas más populares</h2>
                {this.state.populares.length === 0 ?
                    <h3>Cargando...</h3> :
                    <ul className = "contenedorUl">
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
                <h2>Peliculas en cartel</h2>
                {this.state.cartel === 0 ?
                    <h3>Cargando...</h3> :
                    <ul>
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
            </section>
        )
    }
}

export default Home