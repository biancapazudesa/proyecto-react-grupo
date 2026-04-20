import React, { Component } from 'react'
import Header from '../../components/Header/Header'
import './styles.css'
import Cookies from 'universal-cookie'
const cookies = new Cookies()

class Detalles extends Component {
    constructor(props) {
        super(props)
        this.state = {
            detalles: [],
            fav: false,
            id: this.props.match.params.id,
            type: this.props.match.params.type
        }
    }

    componentDidMount() {
        fetch(`https://api.themoviedb.org/3/${this.state.type}/${this.state.id}?api_key=34bbb0b5f876dc4dae13f205c0163fd0`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                
                this.setState(
                { detalles: data }
            )})
            .catch(error => console.log(error))

        let favCate = this.state.type == 'movie' ? "favPeliculas" : "favSeries"
        let storage = localStorage.getItem(favCate)

        if (storage !== null) {
            let storageParseado = JSON.parse(storage)

            let resultado = storageParseado.filter(idGuardado => idGuardado == this.state.id)

            if (resultado.length > 0) {
                this.setState({
                    fav: true
                })
            }
        }
    }

    agregarFav(id) {
        let favCate = this.state.type == 'movie' ? "favPeliculas" : "favSeries"
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

        this.setState({
            fav: true
        })
    }

    sacarFav(id) {
        let favCate = this.state.type == 'movie' ? "favPeliculas" : "favSeries"
        let storage = localStorage.getItem(favCate)
        let storageParseado = JSON.parse(storage)
        let storageFiltrado = storageParseado.filter(i => i !== id)
        let storageString = JSON.stringify(storageFiltrado)
        localStorage.setItem(favCate, storageString)


        this.setState({
            fav: false
        })
    }

    render() {
        return (
            <div>
                <Header />
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
                                <ul className="mt-0 mb-0"><strong className='textoGenero'>Género:</strong>
                                    {this.state.detalles.genres.map((g, idx) => <li key={idx}>{g.name}</li>)}
                                </ul>
                                <p className="mt-0" id="votes"><strong>Puntuación:</strong> {this.state.detalles.vote_average}</p>
                                {cookies.get('user-auth-cookie') == null ? null : <button onClick={() => { this.state.fav === true ? this.sacarFav(Number(this.state.id)) : this.agregarFav(Number(this.state.id)) }} className="botonFav"> {this.state.fav === true ? "♥️" : "🩶"} </button>}

                            </section>
                        </div>}
                </section>
            </div>
        )
    }
}

export default Detalles