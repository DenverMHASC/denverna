import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import NativeSelect from '@material-ui/core/NativeSelect'
import withWidth from '@material-ui/core/withWidth'
import CardHeader from '@material-ui/core/CardHeader'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'

import GetSheetDone from 'get-sheet-done'
import { capitalize, pick, groupBy, sortBy, mapValues } from 'lodash'

import MeetingListLg from '../components/CovidMeetingListLg'
import MeetingListSm from '../components/CovidMeetingListSm'

import OuterContainer from '../components/OuterContainer'


const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  select: {
    minWidth: 140,
    maxWidth: 140,
  },
  printContainer: {
    display: 'inline-flex',
    alignItems: 'center',
  },
  print: {
    color: 'inherit',
    textDecoration: 'inherit',
  },
  iconLabel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
}

const DATA = '11kdUgcYPSqpfpxlPeKKrvGd0gX6luoPhaA3jpK5fA-o'

class CovidMeetings extends React.Component {
  constructor(props) {
    super()
    this.state = {
      allMeetings: {},
      meetings: {},
      day: 'any',
      isLoading: true,
    }
    this.handleDayChange = this.handleDayChange.bind(this)
    this.renderDropdown = this.renderDropdown.bind(this)
  }
  componentWillMount() {
    GetSheetDone.labeledCols(DATA).then(sheet => {
      const allMeetings = groupBy(sheet.data, 'meetingday')
      const sortedByTime = mapValues(allMeetings, meetings => {
        return sortBy(meetings, m => m.meetingtime)
      })

      this.setState({
        allMeetings: sortedByTime,
        meetings: sortedByTime,
        day: 'any',
        isLoading: false,
      })
    })
  }

  handleDayChange(e) {
    if (e.target.value === 'any') {
      this.setState({
        day: 'any',
        meetings: this.state.allMeetings
      })
    } else {
      this.setState({ day: e.target.value, meetings: pick(this.state.allMeetings, e.target.value) })
    }
  }

  renderDropdown() {
    const { width, classes } = this.props
    const { allMeetings, day } = this.state

    if (width === 'xs') {
      return (
        <FormControl className={classes.formControl} >
          <NativeSelect
            value={day}
            onChange={this.handleDayChange}
            inputProps={{
              name: 'day',
              id: 'day-of-week',
            }}
          >
            <option value="any">Any Day</option>
            {Object.keys(allMeetings).map((day, idx) => (<option value={day} key={idx}>{day}</option>))}
          </NativeSelect>
        </FormControl >
      )
    }
    return (
      <FormControl className={classes.formControl} >
        <Select
          classNamxe={classes.select}
          value={day}
          onChange={this.handleDayChange}
          inputProps={{
            name: 'day',
            id: 'day-of-week',
          }}
        >
          <MenuItem value="any">
            <em>Any Day</em>
          </MenuItem>
          {Object.keys(allMeetings).map((day, idx) => (<MenuItem value={day} key={idx}>{capitalize(day)}</MenuItem>))}
        </Select>
      </FormControl>
    )
  }

  render() {
    const { width } = this.props
    const { meetings, allMeetings, isLoading } = this.state

    if (isLoading) {
      return null
    }
    return (
      <OuterContainer style={{ flexDirection: 'column' }}>
        <HeaderCard />
        {this.renderDropdown()}
        {renderMeetingList(width, meetings || allMeetings)}
      </OuterContainer>
    )
  }
}

const renderMeetingList = (width, meetings) => {
  return (
    ['xs', 'sm'].includes(width) ? <MeetingListSm meetings={meetings} /> : <MeetingListLg meetings={meetings} />
  )
}

const HeaderCard = () => (
  <div style={{ marginBottom: '20px' }}>
    <Typography style={{ color: '#225c83' }} variant='h5'>Coronavirus Meeting Updates</Typography>
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
        href="https://nacolorado.org/denver/events/WSO-Coronavirus.pdf"
        target="_blank"
      >
        Please Review the NA World Services Coronavirus Update
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
  </div >
)

export default withStyles(styles)(withWidth()(CovidMeetings))
