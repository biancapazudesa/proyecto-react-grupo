import React, { Component } from 'react'
import './styles.css'

class Detalles extends Component {
    constructor(props){
        super(props)
        this.state= {

        }
    }
    
    render() {
        return (
            <div>
                <section class="row">
                    <img class="col-md-6" src="https://image.tmdb.org/t/p/w500/ombsmhYUqR4qqOLOxAyr5V8hbyv.jpg" alt="" />
                        <section class="col-md-6 info">
                            <h3>Descripción</h3>
                            <p class="description">Superman, a journalist in Metropolis, embarks on a journey to reconcile his
                                Kryptonian heritage with his human upbringing as Clark Kent.</p>
                            <p class="mt-0 mb-0" id="release-date"><strong>Fecha de estreno:</strong> 2025-07-09</p>
                            <p class="mt-0 mb-0 length"><strong>Duración:</strong> 130</p>
                            <p class="mt-0" id="votes"><strong>Puntuación:</strong> 7.534</p>
                        </section>
                </section>
            </div>
        )
    }
}

export default Login