import React from 'react'
import OuterContainer from '../components/OuterContainer'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Typography from '@material-ui/core/Typography'
import withWidth from '@material-ui/core/withWidth'
import moment from 'moment'

import GetSheetDone from 'get-sheet-done'

const EVENT_INFO_DATA_ID = "1OxopXEL1mBgaTNBV5HWVKjhwhQ5dpyi1auIfGFID-IU"

class Events extends React.Component {
  constructor() {
    super()
    this.state = {
      eventInfo: []
    }
    this.renderFliers = this.renderFliers.bind(this)
  }

  componentDidMount() {
    GetSheetDone.labeledCols(EVENT_INFO_DATA_ID).then(sheet => {
      this.setState({ eventInfo: sheet.data })
    })
  }

  render() {
    const { props } = this
    const style = {
      width: '1px',
      height: '600px',
      minWidth: '100%'
    }
    return (
      <OuterContainer width={props.width} style={{ flexDirection: 'column', alignItems: 'center' }}>
        <Card style={{ width: '100%', marginTop: '20px', marginBottom: '40  px' }}>
          <CardHeader
            title={<Typography style={{ color: '#225c83' }} variant='h5'>Activities and Events</Typography>}
            subheader={<Typography style={{ color: '#225c83' }}>Monthly Potlucks, Mile High Activities, and more!</Typography>}
          />
          <CardContent>
            <iframe
              src="https://calendar.google.com/calendar/embed?showTitle=0&amp;showNav=0&amp;showDate=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;mode=AGENDA&amp;height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=4k9ssjiot8q7sgehorhomf18m0%40group.calendar.google.com&amp;color=%2342104A&amp;ctz=America%2FDenver"
              style={style}
              frameBorder="0"
              scrolling="no">
            </iframe>
          </CardContent>
        </Card>
        {this.renderFliers()}
      </OuterContainer>
    )
  }

  renderFliers() {
    if (this.state.eventInfo.length === 0) return null

    return (
      this.state.eventInfo.map(({ flyerlink, date, signuplink, signuptext }, ix) => {
        if (moment().isAfter(date, 'YYYY-mm-dd')) {
          return null
        }
        return (
          <div key={ix} style={{ width: '50%', marginTop: '30px' }}>
            <a target="_new" href={flyerlink}>
              <img src={flyerlink} style={{ border: '1px solid #225c83', width: '100%' }} />
            </a>
            {signuplink ? <a style={{ textDecoration: 'none' }} target="_new" href={signuplink}><Typography style={{ color: '#225c83', fontSize: '24px', textAlign: 'center' }}>{signuptext}</Typography></a> : null}
          </div>
        )
      }).filter(e => !!e)
    )
  }
}

export default withWidth()(Events)
