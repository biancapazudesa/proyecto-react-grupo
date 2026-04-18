import React, { Component } from 'react'
import "./styles.css"

class Filtro extends Component{
    contructor(props){
        this.state = {
            valor:""
        }
    }
    
    evitarSubmit(e){
        e.preventDefault();
    }

    controlarCambios(e){
        this.setState({
            valor:e.target.value
        }, () => this.props.filtrar(this.state.valor))
    }


    render(){
        return(
            <form className="padre" onSubmit={(e) => this.evitarSubmit(e)}>
                <input className="hijo" type="text" name="filter" id="" placeholder="Buscar dentro de la lista" onChange={(e) => this.controlarCambios(e)} value={this.props.valor}/>
            </form>
        )
    }
}
export default Filtro