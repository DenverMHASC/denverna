import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles'

import Header from './components/Header'
import Meetings from './views/Meetings'
import Events from './views/Events'
import Home from './views/home'
import theme from './theme'

const App = (props) => {
  const { classes } = props
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <React.Fragment>
          <Header />
          <div className={classes.appContainer}>
            <Switch>
              <Route exact={true} path='/' component={Home} />
              <Route path='/meetings' component={Meetings} />
              <Route path='/events' component={Events} />
            </Switch>
          </div>
        </React.Fragment>
      </BrowserRouter>
    </MuiThemeProvider>
  )
}

const styles = {
  appContainer: {
    padding: '0 15px'
  }
}


export default withStyles(styles)(App)