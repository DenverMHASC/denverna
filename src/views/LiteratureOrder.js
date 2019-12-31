import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import withWidth from '@material-ui/core/withWidth'


import OuterContainer from '../components/OuterContainer'
import prices from '../literaturePrices'


class LiteratureOrder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      prices: null
    }
  }

  componentDidMount() {
    this.setState({ prices: prices })
  }

  render() {
    return this.state.prices ? (
      <OuterContainer>
        <Section products={prices.books} name="Books"></Section>
        <Section products={prices.booklets} name="Booklets"></Section>
        <Section products={prices.informationPamphlets} name="Information Pamphlets"></Section>
        <Section products={prices.serviceProducts} name="Service Products"></Section>
        <Section products={prices.keyTags} name="Key Tags"></Section>
        <Section products={prices.largePrint} name="Large Print"></Section>
        <Section products={prices.medallions} name="Medallions"></Section>
        <Section products={prices.specialtyItems} name="Specialty Items"></Section>
        <Section products={prices.multimediaProducts} name="Multimedia Products"></Section>
      </OuterContainer>
    ) : null
  }
}

const Section = ({ products, name }) => {
  return (
    <Grid item xs={12}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant='subheading'>{name} - subtotal: $0.00</Typography>
        </Grid>
        {products.map((product) => {
          return (
            <Grid xs={12}>
              <Product product={product} />
            </Grid>
          )
        })}
      </Grid>
    </Grid>
  )
}

const productCardStyles = {
  root: {
    padding: '10px',
    margin: '10px 0'
  },
  typography: {
    fontSize: '16px'
  }
}


const Product = withStyles(productCardStyles)(({ product, classes }) => {
  return (
    <Paper className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Typography>{product.name}</Typography>
        </Grid>
      </Grid>
    </Paper>
  )
})

// const Dropdown = ({ width, quantity }) => {
//   return (
    
//   )
// }



export default withWidth()(LiteratureOrder)