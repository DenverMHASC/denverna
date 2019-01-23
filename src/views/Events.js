import React from 'react'

const Events = (props) => {
  const style = {
    width: '100%',
    height: '600px'
  }
  return (
    <div>
      <iframe src="https://calendar.google.com/calendar/embed?showTitle=0&amp;showNav=0&amp;showPrint=0&amp;showCalendars=0&amp;mode=AGENDA&amp;height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=e3u3bfsuo5uus3dfa12q4pk8mk%40group.calendar.google.com&amp;color=%23182C57&amp;ctz=America%2FDenver" style={style} frameBorder="0" scrolling="no"></iframe>
    </div>
  )
}

export default Events
