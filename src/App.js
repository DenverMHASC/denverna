import React from 'react'
import Header from './components/Header'
import CssBaseline from '@material-ui/core/CssBaseline';
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Home from './views/Home'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

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
        <React.Fragment>
          <Header />
          <Switch>
            <Route path='/' component={Home} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    </MuiThemeProvider>
  )
}



export default App