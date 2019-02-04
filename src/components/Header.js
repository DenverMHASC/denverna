import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import withWidth from '@material-ui/core/withWidth';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withRouter } from 'react-router-dom'
import logo from '../../assets/logo.png'

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    color: 'white',
  },
  grow: {
    flexGrow: 1,
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: 'rgb(48, 106, 141)',
  },
  header: {
    height: '56px'
  },
  menuButton: {
    backgroundColor: '#1c84be',
    borderRadius: '0px',
    marginRight: 24,
    padding: '0px',
    marginTop: '-7px',
  },
  menuIcon: {
    color: 'white',
    fontSize: '50px',
    height: '1.1em',
    marginBottom: '-18px',
  },
  menuIconTypography: {
    flexGrow: 1,
    fontSize: '11px',
    color: 'white',
    fontWeight: 'bold',
  },
  menuButtonContainer: {
    flexDirection: 'column',
  },
  toolbar: {
    paddingLeft: '0px',
    minHeight: '56px',
    borderTop: '4px solid #1c84be',
    backgroundColor: 'white',
  },
  buttonNav: {
    color: 'rgb(60,168,214)',
    fontWeight: 'bold',
  },
  fullList: {
    width: '250px'
  },
  logo: {
    height: '66px',
    width: '66px',
    margin: '0 auto',
  },
  semiCircle: {
    backgroundColor: '#fff',
    borderRadius: '50%',
    bottom: '0',
    boxShadow: '0 4px 2px -2px rgba(0,0,0,.2)',
    display: 'block',
    height: '80px',
    width: '80px',
    padding: '8px',
    position: 'absolute',
    zIndex: '0',
    left: '50%',
    transform: 'translateX(-50%) translateY(40%)',
    transitionProperty: 'all',
    transitionDuration: '.15s',
    transitionTimingFunction: 'linear',
  }
});

class Header extends React.Component {

  constructor(props) {
    super()
    this.state = {
      open: false,
    }
    this.toggleDrawer = this.toggleDrawer.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.renderList = this.renderList.bind(this)
    this.renderNavButtons = this.renderNavButtons.bind(this)
  }

  toggleDrawer(open) {
    return () => {
      this.setState({
        open
      })
    }
  }

  handleChange(event, value) {
    const { history } = this.props
    if (value === 0) {
      history.push('/')
    } else if (value === 1) {
      history.push('/meetings')
    } else if (value === 2) {
      history.push('/events')
    } else if (value === 3) {
      history.push('/trusted-servants')
    } else if (value === 4) {
      history.push('/public-relations')
    }
  }

  renderNavButtons(width, classes) {
    if (['sm', 'xs'].includes(width)) {
      return null
    } else {
      return (
        <div>
          <Button onClick={() => this.handleChange(null, 0)} className={classes.buttonNav}>HOME</Button>
          <Button onClick={() => this.handleChange(null, 1)} className={classes.buttonNav}>MEETING LIST</Button>
          <Button onClick={() => this.handleChange(null, 2)} className={classes.buttonNav}>EVENTS</Button>
        </div>
      )
    }
  }

  renderList() {
    const fullList = (
      <div className={this.props.classes.fullList}>
        <List>
          {['Home', 'Meeting List', 'Events & Activities', 'For Trusted Servants', 'Public Relations'].map((text, index) => (
            <ListItem onClick={() => this.handleChange(null, index)} button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );

    return fullList
  }

  render() {
    const { classes, width } = this.props

    return (
      <div className={classes.root}>
        <AppBar className={classes.header} position='fixed'>
          <Toolbar className={classes.toolbar}>
            <IconButton onClick={this.toggleDrawer(true)} className={classes.menuButton} width=".5em" height=".5em">
              <div className={classes.menuButtonContainer}>
                <MenuIcon className={classes.menuIcon} />
                <Typography className={classes.menuIconTypography}>
                  MENU
                </Typography>
              </div>
            </IconButton>
            <Drawer open={this.state.open} onClose={this.toggleDrawer(false)}>
              <div
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer(false)}
                onKeyDown={this.toggleDrawer(false)}
              >
                {this.renderList()}
              </div>
            </Drawer>
            <Typography variant="h5" className={classes.grow}>
              {['sm', 'xs'].includes(width) ? 'NA | Mile High Area' : 'Narcotics Anonymous | Mile High Area'}
            </Typography>
            {this.renderNavButtons(width, classes)}
          </Toolbar>
          {['sm', 'md', 'lg', 'xl'].includes(width) ?
            <a className={classes.semiCircle} href="/" rel="home">
              <img className={classes.logo} src={logo}></img>
            </a>
            : null}
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withWidth()(withStyles(styles)(withRouter(Header)))
