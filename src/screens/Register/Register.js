import React, { Component } from 'react'
import { Link } from "react-router-dom"
import './styles.css'

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            errorEmail: false,
            errorPassword: false
        }
    }

    onSubmit(e) {
        e.preventDefault()
        const usuarioACrear = {
            email: this.state.email,
            password: this.state.password,
            createdAt: Date.now()
        }

        if (this.state.password.length < 6) {
            this.setState({ errorPassword: true })
            return
        }


        let storage = localStorage.getItem("usuarios")
        if (storage !== null) {
            let storageParseado = JSON.parse(storage)
            let estaElUsuario = storageParseado.filter((usuario) => usuario.email == usuarioACrear.email)

            if (estaElUsuario.length > 0) {
                this.setState({ errorEmail: true })
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
            "/login"
        )


    }

    controlarCambios(e, campo) {
        this.setState({
            [campo]: e.target.value,
            errorEmail: false,
            errorPassword: false
        })
    }



    render() {
        return (
            <>
                <h1 className="categoria">Registro</h1>
                <form className='sectionForm' onSubmit={(e) => this.onSubmit(e)}>
                    <label>Email</label>
                    <input className='input' onChange={(e) => this.controlarCambios(e, "email")} placeholder="Ingrese email" name="email" type="email" />
                    {
                        this.state.errorEmail ? <p>El email ya está registrado</p> : null
                    }
                    <label>Contraseña</label>
                    <input className='input' onChange={(e) => this.controlarCambios(e, "password")} placeholder="Ingrese contraseña" name="password" type="password" />
                    {
                        this.state.errorPassword ? <p>La contraseña debe tener un mínimo de 6 caracteres</p> : null
                    }
                    <button className='botonEnviar' type="submit">Registrarse</button>
                    <p className="pCuenta">¿Ya tenés cuenta? <Link to="/login">Iniciar sesión</Link></p>
                </form>
            </>
        )
    }


}

export default Register