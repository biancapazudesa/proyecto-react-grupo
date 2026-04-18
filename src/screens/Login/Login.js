import React, { Component } from 'react'
import { Link } from "react-router-dom"

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            error: false,
        }
    }

    onSubmit(e) {
        e.preventDefault()
        const usuarioACrear = {
            email: this.state.email,
            password: this.state.password,
            createdAt: Date.now()
        }

        let storage = localStorage.getItem("usuarios")
        if (storage !== null) {
            let storageParseado = JSON.parse(storage)
            let estaElUsuario = storageParseado.filter((usuario) => usuario.email == usuarioACrear.email && usuario.password == usuarioACrear.password)

            if (estaElUsuario.length == 0) {
                this.setState({ error: true })
                return
            }

            storageParseado.push(usuarioACrear)
            let storageString = JSON.stringify(storageParseado)
            localStorage.setItem("usuarios", storageString)

        } else {
            let usuarioString = JSON.stringify([usuarioACrear])
            localStorage.setItem("usuarios", usuarioString)
        }

        this.props.history.push(
            "/"
        )
    }

    controlarCambios(e, campo) {
        this.setState({
            [campo]: e.target.value,
            error: false
        })
    }


    render() {
        return (
            <>
                <h1 className="categoria">Iniciar sesión</h1>
                <form className='sectionForm' onSubmit={(e) => this.onSubmit(e)}>
                    <label>Email</label>
                    <input className='input' onChange={(e) => this.controlarCambios(e, "email")} placeholder="Ingrese email" name="email" type="email" />
                    <label>Contraseña</label>
                    <input className='input' onChange={(e) => this.controlarCambios(e, "password")} placeholder="Ingrese contraseña" name="password" type="password" />
                    {
                        this.state.error ? <p>Credenciales incorrectas</p> : null
                    }
                    <button className='botonEnviar' type="submit">Iniciar sesión</button>
                    <p className="pCuenta">¿No tenés cuenta? <Link to="/register">Registrarse</Link></p>
                </form>
            </>
        )
    }


}

export default Login