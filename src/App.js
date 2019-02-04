import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import { Switch, Route, HashRouter } from 'react-router-dom'
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles'

import Header from './components/Header'
import Meetings from './views/Meetings'
import Events from './views/Events'
import TrustedServants from './views/TrustedServants'
import PublicRelations from './views/PublicRelations'
import Home from './views/Home'
import theme from './theme'
import bmltInject from './bmltInject'

const App = (props) => {
  const { classes, meetings, formats } = props
  const isLoading = Object.keys(meetings).length < 1
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <HashRouter>
        <React.Fragment>
          <Header isLoading={isLoading} />
          <div className={classes.appContainer}>
            <Switch>
              <Route exact={true} path='/' component={Home} />
              <Route path='/meetings' render={(props) => <Meetings {...props} meetings={meetings} formats={formats} isLoading={isLoading} />} />
              <Route path='/events' component={Events} />
              <Route path='/trusted-servants' component={TrustedServants} />
              <Route path='/public-relations' component={PublicRelations} />
            </Switch>
          </div>
        </React.Fragment>
      </HashRouter>
    </MuiThemeProvider>
  )
}

const styles = {
  appContainer: {
    padding: '0 15px',
    marginTop: '90px'
  }
}

export default bmltInject(withStyles(styles)(App))
