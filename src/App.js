import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import { Switch, Route, HashRouter, Redirect } from 'react-router-dom'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import withStyles from '@material-ui/core/styles/withStyles'

import Header from './components/Header'
import LiteratureOrder from './views/LiteratureOrder'
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
              <Route exact={true} path='/' render={() => window.location.replace('https://www.denverna.com')} />
              <Route path='/meetings' render={() => window.location.replace('https://www.denverna.com')} />
              <Route path='/events' render={() => window.location.replace('https://www.denverna.com')} />
              <Route path='/coronavirus-meetings' render={() => window.location.replace('https://www.denverna.com')} />
              <Route exact path='/trusted-servants' render={() => window.location.replace('https://www.denverna.com')} />
              <Route exact path='/trusted-servants/literature-order' component={LiteratureOrder} />
              <Route path='/public-relations' render={() => window.location.replace('https://www.denverna.com')} />
            </Switch>
          </div>
        </React.Fragment>
      </HashRouter>
    </MuiThemeProvider >
  )
}

const styles = {
  appContainer: {
    padding: '0 5px',
    marginTop: '90px'
  }
}

export default bmltInject(withStyles(styles)(App))
