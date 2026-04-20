import Home from './screens/Home/Home'
import Header from './components/Header/Header'
import Peliculas from './screens/Peliculas/Peliculas'
import Series from './screens/Series/Series'
import Favoritas from './screens/Favoritas/Favoritas'
import Login from './screens/Login/Login'
import Register from './screens/Register/Register'
import { Route, Switch } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import Detalles from './screens/Detalles/Detalles'
import Resultados from './screens/Resultados/Resultados'
import NotFound from './screens/NotFound/NotFound'

function App() {
  return (
    <div className="App">
      <div className="divBody">
        <h1 className="tituloPag">UdeSA Movies</h1>
        <Switch>
          <Route path='/' exact={true} component={Home} />
          <Route path='/peliculas' component={Peliculas} />
          <Route path='/detalles/:type/:id' component={Detalles} />
          <Route path='/series' component={Series} />
          <Route path='/favoritas' component={Favoritas} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/resultados/:tipo/:busqueda' component={Resultados} />
          <Route path='' component={NotFound} />

        </Switch>
      </div>
      <div className="divFooter"></div>
      <Footer />
    </div>
  );
}

export default App;