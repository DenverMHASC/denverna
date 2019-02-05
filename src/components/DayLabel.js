import React from 'react'
import Typography from '@material-ui/core/Typography'

import { capitalize } from 'lodash'

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

export default DayLabel
