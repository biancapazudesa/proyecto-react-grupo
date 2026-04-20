import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './styles.css'
import Cookies from 'universal-cookie'
const cookies = new Cookies()

class Menu extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log('cookies', cookies.get('user-auth-cookie'))
        return (
            <nav className='menu'>
                <div className="izquierda">
                    <Link to='/'>Home</Link>
                    <Link to='/Peliculas'>Peliculas</Link>
                    <Link to='/Series'>Series</Link>
                    {cookies.get('user-auth-cookie') ? <Link to='/Favoritas'>Favoritas</Link> : null}
                </div>

                {cookies.get('user-auth-cookie') ? null :
                <div className="derecha">
                    <Link to='/Login' className='linkDos'>Iniciar sesión</Link>
                    <Link to='/Register' className='linkDos'>Registrarse</Link>
                </div>}
            </nav>)
    }
}

export default Menu