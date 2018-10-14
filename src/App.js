import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import Header from './components/Header'
import Meetings from './views/Meetings'
import Events from './views/Events'
import Home from './views/home'





const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
})

const App = (props) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route exact={true} path='/' component={Home} />
            <Route path='/meetings' component={Meetings} />
            <Route path='/events' component={Events} />
          </Switch>
        </div>
      </BrowserRouter>
    </MuiThemeProvider>
  )
}



export default App