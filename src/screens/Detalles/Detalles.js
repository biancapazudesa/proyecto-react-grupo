import React, { Component } from 'react'
import './styles.css'

class Detalles extends Component {
    constructor(props) {
        super(props)
        this.state = {
            detalles: [],
            id: this.props.match.params.id,
            type: this.props.match.params.type
        }
    }

    componentDidMount() {
        fetch(`https://api.themoviedb.org/3/${this.state.type}/${this.state.id}?api_key=34bbb0b5f876dc4dae13f205c0163fd0`)
            .then(response => response.json())
            .then(data => this.setState(
                { detalles: data }
            ))
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div>
                <h1 className='categoria'>{this.state.detalles.title || this.state.detalles.name}</h1>
                <section className="row">
                    {this.state.detalles.length === 0 ?
                        <h3>Cargando...</h3> :
                        <div className='divDetalles'>
                            <img className="col-md-6" src={`https://image.tmdb.org/t/p/w342${this.state.detalles.poster_path}`} alt="" />
                            <section className="col-md-6 info">
                                <h3 class='descDetalle'>Descripción</h3>
                                <p className="description">{this.state.detalles.overview} </p>
                                <p className="mt-0 mb-0" id="release-date"><strong>Fecha de estreno:</strong> {this.state.detalles.first_air_date || this.state.detalles.release_date} </p>
                                {this.state.type === "movie" ? <p className="mt-0 mb-0 length"><strong>Duración: </strong> {this.state.detalles.runtime} </p> : null}
                                <ul className="mt-0 mb-0"><strong className='textoGenero'>Género:</strong> {this.state.detalles.genres.map((g, idx) => <li key={idx}>{g.name}</li>)}</ul>
                                <p className="mt-0" id="votes"><strong>Puntuación:</strong> {this.state.detalles.vote_average}</p>
                                <button href="" className="botonFav">🩶</button>

                            </section>
                        </div>}
                </section>
            </div>
        )
    }
}

export default Detalles