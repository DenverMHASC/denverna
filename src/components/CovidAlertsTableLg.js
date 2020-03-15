import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import moment from 'moment'



const rowStyles = {
  cell: {
    fontSize: '16px'
  }
}

const AlertRow = withStyles(rowStyles)(({ timestamp, meetingname, details, link, classes }) => {
  return (
    <TableRow>
      <TableCell className={classes.cell}>{meetingname}</TableCell>
      <TableCell className={classes.cell}>
        {details}
        {link ? <span> <br /> <a href={link} target="_blank">Virtual Meeting Link</a> </span> : null}
      </TableCell>
      <TableCell className={classes.cell}>{moment(timestamp, 'M-D-YYYY HH:mm:ss').format('MM/DD/YYYY')}</TableCell>
    </TableRow>
  )
})

const alertsTableStyles = {
  timestamp: {
    fontSize: '16px',
    fontWeight: 'bold',
    width: '15%'
  },
  title: {
    fontSize: '16px',
    fontWeight: 'bold',
    width: '25%'
  },
  details: {
    fontSize: '16px',
    fontWeight: 'bold',
    width: '60%'
  },
}


const AlertsTable = withStyles(alertsTableStyles)(({ classes, alerts }) => {
  return (
    <React.Fragment>
      <Table padding='dense'>
        <TableHead>
          <TableRow className={classes.tableHeader}>
            <TableCell className={classes.title}>Meeting Name</TableCell>
            <TableCell className={classes.details}>Details</TableCell>
            <TableCell className={classes.timestamp}>Updated On</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {alerts.map((a, ix) => <AlertRow key={ix} {...a} />)}
        </TableBody>
      </Table>
    </React.Fragment>
  )
})

export default AlertsTable