import React from 'react'
import { Grid } from '@material-ui/core'

const OuterContainer = ({ children, style }) => {
  return (
    <Grid container style={{
      width: '85%', margin: '0 auto', display: 'flex', justifyContent: 'space-evenly', ...style
    }}> {children} </Grid>
  )
}

export default OuterContainer
