import React from 'react'
import {
  withWidth, Button, AppBar, withStyles, InputLabel, LinearProgress, FormControl,
  Select, MenuItem, NativeSelect
} from '@material-ui/core'
import { capitalize, pick } from 'lodash'

import MeetingListLg from '../components/MeetingListLg'
import MeetingListSm from '../components/MeetingListSm'
import MeetingListKey from '../components/MeetingListKey'
import OuterContainer from '../components/OuterContainer'


const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    minWidth: 140,
    maxWidth: 140,
  },
}

class Meetings extends React.Component {
  constructor(props) {
    super()
    this.state = {
      allMeetings: props.meetings,
      meetings: {},
      day: 'any',
      isLoading: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.renderDropdown = this.renderDropdown.bind(this)
  }
  componentDidMount() {
    this.setState({
      allMeetings: this.props.meetings,
      meetings: this.props.meetings,
      isLoading: this.props.isLoading,
    })
  }

  componentWillReceiveProps(nextProps) {
    // TODO there is a bug in here when you change screen sizes, it resets the meeting list. Not sure if this is worth fixing.
    this.setState({
      allMeetings: nextProps.meetings,
      meetings: nextProps.meetings,
      isLoading: nextProps.isLoading,
    })
  }

  handleChange(e) {
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
            onChange={this.handleChange}
            inputProps={{
              name: 'day',
              id: 'day-of-week',
            }}
          >
            <option value="any">Any Day</option>
            {Object.keys(allMeetings).map((day, idx) => (<option value={day} key={idx}>{capitalize(day)}</option>))}
          </NativeSelect>
        </FormControl >
      )
    }
    return (
      <FormControl className={classes.formControl} >
        <Select
          value={day}
          onChange={this.handleChange}
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
    const { width, formats } = this.props
    const { meetings, allMeetings, isLoading } = this.state

    if (isLoading) {
      return null
    }
    return (
      <OuterContainer style={{ flexDirection: 'column' }}>
        {this.renderDropdown()}
        {renderMeetingList(width, meetings || allMeetings)}
        <MeetingListKey formats={formats} />
      </OuterContainer>
    )
  }
}

const renderMeetingList = (width, meetings) => (
  ['xs', 'sm'].includes(width) ? <MeetingListSm meetings={meetings} /> : <MeetingListLg meetings={meetings} />
)

export default withStyles(styles)(withWidth()(Meetings))
