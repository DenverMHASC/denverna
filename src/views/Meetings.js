import React from 'react'
import { withWidth } from '@material-ui/core'
import MeetingList from '../components/MeetingList'
import MeetingListKey from '../components/MeetingListKey'

const Meetings = ({ width }) => {
  return (
    <React.Fragment>
      <MeetingList />
      <MeetingListKey />
      <div>
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

export default withWidth()(Meetings)