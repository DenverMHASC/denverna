import React from 'react'

import {
  AppBar,
  Toolbar,
  CardMedia,
  LinearProgress,
  Tabs,
  Tab,
  Button,
  Menu,
  MenuItem,
  withStyles, withWidth
} from '@material-ui/core'
import { withRouter } from 'react-router-dom'

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  cover: {
    width: '56px'
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
      anchorEl: null,
    }

    this.handleClick = this.handleClick.bind(this)
    this.renderMenu = this.renderMenu.bind(this)
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
    this.setState({ anchorEl: null });
  }

  handleClick(event) {
    this.setState({ anchorEl: event.currentTarget });
  };

  componentWillReceiveProps({ isLoading }) {
    this.setState({ isLoading })
  }


  renderMenu() {
    const { classes, width } = this.props
    const { value, anchorEl } = this.state;

    if (width === 'xs') {
      return (
        <div>
          <Button
            aria-owns={anchorEl ? 'simple-menu' : undefined}
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            Menu
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            <MenuItem onClick={() => this.handleChange(null, 0)}>Home</MenuItem>
            <MenuItem onClick={() => this.handleChange(null, 1)}>Meeting List</MenuItem>
            <MenuItem onClick={() => this.handleChange(null, 2)}>Events</MenuItem>
          </Menu>
        </div>
      )
    }
    return (
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
    )
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
            <CardMedia
              component="img"
              className={classes.cover}
              image="/assets/logo.png"
              title="Logo"
            />
            {this.renderMenu()}
          </Toolbar>
          {isLoading ? <LinearProgress /> : null}
        </AppBar>
      </div>

    )
  }

}

export default withWidth()(withStyles(styles)(withRouter(Header)))
