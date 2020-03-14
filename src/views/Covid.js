import React, { Component } from 'react'
import withWidth from '@material-ui/core/withWidth'
import GetSheetDone from 'get-sheet-done'
import OuterContainer from '../components/OuterContainer'
import moment from 'moment'
import AlertsTable from '../components/CovidAlertsTableLg'


import { reverse } from 'lodash'



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
      reverse(sheet.data)
      this.setState({
        alerts: sheet.data.filter(alert => {
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
          <AlertsTable alerts={this.state.alerts} />
        </div>
      </OuterContainer >
    )
  }
}

export default withWidth()(Covid)
