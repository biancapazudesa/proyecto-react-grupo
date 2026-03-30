import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {

        return (
            <div>
                <Link to='/'>Home</Link>
                <Link to='/Peliculas'>Peliculas</Link>
                <Link to='/Series'>Series</Link>
                <Link to='/Favoritas'>Favoritas</Link>
                <Link to='/Login'>Iniciar sesión</Link>
                <Link to='/Register'>Registrarse</Link>
            </div>
        )
    }
}

export default Menu