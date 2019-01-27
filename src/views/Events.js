import React from 'react'
import OuterContainer from '../components/OuterContainer'


const Events = (props) => {
  const style = {
    width: '100%',
    height: '600px'
  }
  return (
    <OuterContainer>
      <iframe src="https://calendar.google.com/calendar/embed?showTitle=1&amp;showNav=0&amp;showDate=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;mode=AGENDA&amp;height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=4k9ssjiot8q7sgehorhomf18m0%40group.calendar.google.com&amp;color=%2342104A&amp;ctz=America%2FDenver" style={style} frameBorder="0" scrolling="no"></iframe>
    </OuterContainer>
  )
}

export default Events
