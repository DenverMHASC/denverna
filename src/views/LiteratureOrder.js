import React from 'react'
import { camelCase } from 'lodash'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import withWidth from '@material-ui/core/withWidth'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import NativeSelect from '@material-ui/core/NativeSelect'
import InputLabel from '@material-ui/core/InputLabel'

import OuterContainer from '../components/OuterContainer'
import prices from '../literaturePrices'

const ZERO_TO_ONE_HUNDRED = Array.from(Array(100).keys())


class LiteratureOrder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      prices: null
    }

    this.renderDropdown = this.renderDropdown.bind(this)
    this.renderSection = this.renderSection.bind(this)
    this.onChange = this.onChange.bind(this)

  }

  componentDidMount() {
    this.setState({ prices: prices })
  }

  onChange(newQuantity, productToUpdate, sectionName) {
    const newPrices = { ...this.state.prices }
    const sectionNameCamel = camelCase(sectionName)

    newPrices[sectionNameCamel] = newPrices[sectionNameCamel].map(product => {
      if (product.itemNumber === productToUpdate.itemNumber) {
        product.quantity = newQuantity
        return product
      }
      return product
    })

    this.setState({ prices: newPrices })

  }

  renderDropdown(product, sectionName) {
    const { width } = this.props

    if (width === 'xs') {
      return (
        <FormControl >
          <InputLabel> Quantity</InputLabel>
          <NativeSelect
            onChange={(e) => this.onChange(e.target.value, product, sectionName)}
            value={product.quantity}
            inputProps={{
              name: 'quantity',
              id: 'quantity',
            }}
          >
            {ZERO_TO_ONE_HUNDRED.map((number) => (<option value={number} key={number}>{number}</option>))}
          </NativeSelect>
        </FormControl >
      )
    }
    return (
      <FormControl >
        <Select
          value={product.quantity}
          onChange={(e) => this.onChange(e.target.value, product, sectionName)}
          inputProps={{
            name: 'quantity',
            id: 'quantity',
          }}
        >

          {ZERO_TO_ONE_HUNDRED.map((number) => (<MenuItem value={number} key={number}>{number}</MenuItem>))}
        </Select>
      </FormControl>
    )
  }

  renderSection(products, name) {
    return (
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant='subtitle1'>{name} - subtotal: $0.00</Typography>
          </Grid>
          {products.map((product) => {
            return (
              <Grid key={product.itemNumber} item xs={12}>
                <Product product={product} renderDropdown={this.renderDropdown} sectionName={name} />
              </Grid>
            )
          })}
        </Grid>
      </Grid>
    )
  }


  render() {
    return this.state.prices ? (
      <OuterContainer>
        {this.renderSection(prices.books, "Books")}
        {this.renderSection(prices.booklets, "Booklets")}
        {this.renderSection(prices.informationPamphlets, "Information Pamphlets")}
        {this.renderSection(prices.serviceProducts, "Service Products")}
        {this.renderSection(prices.keyTags, "Key Tags")}
        {this.renderSection(prices.largePrint, "Large Print")}
        {this.renderSection(prices.medallions, "Medallions")}
        {this.renderSection(prices.specialtyItems, "Specialty Items")}
        {this.renderSection(prices.multimediaProducts, "Multimedia Products")}
      </OuterContainer>
    ) : null
  }
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


const Product = withStyles(productCardStyles)(({ product, classes, renderDropdown, sectionName }) => {
  return (
    <Paper className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Typography><strong>{product.name}</strong></Typography>
        </Grid>
        <Grid item xs={6}>
          {renderDropdown(product, sectionName)}
        </Grid>
        <Grid item xs={6}>
          <Typography>Total: {product.price * product.quantity}</Typography>
        </Grid>
      </Grid>
    </Paper>
  )
})



export default withWidth()(LiteratureOrder)