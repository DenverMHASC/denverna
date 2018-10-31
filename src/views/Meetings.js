import React from 'react'
import { withWidth, Button, AppBar, withStyles } from '@material-ui/core'
import { capitalize } from 'lodash'

import MeetingListLg from '../components/MeetingListLg'
import MeetingListSm from '../components/MeetingListSm'
import MeetingListKey from '../components/MeetingListKey'
import bmltInject from '../bmltInject'

const Meetings = ({ width, meetings }) => {
  if (!Object.keys(meetings).length) {
    return <h4>Loading...</h4>
  }
  return (
    <React.Fragment>
      {/* TODO Refactor with dropdown */}
      <DayAnchors days={Object.keys(meetings)} />
      {renderMeetingList(width, meetings)}
      <MeetingListKey />
    </React.Fragment>
  )
}

const renderMeetingList = (width, meetings) => (
  width === 'xs' ? <MeetingListSm meetings={meetings} /> : <MeetingListLg meetings={meetings} />
)

const dayAnchorStyles = {
  button: {
    display: 'inline-block',
    margin: '0 px',
    width: 'fit-content',
  }
}
const DayAnchors = ({ days }) => {
  return (
    <AppBar position='static' color='default' >
      {
        days.map((day, idx) => (<Button variant='outlined' color='secondary' key={idx} href={`#${day}`}>{capitalize(day)}</Button>))
      }
    </AppBar>

  )
}

export default bmltInject(withWidth()(Meetings))
