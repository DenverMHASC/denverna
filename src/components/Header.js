import React from 'react'

import {
  AppBar, Toolbar, Typography, Button
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';


const Header = (props) => {
  const { classes } = props
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
          <Button color="inherit">Home</Button>
          <Button color="inherit">Meeting List</Button>
          <Button color="inherit">Events</Button>
        </Toolbar>
      </AppBar>
    </div>

  )
}

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
};

export default withStyles(styles)(Header)