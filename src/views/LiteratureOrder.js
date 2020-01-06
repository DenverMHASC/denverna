import React from 'react'
import { camelCase } from 'lodash'
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
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/button'
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
        <OrderSummary
          orderSummary={orderSummary}
          name={name}
          groupName={name}
          email={email}
          phone={phone}
        />
      </OuterContainer>
    ) : null
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
      <ExpansionPanel
        expanded={this.state.expanded === sectionName}
        onChange={() => this.onChangeExpandPanel(sectionName)}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography >{sectionName} - Total: {formatMoney(subtotal)}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
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
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
}

const cardStyles = {
  root: {
    padding: '10px',
    margin: '10px 0',
    width: '100%'
  },
}

const PersonalInfoCard = withStyles(cardStyles)((props) => <Paper className={props.classes.root}>{props.children}</Paper>)
class PersonalInfo extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {

    const { name, groupName, email, phone, onChange } = this.props
    return (
      <PersonalInfoCard>
        <Grid container>
          <Typography variant="subtitle1">Please enter your information</Typography>
          <Grid item xs={12}>
            <TextField
              style={{ width: '100%' }}
              id="outlined-name"
              label="GSR Name"
              value={name}
              onChange={(e) => onChange(e.target.value, 'name')}
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              style={{ width: '100%' }}
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
              style={{ width: '100%' }}
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
              style={{ width: '100%' }}
              id="outlined-email"
              label="Email"
              value={email}
              onChange={(e) => onChange(e.target.value, 'email')}
              margin="normal"
              variant="outlined"
            />
          </Grid>
        </Grid>
      </PersonalInfoCard>
    )
  }
}





const createOrderSummaryString = (name, groupName, email, phone, orderSummary) => {
  return `${orderSummary}Name: ${name}\nGroup Name: ${groupName} \nEmail: ${email} \nphone: ${phone}`
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
        <Typography> <strong>Order Summary</strong></Typography>
        <Divider />
        {oneItemSelectedAndPersonalInfoCompleted ? <React.Fragment>
          <pre style={{ whiteSpace: 'pre-wrap' }}>
            {orderSummaryString}
          </pre>

          <CopyToClipboard text={orderSummaryString}>
            <Button variant="contained" color="primary">Click here to copy your order</Button>
          </CopyToClipboard>
          <Typography style={{ marginTop: '10px' }}>Copy your order and send it in an email to literature.mhasc@gmail.com. Pick it up at the next Mile High Area Meeting! </Typography>
        </React.Fragment> : emptyState
        }
      </Grid>
    </Paper>
  )
})

const emptyState = <Typography>Please select at least one item and enter your name, group name, email, and phone number before continuing.</Typography>



export default withWidth()(LiteratureOrder)