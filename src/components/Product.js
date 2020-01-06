import React from 'react'
import { Grid, Typography, Paper } from '@material-ui/core'
import { formatMoney } from 'accounting'
import withStyles from '@material-ui/core/styles/withStyles'


const productCardStyles = {
  root: {
    padding: '10px',
    margin: '10px 0',
  },
}


class Product extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { quantity, itemNumber, name, price, classes, renderDropdown, sectionName } = this.props

    return (
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
    )
  }
}

export default withStyles(productCardStyles)(Product)