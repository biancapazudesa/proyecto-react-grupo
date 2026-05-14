import React from 'react'
import { useState } from "react"
import Header from "../../components/Header/Header"
import { Link } from "react-router-dom"
import Cookies from 'universal-cookie'
const cookies = new Cookies()

function Login(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)

    function onSubmit(e) {
        e.preventDefault()
        const usuarioACrear = {
            email: email,
            password: password,
            createdAt: Date.now()
        }

        let storage = localStorage.getItem("usuarios")
        if (storage !== null) {
            let storageParseado = JSON.parse(storage)
            let estaElUsuario = storageParseado.filter((usuario) => usuario.email == usuarioACrear.email && usuario.password == usuarioACrear.password)

            if (estaElUsuario.length == 0) {
                setError(true)
                return
            }

            storageParseado.push(usuarioACrear)
            let storageString = JSON.stringify(storageParseado)
            localStorage.setItem("usuarios", storageString)

        } else {
            let usuarioString = JSON.stringify([usuarioACrear])
            localStorage.setItem("usuarios", usuarioString)
        }

        if (usuarioACrear) {
            cookies.set('user-auth-cookie', usuarioACrear.email)
        }

        props.history.push(
            "/"
        )
    }

    function controlarCambios(e, campo) {
        setError(false)
        if(campo === 'email'){
            setEmail(e.target.value)
        } else if(campo === 'password') {
            setPassword(e.target.value)
        }
    }

    return (
        <>
            <Header />
            <h1 className="categoria">Iniciar sesión</h1>
            <form className='sectionForm' onSubmit={(e) => onSubmit(e)}>
                <label>Email</label>
                <input className='input' onChange={(e) => controlarCambios(e, "email")} placeholder="Ingrese email" name="email" type="email" />
                <label>Contraseña</label>
                <input className='input' onChange={(e) => controlarCambios(e, "password")} placeholder="Ingrese contraseña" name="password" type="password" />
                {
                    error ? <p>Credenciales incorrectas</p> : null
                }
                <button className='botonEnviar' type="submit">Iniciar sesión</button>
                <p className="pCuenta">¿No tenés cuenta? <Link to="/register">Registrarse</Link></p>
            </form>
        </>
    )
}

export default Login