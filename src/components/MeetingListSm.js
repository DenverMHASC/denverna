import React from 'react'
import { Paper, Typography, withStyles } from '@material-ui/core'
import { map } from 'lodash'

import DayLabel from './DayLabel'
import Address from './Address'
import A from './A'
import { generateGoogleMapsLinkFromAddress } from '../utils'

const MeetingListSm = ({ meetings }) => (
  map(meetings, (meetings, day) => <CardGroup key={day} day={day} meetings={meetings} />)
)

const CardGroup = ({ meetings, day }) => {
  return (
    <div>
      <DayLabel day={day} />
      {meetings.map((m, ix) => <MeetingCard key={ix} {...m} />)}
    </div>
  )
}

const MeetingCardStyles = {
  root: {
    padding: '10px',
    margin: '10px 0'
  }
}

const MeetingCard = withStyles(MeetingCardStyles)(({ time, name, format, address, classes }) => {
  return (
    <Paper className={classes.root}>
      <Typography>Name: {name}</Typography>
      <Typography>Time: {time}</Typography>
      <Typography>
        Address: <A
          href={generateGoogleMapsLinkFromAddress(address)}
        >
          <Address {...address}
          />
        </A>
      </Typography>
      <Typography>Format: {format.join(', ')}</Typography>

    </Paper>
  )
})

export default MeetingListSm
