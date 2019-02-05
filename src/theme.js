import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

export default createMuiTheme({
  palette: {
    primary: {
      main: '#0f5d88',
      light: '#67daff',
      dark: '#007ac1',
    },
    secondary: {
      main: '#607d8c',
      light: '#8eacbc',
      dark: '#34515f'
    },
  },
  typography: {
    useNextVariants: true,
  },
})
