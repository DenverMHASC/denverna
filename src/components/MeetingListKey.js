import React from 'react'
import { capitalize, map } from 'lodash'

import {
  Table, TableHead, TableRow, TableCell, TableBody, Typography, Paper
} from '@material-ui/core'


const MeetingListKey = () => {
  const key = {
    'B': 'Beginners Meeting',
    'BK': 'Book Study',
    'C': 'Closed Meeting for Addicts Only',
    'CL': 'Candlelight',
    'CW': 'Children Welcome/Child Care',
    'D': 'Discussion',
    'ME': 'Meditation',
    'O': 'Open Meeting all are welcome',
    'RF': 'Rotating Format',
    'SD': 'Speaker/Discussion',
    'SG': 'Step Working Guide',
    'So': 'Speaker Only',
    'St': 'Step',
    'SW': 'Step Writing',
    'Tr': 'Tradition',
    'W': 'Women only',
    'WC': 'Wheelchair Accessible',
    'YP': 'Young People',
  }

  return (
    <Table style={{ width: '260px' }}>
      <TableHead>
        <TableRow>
          <TableCell>Key</TableCell>
          <TableCell>Description</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {map(key, (v, k) => (
          <TableRow key={k}>
            <TableCell>{k}</TableCell>
            <TableCell>{v}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default MeetingListKey