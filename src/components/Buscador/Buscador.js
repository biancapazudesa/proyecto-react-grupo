import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import './styles.css'

class Buscador extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valor: '',
            tipo: ''
        }
    }

    evitarSubmit(e) {
        e.preventDefault();
        this.props.history.push(
            `/resultados/${this.state.tipo}/${this.state.valor}`
        )
    }

    controlarCambios(e) {
        this.setState({
            valor: e.target.value
        })
    }

    tipoDeBusquedaSerie(e) {
        this.setState({
            tipo: 'tv'
        })
    }

    tipoDeBusquedaPelicula(e) {
        this.setState({
            tipo: 'movie'
        })
    }

    render() {
        return (
            <form className="search-form" onSubmit={(e) => this.evitarSubmit(e)}>
                <input onChange={(e) => this.controlarCambios(e)} type="text" className="barra" name="searchData" placeholder="Buscar..." value={this.state.valor} />
                <button type="submit" className="btn btn-success btn-sm">Buscar</button>
                <section className='opciones'>
                    <input onChange={(e) => this.tipoDeBusquedaPelicula(e)} type='radio' value='movie' name='searchType' className='radios' />
                    <label>Películas</label>
                    <input onChange={(e) => this.tipoDeBusquedaSerie(e)} type='radio' value='tv' name='searchType' className='radios' />
                    <label>Series</label>
                </section>
            </form>


        )
    }
}

export default withRouter(Buscador);