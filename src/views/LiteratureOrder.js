import React from 'react'
import camelCase from 'lodash/camelCase'
import { formatMoney } from 'accounting'
import withStyles from '@material-ui/core/styles/withStyles'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import withWidth from '@material-ui/core/withWidth'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import NativeSelect from '@material-ui/core/NativeSelect'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/button'
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import OuterContainer from '../components/OuterContainer'
import prices from '../literaturePrices'
import Product from '../components/Product'
import PersonalInfo from '../components/PersonalInfo'

const ZERO_TO_ONE_HUNDRED = Array.from(Array(100).keys())

const nativeSelectItems = ZERO_TO_ONE_HUNDRED.map((number) => (<option value={number} key={number}>{number === 0 ? "none" : number}</option>))
const selectItems = ZERO_TO_ONE_HUNDRED.map((number) => (<MenuItem value={number} key={number}>{number === 0 ? "none" : number}</MenuItem>))

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
      expanded: null,
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
    this.onChangeExpandPanel = this.onChangeExpandPanel.bind(this)
  }


  componentDidMount() {
    this.setState({ prices: prices })
  }

  render() {
    const { prices, orderSummary, name, groupName, email, phone } = this.state

    return (
      <OuterContainer width={this.props.width}>
        <Grid item xs={12}>
          <Typography align="center" variant="subtitle1">Literature Order Tool</Typography>
          <Typography style={{ marginBottom: "10px" }} align="center" >
            Select the items you wish to order, fill out your info, then send an email to literature.mhasc@gmail.com
          </Typography>
        </Grid>
        {prices ? (
          <React.Fragment>
            {SECTION_NAMES.map(name => (
              <Grid
                item
                xs={12}
                md={10}
                key={name}>
                {this.renderSection(prices[camelCase(name)], name)}
              </Grid>
            ))}
            <Grid item xs={12} md={10}>
              <PersonalInfo
                name={name}
                groupName={groupName}
                email={email}
                phone={phone}
                onChange={this.onPersonalInfoChange}
              />
              <OrderSummary
                orderSummary={orderSummary}
                name={name}
                groupName={name}
                email={email}
                phone={phone}
              />
            </Grid>
          </React.Fragment>
        ) : null}
      </OuterContainer>
    )
  }

  onPersonalInfoChange(value, key) {
    this.setState({ [key]: value })
  }

  onChangeExpandPanel(name) {
    if (this.state.expanded === name) {
      this.setState({ expanded: null })
    } else {
      this.setState({ expanded: name })
    }
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

    const orderSummaryData = SECTION_NAMES.map((sectionName) => {
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

      return section

    })

    const orderSummarySectionText = orderSummaryData.reduce((sectionSummaryTextArray, data) => {
      if (data.summary !== '') {
        sectionSummaryTextArray.push(data.summary)
      }

      return sectionSummaryTextArray
    }, []).join('\n\n')

    const orderSubtotal = orderSummaryData.reduce((orderSubtotal, data) => orderSubtotal + data.subtotal, 0)
    const handlingFee = orderSubtotal * 0.1
    const orderTotal = orderSubtotal + handlingFee

    const orderSummary =
      `${orderSummarySectionText}\n\nSubtotal All Products: ${formatMoney(orderSubtotal)}\n10% handling fee: ${formatMoney(handlingFee)}\nTotal: ${formatMoney(orderTotal)}\n\n`

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
            {nativeSelectItems}
          </NativeSelect>
        </FormControl >
      )
    }
    return (
      <FormControl >
        <Select
          value={quantity}
          onChange={(e) => this.onChange(e.target.value, itemNumber, sectionName)}
          inputProps={{
            name: 'quantity',
            id: 'quantity',
          }}
        >
          {selectItems}
        </Select>
      </FormControl>
    )
  }

  renderSection(products, sectionName) {
    const { width } = this.props

    const subtotal = products.reduce((sum, product) =>
      sum + (product.quantity * product.price),
      0)

    return (
      <ExpansionPanel
        expanded={this.state.expanded === sectionName}
        onChange={() => this.onChangeExpandPanel(sectionName)}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography >{sectionName} - Total: {formatMoney(subtotal)}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container>
            {products.map((product) => {
              const { price, quantity, itemNumber, name } = product
              return (
                <Grid key={itemNumber} item xs={12} md={6}>
                  <Product
                    renderDropdown={this.renderDropdown}
                    price={price}
                    quantity={quantity}
                    name={name}
                    itemNumber={itemNumber}
                    sectionName={sectionName}
                  />
                </Grid>
              )
            })}
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel >
    )
  }
}

const createOrderSummaryString = (name, groupName, email, phone, orderSummary) => {
  return `${orderSummary}Name: ${name}\nGroup Name: ${groupName} \nEmail: ${email} \nphone: ${phone}`
}

const cardStyles = {
  root: {
    padding: '10px',
    margin: '10px 0',
    width: '100%'
  },
}

const OrderSummary = withStyles(cardStyles)((props) => {
  const { orderSummary, classes, email, name, groupName, phone } = props
  const orderSummaryString = createOrderSummaryString(name, groupName, email, phone, orderSummary)

  const oneItemSelectedAndPersonalInfoCompleted = orderSummary !== ''
    && name !== ''
    && groupName !== ''
    && phone !== ''
    && email !== ''


  return (
    <Paper className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Typography style={{ marginBottom: '10px' }} align="center"> <strong>Order Summary</strong></Typography>
          <Divider />
        </Grid>

        <Grid item xs={12}>
          {oneItemSelectedAndPersonalInfoCompleted ? <React.Fragment>
            <pre style={{ whiteSpace: 'pre-wrap' }}>
              {orderSummaryString}
            </pre>
            <Divider style={{ marginBottom: '10px' }} />
            <CopyToClipboard text={orderSummaryString}>
              <Button variant="contained" color="primary">Click here to copy your order</Button>
            </CopyToClipboard>
            <Typography style={{ marginTop: '10px' }}>Copy your order and send it in an email to literature.mhasc@gmail.com. Pick it up at the next Mile High Area Meeting! </Typography>
          </React.Fragment> : emptyState
          }
        </Grid>
      </Grid>
    </Paper>
  )
})

const emptyState = <Typography style={{ marginTop: '10px' }} align="center">Please select at least one item and enter your name, group name, email, and phone number before continuing.</Typography>



export default withWidth()(LiteratureOrder)