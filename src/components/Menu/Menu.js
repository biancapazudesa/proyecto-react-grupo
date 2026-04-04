import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {

        return (
            <nav className='menu'>
                <div className="izquierda">
                    <Link to='/'>Home</Link>
                    <Link to='/Peliculas'>Peliculas</Link>
                    <Link to='/Series'>Series</Link>
                    <Link to='/Favoritas'>Favoritas</Link>
                </div>

                <div className="derecha">
                    <Link to='/Login'>Iniciar sesión</Link>
                    <Link to='/Register'>Registrarse</Link>
                </div>
            </nav>)
    }
}

export default Menu