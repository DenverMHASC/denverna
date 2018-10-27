import React from 'react'
import {
  Table, Paper, TableHead,
  TableRow, TableBody, TableCell, Typography,
  Button, withStyles
} from '@material-ui/core'
import { capitalize } from 'lodash'

import A from './A'

const meetingListTableStyles = {
  time: { width: '12%' },
  name: { width: '19%' },
  address: { width: '48%' },
  type: { width: '21%' }
}

const MeetingListTable = withStyles(meetingListTableStyles)(({ day, meetings, classes }) => {
  return (
    <React.Fragment>
      <DayLabel day={day} />
      <Paper>
        <Table padding='dense'>
          <TableHead>
            <TableRow>
              <TableCell className={classes.time}>Time</TableCell>
              <TableCell className={classes.name}>Name</TableCell>
              <TableCell className={classes.address}>Address</TableCell>
              <TableCell className={classes.type}>Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {meetings.map((m, ix) => <MeetingRow key={ix} {...m} />)}
          </TableBody>
        </Table>
      </Paper>
    </React.Fragment>
  )
})

const MeetingRow = ({ time, name, format, address }) => {
  return (
    <TableRow>
      <TableCell>{time}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>
        <A
          href={generateGoogleMapsLinkFromAddress(address)}
        >
          <Address {...address}
          />
        </A>
      </TableCell>
      <TableCell><span>{format.join(', ')}</span></TableCell>
    </TableRow>
  )
}

const DayLabel = ({ day }) => {
  return (
    <Typography
      variant='h6'
      style={{ margin: '25px 4px 4px' }}>
      <a name={day} />
      {capitalize(day)}
    </Typography>
  )
}

const Address = ({ street, unit, city, zip, notes }) => {
  notes = notes && `(${notes})`
  street = unit ? street : `${street},`
  unit = unit && `${unit},`
  return (
    <span>{street} {unit} {city} {zip} {notes}</span>
  )
}

const generateGoogleMapsLinkFromAddress = ({ street, city, zip }) => {
  return `https://www.google.com/maps/place/${street.replace(/\W/g, '+')},+${city},+CO+${zip}`
}


export default MeetingListTable