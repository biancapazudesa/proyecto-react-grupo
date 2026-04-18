import React, { Component } from 'react'
import Card from "../../components/Card/Card"
import Filtro from "../../components/Filtro/Filtro"


class Series extends Component {
    constructor(props) {
        super(props)
        this.state = {
            series: [],
            page: 1
        }
    }
    componentDidMount() {
        fetch("https://api.themoviedb.org/3/discover/tv?api_key=34bbb0b5f876dc4dae13f205c0163fd0")
            .then(res => res.json())
            .then(data => this.setState(
                { series: data.results,
                    backup: data.results 
            
                }))
            .catch(error => console.log(error))
    }

    cargarMas (){
        let nuevaPage = this.state.page + 1
        fetch(`https://api.themoviedb.org/3/discover/tv?api_key=34bbb0b5f876dc4dae13f205c0163fd0&page=${nuevaPage}`)
            .then(res => res.json())
            .then(data => this.setState(
                { 
                    series: this.state.series.concat(data.results),
                    backup: this.state.series.concat(data.results),
                    page: nuevaPage
                }
            ))
            .catch(error => console.log(error))
        
    }

    filtrar(inputUsuario){
        const seriesFiltradas = this.state.backup.filter((elemento) => elemento.name.toLowerCase().includes(inputUsuario.toLowerCase()))
        this.setState({
            series:seriesFiltradas
        })
    }



    render() {
        return (
            <div>
                <h1 className="categoria2">Todas las series</h1>
                <Filtro filtrar={(input) => this.filtrar(input)} />
                <button onClick={this.cargarMas} className="botonCargar">Cargar más</button>
                {this.state.series.length === 0 ?
                    <h3>Cargando...</h3> :
                    <ul className="contenedorUl">
                        {this.state.series.map((serie, idx) => (
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