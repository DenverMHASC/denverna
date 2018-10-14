import React from 'react'

import {
  AppBar, Toolbar, Typography, Button
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'


const Header = (props) => {
  const { classes, history } = props
  return (
    <div className={classes.root}>
      <AppBar
        position='static'
        color="default"
      >
        <Toolbar>
          <Typography className={classes.grow} variant="h5" color="inherit">
            Mile High Area of Narcotics Anonymous
        </Typography>
          <Button onClick={history.push('/')} color="inherit">Home</Button>
          <Button onClick={history.push('/meetings')} color="inherit">Meeting List</Button>
          <Button onClick={history.push('/events')} color="inherit">Events</Button>
        </Toolbar>
      </AppBar>
    </div>

  )
}

const styles = {
  root: {
    flexGrow: 1,
    marginBottom: '100px'
  },
  grow: {
    flexGrow: 1,
  },
};

export default withStyles(styles)(withRouter(Header))