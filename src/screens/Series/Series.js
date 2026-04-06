import React, { Component } from 'react'
import Card from "../../components/Card/Card"


class Series extends Component {
    constructor(props) {
        super(props)
        this.state = {
            series: [],
            iterador: 8
        }
    }
    componentDidMount() {
        fetch("https://api.themoviedb.org/3/discover/tv?api_key=34bbb0b5f876dc4dae13f205c0163fd0")
            .then(res => res.json())
            .then(data => this.setState(
                { series: data.results }))
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
                {this.state.series.length === 0 ?
                    <h3>Cargando...</h3> :
                    <ul className="contenedorUl">
                        {this.state.series.filter((serie, i) => i < this.state.iterador).map((serie, idx) => (
                            <li key={serie.title + idx}><Card
                                titulo={serie.title}
                                img={serie.poster_path}
                                id={serie.id}
                                type="tv"
                                desc={serie.overview} /></li>
                        )
                        )}
                    </ul>
                }
            </div>
        )
    }
}


export default Series