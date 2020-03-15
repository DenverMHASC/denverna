import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import NativeSelect from '@material-ui/core/NativeSelect'
import withWidth from '@material-ui/core/withWidth'
import PrintOutlined from '@material-ui/icons/PrintOutlined'
import Typography from '@material-ui/core/Typography'

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
          className={classes.select}
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
        <Typography><a target="_new" className={classes.print} href="https://drive.google.com/open?id=1kH9Mb9P02EuhONEBT8s-ikp-UvZsMaUs"><span className={classes.iconLabel}><PrintOutlined /><span>Print</span></span></a></Typography>
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
