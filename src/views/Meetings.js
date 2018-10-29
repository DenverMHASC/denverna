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
      <DayAnchors days={Object.keys(meetings)} />
      {renderMeetingList(width, meetings)}
      <MeetingListKey />
      <div>
        <RequestChangeFormLink />
        <p>
          "NA has no opinion on outside issues; hence the NA name ought never be drawn into public controversy."
            <br />
          Tradition 10
            <br />
          <br />
          Narcotics Anonymous is NOT affiliated with any outside organizations or
					enterprises, and has no connection whatsoever to the locations where
					N.A. meetings are held including but not limited to: religious or
					political organizations, hospitals, institutions, treatment programs,
					correctional facilities,private clubs and/or individual enterprises.
         	</p>
      </div>
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

const RequestChangeFormLink = () => (
  <div className="pull-right">
    <a target="_blank" href="https://goo.gl/forms/l39LqMIAczxXDXWj1">Request Meeting List Updates</a>
  </div>
)


export default bmltInject(withWidth()(Meetings))