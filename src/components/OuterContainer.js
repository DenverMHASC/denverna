import React from 'react'
import Grid from '@material-ui/core/Grid'

const OuterContainer = ({ children, style, width }) => {
  return (
    <Grid container style={{
      width: ['sm', 'xs'].includes(width) ? '95%' : '85%',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-evenly',
      marginBottom: '60px',
      ...style
    }}> {children} </Grid>
  )
}

export default OuterContainer
