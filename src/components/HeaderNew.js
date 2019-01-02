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

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    color: 'white',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -24,
    marginRight: 24,
    padding: 24,
    borderRadius: '0px',
    backgroundColor: 'steelblue',
  },
  toolbar: {
    borderTop: '4px solid #4784a8',
    backgroundColor: 'white',
  },
  typeography: {
    color: '#4784a8',
  },
  fullList: {
    width: '250px'
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
    }
  }


  renderList() {
    const fullList = (
      <div className={this.props.classes.fullList}>
        <List>
          {['Home', 'Meeting List', 'Events'].map((text, index) => (
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


    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar
          position='static'
          color="default"
        >
          <Toolbar
            className={classes.toolbar}
          >
            <IconButton onClick={this.toggleDrawer(true)} className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
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
            <Typography variant="h6" className={classes.grow}>
              Narcotics Anonymous | Mile High Area
          </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withWidth()(withStyles(styles)(withRouter(Header)))
