import React, { Component } from 'react'
import { sortBy } from 'lodash'
import withWidth from '@material-ui/core/withWidth'
import GetSheetDone from 'get-sheet-done'
import OuterContainer from '../components/OuterContainer'
import moment from 'moment'
import AlertsTableLg from '../components/CovidAlertsTableLg'
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
      <OuterContainer style={{ flexDirection: 'column' }}>
        <div className="container">
          {renderAlerts(this.props.width, this.state.alerts)}
        </div>
      </OuterContainer >
    )
  }
}

const renderAlerts = (width, alerts) => (
  ['xs', 'sm'].includes(width) ? <div>butts</div> : <AlertsTableLg alerts={alerts} />
)


export default withWidth()(Covid)
