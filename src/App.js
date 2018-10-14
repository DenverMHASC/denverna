import React from 'react'
import Header from './components/Header'
import CssBaseline from '@material-ui/core/CssBaseline';
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Home from './views/Home'


const App = (props) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <BrowserRouter>
        <Switch>
          <Route path='/' component={Home} />
        </Switch>

      </BrowserRouter>

    </React.Fragment>
  )
}

export default App