import React from 'react'
import {useState} from "react"
import "./styles.css"

function Filtro (props){
    const [valor, setValor] = useState("")
    
    function evitarSubmit(e){
        e.preventDefault();
    }

    function controlarCambios(e){
        setValor(e.target.value) 
        props.filtrar(valor)
    }

    return(
        <form className="padre" onSubmit={(e) => evitarSubmit(e)}>
            <input className="hijo" type="text" name="filter" id="" placeholder="Buscar dentro de la lista" onChange={(e) => controlarCambios(e)} value={props.valor}/>
        </form>
    )

}
export default Filtro