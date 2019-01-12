import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles'

import HeaderNew from './components/HeaderNew'
import Meetings from './views/Meetings'
import Events from './views/Events'
import TrustedServants from './views/TrustedServants'
import Home from './views/Home'
import theme from './theme'
import bmltInject from './bmltInject'

const App = (props) => {
  const { classes, meetings, formats } = props
  const isLoading = Object.keys(meetings).length < 1
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <React.Fragment>
          <HeaderNew isLoading={isLoading} />
          <div className={classes.appContainer}>
            <Switch>
              <Route exact={true} path='/' component={Home} />
              <Route path='/meetings' render={(props) => <Meetings {...props} meetings={meetings} formats={formats} isLoading={isLoading} />} />
              <Route path='/events' component={Events} />
              <Route path='/trusted-servants' component={TrustedServants} />
            </Switch>
          </div>
        </React.Fragment>
      </BrowserRouter>
    </MuiThemeProvider>
  )
}

const styles = {
  appContainer: {
    padding: '0 15px',
    marginTop: '50px'
  }
}

export default bmltInject(withStyles(styles)(App))
