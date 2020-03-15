import React, { Component } from 'react'
import { sortBy } from 'lodash'
import withWidth from '@material-ui/core/withWidth'
import GetSheetDone from 'get-sheet-done'
import OuterContainer from '../components/OuterContainer'
import moment from 'moment'
import AlertsTableLg from '../components/CovidAlertsTableLg'
import AlertsTableSm from '../components/AlertsTableSm'
import Typography from '@material-ui/core/Typography'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'

const DATA = '1GB9cm8R5lMVQo2Hq1-mdudEkk2wRjG3nD2EDkTg2QAE'

class Covid extends Component {

  constructor(props) {
    super(props)

    this.state = {
      alerts: []
    }

  }

  componentDidMount() {
    GetSheetDone.labeledCols(DATA).then(sheet => {
      const alerts = sortBy(sheet.data, (sheetData => sheetData.meetingname))
      this.setState({
        alerts: alerts.filter(alert => {
          const endOfEventDate = moment(alert.expiredate, 'M-D-YYYY').endOf('day').unix() + 1 // I hate date math.
          const endOfDay = moment().endOf('day').unix()
          if (endOfEventDate <= endOfDay) {
            return false
          }

          return true
        })
      })
    })
  }

  render() {

    return (
      <OuterContainer width={this.props.width} style={{ flexDirection: 'column' }}>
        <div className="container">
          <Card>
            <CardHeader
              title={<Typography style={{ color: '#225c83' }} variant='h5'>Coronavirus Updates</Typography>}
              subheader={
                <React.Fragment>
                  <Typography style={{ color: '#225c83' }}>
                    <a
                      href="https://www.na.org/admin/include/spaw2/uploads/pdf/Coronavirus_web_message_12Mar.pdf"
                      target="_blank"
                    >
                      Please Review the NA World Services Coronavirus Statement
                  </a>
                  </Typography>
                  <Typography style={{ color: '#225c83' }}>
                    <a
                      href="http://www.nabyphone.com/"
                      target="_blank"
                    >
                      Please Click Here For Phone Meetings
                  </a>
                  </Typography>
                  <Typography style={{ color: '#225c83' }}>
                    <a
                      href="https://virtual-na.org/"
                      target="_blank"
                    >
                      Please Click Here For Virtual Meetings
                  </a>
                  </Typography>
                </React.Fragment>
              }
            />

            <CardContent>
              {renderAlerts(this.props.width, this.state.alerts)}
            </CardContent>
          </Card>
        </div>

      </OuterContainer >
    )
  }
}

const renderAlerts = (width, alerts) => (
  ['xs', 'sm'].includes(width) ? <AlertsTableSm alerts={alerts} /> : <AlertsTableLg alerts={alerts} />
)


export default withWidth()(Covid)
