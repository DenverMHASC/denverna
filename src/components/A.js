import React from 'react'
import { withStyles } from '@material-ui/core'

const A = ({ href, classes, children }) =>
  <a href={href} className={classes.root}>{children}</a>

const styles = theme => ({
  root: {
    textDecoration: 'none',
    color: theme.palette.primary.dark,
  }
})

export default withStyles(styles)(A)