import React from 'react'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { formatMoney } from 'accounting'
import withStyles from '@material-ui/core/styles/withStyles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const theme = createMuiTheme();

const productCardStyles = {
  root: {
    padding: '10px',
    margin: '10px 0',

  },
  container: {
    [theme.breakpoints.up('sm')]: {
      padding: '10px',
    }
  }
}


class Product extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { quantity, itemNumber, name, price, classes, renderDropdown, sectionName, width } = this.props

    return (
      <div className={classes.container}>
        <Paper className={classes.root}>
          <Grid container>
            <Grid item xs={12}>
              <Typography><strong>{name}</strong></Typography>
            </Grid>
            <Grid item xs={6}>
              {renderDropdown(quantity, itemNumber, sectionName)}
            </Grid>
            <Grid item xs={6}>
              <Typography>Total: {formatMoney(price * quantity)}</Typography>
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
  }
}

export default withStyles(productCardStyles)(Product)