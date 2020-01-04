import React from 'react'
import { camelCase } from 'lodash'
import { formatMoney } from 'accounting'
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
import TextField from '@material-ui/core/TextField'

import OuterContainer from '../components/OuterContainer'
import prices from '../literaturePrices'
import Product from '../components/Product'

const ZERO_TO_ONE_HUNDRED = Array.from(Array(100).keys())

const SECTION_NAMES = [
  "Books",
  "Booklets",
  "Information Pamphlets",
  "Service Products",
  "Key Tags",
  "Large Print",
  "Medallions",
  "Specialty Items",
  "Multimedia Products",
]


class LiteratureOrder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      prices: null,
      orderSummary: '',
      name: '',
      groupName: '',
      phone: '',
      email: '',
    }

    this.renderDropdown = this.renderDropdown.bind(this)
    this.renderSection = this.renderSection.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onPersonalInfoChange = this.onPersonalInfoChange.bind(this)
  }


  componentDidMount() {
    this.setState({ prices: prices })
  }

  render() {
    const { prices, orderSummary, name, groupName, email, phone } = this.state

    return prices ? (
      <OuterContainer width={this.props.width}>
        {SECTION_NAMES.map(name => <React.Fragment key={name}>{this.renderSection(prices[camelCase(name)], name)}</React.Fragment>)}
        <PersonalInfo
          name={name}
          groupName={groupName}
          email={email}
          phone={phone}
          onChange={this.onPersonalInfoChange}
        />
        <OrderSummary orderSummary={orderSummary} />
      </OuterContainer>
    ) : null
  }

  onPersonalInfoChange(value, key) {
    this.setState({ [key]: value })
  }

  onChange(newQuantity, itemNumber, sectionName) {
    const newPrices = { ...this.state.prices }
    const sectionNameCamel = camelCase(sectionName)

    newPrices[sectionNameCamel] = newPrices[sectionNameCamel].map(product => {
      if (product.itemNumber === itemNumber) {
        product.quantity = newQuantity
        return product
      }
      return product
    })


    const orderSummary = SECTION_NAMES.map((sectionName) => {
      let section = newPrices[camelCase(sectionName)].reduce((section, product) => {
        const { quantity, price, name } = product

        if (quantity > 0) {
          section.summary += `\n${quantity}x ${name} - ${formatMoney(quantity * price)}`
          section.subtotal = section.subtotal + (price * quantity)
          return section
        }

        return section

      }, {
        subtotal: 0,
        summary: ''
      })

      if (section.subtotal > 0) {
        section.summary = `${sectionName} Subtotal: ${formatMoney(section.subtotal)}${section.summary}`
      }

      return section.summary

    }).filter(sectionSummary => sectionSummary !== '').join('\n\n')

    this.setState({
      prices: newPrices,
      orderSummary
    })

  }

  renderDropdown(quantity, itemNumber, sectionName) {
    const { width } = this.props

    if (width === 'xs') {
      return (
        <FormControl >
          <InputLabel> Quantity</InputLabel>
          <NativeSelect
            onChange={(e) => this.onChange(e.target.value, itemNumber, sectionName)}
            value={quantity}
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

  renderSection(products, sectionName) {

    const subtotal = products.reduce((sum, product) =>
      sum + (product.quantity * product.price),
      0)

    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography variant='subtitle1'>{sectionName} - subtotal: {formatMoney(subtotal)}</Typography>
        </Grid>
        {products.map((product) => {
          const { price, quantity, itemNumber, name } = product
          return (
            <Product
              renderDropdown={this.renderDropdown}
              price={price}
              quantity={quantity}
              name={name}
              itemNumber={itemNumber}
              sectionName={sectionName}
            />
          )
        })}
      </Grid>
    )
  }
}

const PersonalInfo = (props) => {
  const { name, groupName, email, phone, onChange } = props
  return (
    <Grid container>
      <Grid item xs={12}>
        <TextField
          id="outlined-name"
          label="Your Name"
          value={name}
          onChange={(e) => onChange(e.target.value, 'name')}
          margin="normal"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="outlined-groupname"
          label="Group Name"
          value={groupName}
          onChange={(e) => onChange(e.target.value, 'groupName')}
          margin="normal"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="outlined-phonenumber"
          label="Phone Number"
          value={phone}
          onChange={(e) => onChange(e.target.value, 'phone')}
          margin="normal"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="outlined-email"
          label="Email"
          value={email}
          onChange={(e) => onChange(e.target.value, 'email')}
          margin="normal"
          variant="outlined"
        />
      </Grid>
    </Grid>
  )

}

const orderSummaryStyles = {
  root: {
    padding: '10px',
    margin: '10px 0',
    width: '100%'
  },
}


const OrderSummary = withStyles(orderSummaryStyles)(({ orderSummary, classes }) => {
  return (
    <Paper className={classes.root}>
      <Grid container>
        <Typography> <strong>Order Summary</strong></Typography>
        <pre style={{ whiteSpace: 'pre-wrap' }}>
          {orderSummary}
        </pre>
      </Grid>
    </Paper>
  )
})



export default withWidth()(LiteratureOrder)