import React from 'react'
import withWidth from '@material-ui/core/withWidth'


import OuterContainer from '../components/OuterContainer'


const Covid = (props) => {
  const { width } = props
  return (
    <OuterContainer width={width}>
      COVID!!!!!!!!!!!!
    </OuterContainer >
  )
}

export default withWidth()(Covid)
