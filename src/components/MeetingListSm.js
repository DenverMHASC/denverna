import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
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
  },
  typography: {
    fontSize: '16px'
  }
}



const MeetingCard = withStyles(MeetingCardStyles)(({ time, name, format, address, classes }) => {
  return (
    <Paper className={classes.root}>
      <Typography className={classes.typography}>Name: {name}</Typography>
      <Typography className={classes.typography}>Time: {time}</Typography>
      <Typography className={classes.typography}>
        Address: <A
          href={generateGoogleMapsLinkFromAddress(address)}
        >
          <Address {...address}
          />
        </A>
      </Typography>
      <Typography className={classes.typography}>Format: {format.join(', ')}</Typography>

    </Paper>
  )
})

export default MeetingListSm
