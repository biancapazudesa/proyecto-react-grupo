import React, { Component } from 'react'
import "./styles.css"
import { Link } from 'react-router-dom'

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verMas: false,
            fav: false
        }
    }

    info() {
        this.setState({
            verMas: this.state.verMas ? false : true
        })
    }
    componentDidMount() {
        let favCate = this.props.type == 'movie' ? "favPeliculas" : "favSeries"
        let storage = localStorage.getItem(favCate)

        if (storage !== null) {
            let storageParseado = JSON.parse(storage)

            let resultado = storageParseado.filter(idGuardado => idGuardado == this.props.id)

            if (resultado.length > 0) {
                this.setState({
                    fav: true
                })
            }
        }


    }
    agregarFav(id) {
        let favCate = this.props.type == 'movie' ? "favPeliculas" : "favSeries"
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
        let favCate = this.props.type == 'movie' ? "favPeliculas" : "favSeries"
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
        let textoBoton = "Ver más"

        if (this.state.verMas === true) {
            textoBoton = "Ver menos"
        }

        return (
            <article className="single-card-movie">
                <Link to={`/Detalles/${this.props.type}/${this.props.id}`}>
                    <img src={`https://image.tmdb.org/t/p/w500${this.props.img}`} className="card-img-top" alt="..." />
                </ Link>
                <div className="cardBody">
                    <h5 className="card-title">{this.props.titulo}</h5>
                    <p className={this.state.verMas === true ? "card-text mostrar" : "card-text ocultar"}>{this.props.desc}</p>
                    <button onClick={() => this.info()} href="movie.html" className="boton">{textoBoton}</button>
                    <button onClick={() => { this.state.fav === true ? this.sacarFav(this.props.id) : this.agregarFav(this.props.id) }} className="botonFav"> {this.state.fav === true ? "♥️" : "🩶"} </button>
                </div>
            </article>
        )
    }
}

export default Card