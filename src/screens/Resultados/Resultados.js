import React, { Component } from 'react'
import Card from "../../components/Card/Card"

class Resultados extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resultados: []
        }
    }

    componentDidMount() {
        const busqueda = this.props.match.params.busqueda;
        const tipo = this.props.match.params.tipo;

        fetch(`https://api.themoviedb.org/3/search/${tipo}?api_key=34bbb0b5f876dc4dae13f205c0163fd0&query=${busqueda}`)
            .then(res => res.json())
            .then(data => this.setState(
                { resultados: data.results })
            )
            .catch(error => console.log(error))
    }

    render() {
        console.log(this.state.resultados);
        
        return (
            <div>
                <h1>Resultados</h1>
                {this.state.resultados.length === 0 ?
                    <h3>Cargando...</h3> :
                    <ul className="contenedorUl">
                        {this.state.resultados.map((unResultado) => (
                                <li key={unResultado.id}>
                                    <Card
                                        titulo={unResultado.title || unResultado.name}
                                        img={unResultado.poster_path}
                                        desc={unResultado.overview}
                                        id={unResultado.id}
                                        type={this.props.match.params.tipo}
                                    />
                                </li>
                            ))}
                    </ul>}
            </div>
        )
    }
}

export default Resultados