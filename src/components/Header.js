import React from 'react'

import {
  AppBar,
  Toolbar,
  Typography,
  LinearProgress,
  Tabs,
  Tab,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  toolbar: {
    justifyContent: 'space-between',
  },
  tabsRoot: {
    borderBottom: '1px solid #e8e8e8',
  },
  tabsIndicator: {
    backgroundColor: '#1890ff',
  },
  tabRoot: {
    textTransform: 'initial',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing.unit * 4,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$tabSelected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  tabSelected: {},
  typography: {
    padding: theme.spacing.unit * 3,
  },
});

class Header extends React.Component {
  constructor() {
    super()
    this.state = {
      value: 0,
      isLoading: true,
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    if (window.location.pathname === '/') {
      this.setState({ value: 0 })
    } else if (window.location.pathname === '/meetings') {
      this.setState({ value: 1 })
    } else if (window.location.pathname === '/events') {
      this.setState({ value: 2 })
    }
  }

  handleChange(event, value) {
    const { history } = this.props
    this.setState({ value });
    if (value === 0) {
      history.push('/')
    } else if (value === 1) {
      history.push('/meetings')
    } else if (value === 2) {
      history.push('/events')
    }
  }

  componentWillReceiveProps({ isLoading }) {
    this.setState({ isLoading })
  }


  render() {
    const { classes } = this.props
    const { value, isLoading } = this.state;

    return (
      <div className={classes.root}>
        <AppBar
          position='static'
          color="default"
        >
          <Toolbar className={classes.toolbar}>
            <Typography className={classes.grow} variant="h5" color="inherit">
              Mile High Area of NA
            </Typography>
            <Tabs
              value={value}
              onChange={this.handleChange}
              classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
            >
              <Tab
                disableRipple
                classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                label="Home"
              />
              <Tab
                disableRipple
                classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                label="Meeting List"
              />
              <Tab
                disableRipple
                classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                label="Events"
              />
            </Tabs>
          </Toolbar>
          {isLoading ? <LinearProgress /> : null}
        </AppBar>
      </div>

    )
  }

}

export default withStyles(styles)(withRouter(Header))
