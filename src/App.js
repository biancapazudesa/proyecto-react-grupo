import Home from './screens/Home/Home'
import Header from './components/Header/Header'
import Peliculas from './screens/Peliculas/Peliculas'
import Series from './screens/Series/Series'
import Favoritas from './screens/Favoritas/Favoritas'
import Login from './screens/Login/Login'
import Register from './screens/Register/Register'
import {Route, Switch} from 'react-router-dom'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path='/' exact={true} component={Home} />
        <Route path='/Peliculas' component={Peliculas} />
        <Route path='/Series' component={Series} />
        <Route path='/Favoritas' component={Favoritas} />
        <Route path='/Login' component={Login} />
        <Route path='/Register' component={Register} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;