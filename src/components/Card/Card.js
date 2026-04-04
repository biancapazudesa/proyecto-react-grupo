import React, { Component } from 'react'
import "./styles.css"

class Card extends Component{
    render(){
        return(
            <article className="single-card-movie">
                <img src={`https://image.tmdb.org/t/p/w500${this.props.img}`} className="card-img-top"
                    alt="..." />
                <div className="cardBody">
                    <h5 className="card-title">{this.props.titulo}</h5>
                    <p className="card-text">{this.props.desc}</p>
                    <a href="movie.html" className="btn btn-primary">Ver más</a>
                    <a href="" className="btn alert-primary">🩶</a>
                </div>
            </article>
        )
    }
    
}

export default Card