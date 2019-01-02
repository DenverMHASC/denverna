import { createMuiTheme } from '@material-ui/core'

export default createMuiTheme({
  palette: {
    primary: {
      main: '#03a9f4',
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
