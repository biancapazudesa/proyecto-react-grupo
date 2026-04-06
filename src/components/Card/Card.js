import React, { Component } from 'react'
import "./styles.css"
import { Link } from 'react-router-dom'

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verMas: false
        }
    }

    info = () => {
        this.setState({
            verMas: this.state.verMas ? false : true
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
                    <button href="" className="botonFav">🩶</button>
                </div>
            </article>
        )
    }
}

export default Card